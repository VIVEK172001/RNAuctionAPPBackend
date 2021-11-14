const db = require("../models");
const config = require("../config/auth.config");
const fs = require("fs");
const User = db.user;
const Role = db.role;
const Product=db.product;
const Op = db.Sequelize.Op;
const Image = db.images;
const BidProduct = db.bidproduct;
const Winner = db.winner;
//const { Op } = require("sequelize");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    phonenumber:req.body.phonenumber,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ status:"success",message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ status:"success",message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ status:"failed",message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      //username: req.body.username
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          status:"success",
          id: user.id,
          username: user.username,
          email: user.email,
          phonenumber:user.phonenumber,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.addProduct = (req, res) => {
  console.log("helllllo",req.file);
  console.log("helllllo",req.body.date);
  // Save User to Database
  Product.create({
    userid:req.body.userid,
    productname: req.body.productname,
    baseamount:req.body.baseamount,
    date: req.body.date,
    time: req.body.time,
    endTimeHour:req.body.endTimeHour,
    endTimeMinute:req.body.endTimeMinute,
    publisheddate:req.body.publisheddate,
    category: req.body.category,
    description: req.body.description,
    type: req.file.mimetype,
		name: req.file.originalname,
		path: req.file.path
  })
    .then(Respones => {
      res.send({ status:"success",message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ status:"failed",message: err.message });
    });
};


exports.uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/resources/static/assets/uploads/" + req.file.filename
      ),
    }).then((image) => {
      fs.writeFileSync(
        __basedir + "/resources/static/assets/tmp/" + image.name,
        image.data
      );

      return res.send(`File has been uploaded.`);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

exports.listAllFiles = (req, res) => {
  
    Product.findAll({
      where: {
        category:req.body.category,
        userid: {[Op.ne]: req.body.userid},
      }
    })
      .then(data => {
        res.send({ status:"success",data: data });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
}

exports.addBidProduct = (req, res) => {
  // Save User to Database
  BidProduct.create({
    userid:req.body.userid,
    productid:req.body.productid,
    bidproductname:req.body.bidproductname,
    bidamount:req.body.bidamount,
    biddate:req.body.biddate,
    isbidden:req.body.isbidden,
    bidcategory:req.body.bidcategory,
  })
    .then(Respones => {
      res.send({ status:"success",message: "User was successfully bid!" });
    })
    .catch(err => {
      res.status(500).send({ status:"failed",message: err.message });
    });
};

exports.listAllbidproduct = (req, res) => {
  // Product.findAll({
  //   where: {
  //     category: "Item 4",
  //   }
  // })
  // Product.findAll().then((products) => {
  //   res.json(products);
  // });
	// Product.findAll({attributes: ['userid', 'time']}).then(files => {
	//   res.json(files);
	// }).catch(err => {
	// 	console.log(err);
	// 	res.json({msg: 'Error', detail: err});
	// });
  console.log(req.body.productid);
  const productid = req.query.productid;
    var condition = productid ? { productid: { [Op.iLike]: `%${productid}%` } } : null;
  
    BidProduct.findAll({
      where: {
        productid:req.body.productid
      }
    })
    // BidProduct.findAll({ where: condition })
      .then(data => {
        res.send({ status:"success",message: data });
      })
      .catch(err => {
        res.status(500).send({ status:"failed",message: err.message });
      });
}

exports.MyAuctionlistAllFiles = (req, res) => {
  console.log(req.body.userid);
  // const userid = req.query.userid;
  //   var condition = userid ? { userid: { [Op.iLike]: `%${userid}%` } } : null;
  //   console.log(condition);
   // Product.findAll({ where: condition })
    Product.findAll({
      where: {
        userid:req.body.userid
      }
    })
      .then(data => {
        res.send({ status:"success",data: data });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
}

exports.findwinnerid = (req, res) => {
  console.log(req.body.userid);
    User.findAll({
      where: {
        id:req.body.userid
      }
    })
      .then(data => {
        res.send({ status:"success",data: data });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
}

exports.Winnerdetalis = (req, res) => {
  // Save User to Database
  Winner.create({
    userid:req.body.userid,
    productid:req.body.productid,
    bidproductname:req.body.bidproductname,
    soldamount:req.body.soldamount,
    solddate:req.body.solddate,
    winnername:req.body.winnername
  })
    .then(Respones => {
      res.send({ status:"success",message: "User was successfully bid!" });
    })
    .catch(err => {
      res.status(500).send({ status:"failed",message: err.message });
    });
};

exports.WinnerdetalisProfile = (req, res) => {
  // Save User to Database
  Winner.findAll({
    where: {
      userid:req.body.userid
    }
  })
    .then(data => {
      res.send({ status:"success",data: data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
