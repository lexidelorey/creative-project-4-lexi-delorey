const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const imageSchema = new mongoose.Schema({
  username: String,
  path: String,
  caption: String,
  location: String
});

const User = mongoose.model('User', userSchema);
const Image = mongoose.model('Image', imageSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Deleting an image
app.delete('/api/images/:id', async (req, res) => {
  try {
    await Image.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Editing a post
app.put('/api/images/:id', async (req, res) => {
  try {
    let user = await User.findOne({username: req.body.username});
    if (user == null) {
      console.log("user not found");
      res.sendStatus(500);
      return;
    }
    if (user.password !== req.body.password) {
      console.log("bad pass");
      res.sendStatus(500);
      return;
    } else {
      let post = await Image.findOne({_id: req.params.id});
      post.username = req.body.username;
      post.caption = req.body.caption;
      post.location = req.body.location;
      item.save();
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/images', async (req, res) => {
  let user = await User.findOne({username: req.body.username});
  if (user == null) {
    console.log("user not found");
    res.sendStatus(500);
    return;
  }
  if (user.password !== req.body.password) {
    console.log("bad pass");
    res.sendStatus(500);
    return;
  } else {
    const post = new Image({
      username: req.body.username,
      path: req.body.path,
      caption: req.body.caption,
      location: req.body.location
    });
    try {
      await post.save();
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

app.post('/api/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/images', async (req, res) => {
  try {
    let images = await Image.find();
    res.send(images);
  } catch (error) {
    console.log("here");
    res.sendStatus(500);
  }
});

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/social', {
  useNewUrlParser: true
});

app.listen(3000, () => console.log('Server listening on port 3000! woohoo'));
