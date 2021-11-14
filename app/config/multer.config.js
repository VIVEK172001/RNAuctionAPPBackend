const multer = require('multer');

// var storage = multer.memoryStorage()
// var upload = multer({ dest: './public/data/uploads/' });

// module.exports = upload;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = file.originalname;
      console.log("newwwwwwwwwwwwwwwwwwwwwwwwwww",file.originalname);
      cb(null, file.fieldname + 'hello' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage: storage });

module.exports = upload;