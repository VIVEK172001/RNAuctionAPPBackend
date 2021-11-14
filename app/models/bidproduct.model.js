module.exports = (sequelize, Sequelize) => {
    const BidProduct = sequelize.define("bidproducts", {
      userid:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      productid:{
        type:Sequelize.INTEGER,
        allowNull:false,
      },
      bidproductname: {
        type: Sequelize.STRING
      },
      bidamount: {
        type: Sequelize.STRING
      },
      biddate: {
        type: Sequelize.DATE
      },
      isbidden:{
        type: Sequelize.STRING,
      },
      bidcategory: {
        type: Sequelize.STRING
      },
    });
  
    return BidProduct;
  };