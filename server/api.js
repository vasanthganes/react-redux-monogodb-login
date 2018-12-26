const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const Users = require("./data");

const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://vasanth:sample123@ds131983.mlab.com:31983/sample";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// this method fetches all available data in our database
router.get("/getUser", (req, res) => {
  const {  username ,password } = req.query;
    Users.findOne({username:username,password:password},(err, data) => { console.log(data)
    if (err) return res.json({ success: false, error: err });
    if(data === null)return res.json({ success: false,data:null });
    return res.json({ success: true, data: data });
  });
});

router.post("/putData", (req, res) => {
  let data = new Users();
  
   const {  username ,password, email, first_name, last_name, gender,country } = req.body;

  if (!username || !password || !email) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }


Users.find( { username:username } ,(err, response) => {

  if(response.length === 0){
      
      data.username = username;
      data.password = password;
      data.email = email;
      data.first_name = first_name;
      data.last_name = last_name;
      data.gender = gender;
      data.country = country;

      data.save(err => {
        if (err) return res.json({ success: false, error: err });
        res.status(200);
        return res.json({ success: true });
      });

  }else{
    res.status(200);
    return res.json({
      success: false,
      error: "USER NAME EXSIST"
    });
  }

})


});


app.use(cors({
  origin: '*',
  credentials: true
}));

// append /api for our http requests
app.use("/api", router);

app.on('ready', function() { 
    app.listen(3001, function(){ 
    }); 
}); 
mongoose.connection.once('open', function() { 
    app.emit('ready'); 
});
