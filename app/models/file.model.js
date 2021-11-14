module.exports = (sequelize, Sequelize) => {
	const File = sequelize.define('file', {
	  type: {
			type: Sequelize.STRING
	  },
	  name: {
			type: Sequelize.STRING
	  },
	  path: {
			type: Sequelize.STRING
	  }
	});
	
	return File;
}

//https://ozenero.com/node-js-express-rest-api-postgresql-example-upload-file-download-file-multer-sequelize-crud?ref=morioh.com&utm_source=morioh.com