/*-------------------
CREATED ON: 15th may
CREATED BY : S Vinayshree
----------------------------*/

var express = require('express');
var fs = require('fs');
var excelParser = require('excel-parser');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

var response = {};

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).single('file'));;

app.get('/index.html', function (req, res){
    res.sendFile(__dirname + "/" + "/index.html");
})
app.post('/file_upload', function (req, res){

console.log(req.file.originalname);
console.log(req.file.path);
console.log(req.file.mimetype);
 

var file = __dirname + "/" + req.file.originalname;
console.log(file);

    fs.readFile(req.file.path, function(err, data){
		if(err)
		{
			console.log( err );
		}
	     fs.writeFile(file, data, function(err, data){
		 if(err){
		   console.log( err );
		   response = {
			message: "file uploaded error",
			filename : req.file.originalname
			}
			res.end(JSON.stringify(response));
         }else{
		    response = {
			message: "file uploaded successfully",
			filename : req.file.originalname
			}
			console.log(response);
			//res.end(JSON.stringify(response));
			
			//have condition
			   excelParser.parse({
               inFile: file,
                worksheet: 1,
                skipEmpty: true,
                
                              },function(err, records){
                                     if(err) console.error(err);
                                      console.log(records);
									  res.end(JSON.stringify(response));
									  //if need to redirect
									   //res.redirect('Include URL for redirection');
									   
                                       });
		 }
		 })
	})
	
	
	
})

var server = app.listen(8081, function(){
var host = server.address().address
var port = server.address().port

console.log("example app listening at http://%s:%s", host, port);

})