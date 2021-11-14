var stream = require('stream');

const db = require("../models");
const File = db.files;

exports.uploadFile = (req, res) => {
	console.log(req);
	console.log("helllllo",req.file);
    console.log("helllllo",req.body.vivek);
	File.create({
		type: req.file.mimetype,
		name: req.file.originalname,
		path: req.file.path
	}).then(() => {
		res.json({msg:'File uploaded successfully! -> filename = '});
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

exports.listAllFiles = (req, res) => {
	File.findAll({attributes: ['id', 'name']}).then(files => {
	  res.json(files);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}

exports.downloadFile = (req, res) => {
	File.findByPk(req.params.id).then(file => {
		var fileContents = Buffer.from(file.data, "base64");
		var readStream = new stream.PassThrough();
		readStream.end(fileContents);
		
		res.set('Content-disposition', 'attachment; filename=' + file.name);
		res.set('Content-Type', file.type);

		readStream.pipe(res);
	}).catch(err => {
		console.log(err);
		res.json({msg: 'Error', detail: err});
	});
}