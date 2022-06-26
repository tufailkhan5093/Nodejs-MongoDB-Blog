const express = require("express");
const app = express();
const blog = require("./routes/blog");
const user = require("./routes/user");
const db = require("./app/models");
const bodyParser = require('body-parser');
const cors = require('cors');




// set the view engine to ejs

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('ejs', require('ejs-locals'));
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/'));
app.use('/blog_detail', express.static('public'));
app.use('/user/add_user', express.static('public'));
app.use('/blog_detail', express.static('/'));



app.set('view engine', 'ejs');


var corsOptions = {
  origin: "http://localhost:8000"
};
app.use(cors(corsOptions));


app.use('/', blog);
app.use('/user', user);
// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});