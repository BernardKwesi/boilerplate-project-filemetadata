var express = require('express');
var cors = require('cors');
require('dotenv').config()
var bodyparser = require("body-parser");
var multer = require('multer');
var app = express();

const fileStorageEngine = multer.diskStorage({ destination: (req,file,cb)=>{
  cb(null, "public/uploads");
},
filename :(req,file,cb)=>{
  cb(null,file.originalname );
} });

const upload = multer({storage: fileStorageEngine});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))


app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'),(req,res)=>{

console.log(req.file);

      res.json({
        name:req.file.originalname,
        type:req.file.mimetype,
        size:req.file.size
      });

})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
