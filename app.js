const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

app.set("view engine", "ejs");

const JWT_SECRET = "qwertyuiop{12398}asdfghjkl[7546]?zxcvbnm<.?/>asdfqfkgoso";

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoUrl = "mongodb+srv://AdsCompany:AdsCompany2023@cluster0.67zhoeh.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(() => {console.log("Connected...")})
.catch(e => console.log(e))

app.listen(9000, () => {
    console.log("started");
})

require('./userDetails');

const User = mongoose.model("UserInfo");

app.post("/register", async (req,res) => {
    const {name, email, phone, password, userType} = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10); 

    try {
        const oldUser = await User.findOne({ email });

        if(oldUser) {
           return res.send({ error: "User Exist" });
        }
        await User.create({
            name,
            email,
            phone,
            password: encryptedPassword, 
            userType
        });
        res.send({status: "OK"});
    } catch (error) {
        res.send({status: "error"});
    }
})

app.post("/login-user", async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email });
    if(!user){return res.json({ error: "User not found"})}
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email: user.email}, JWT_SECRET, {
            expiresIn: 900
        });

        if(res.status(201)){
            return res.json({ status: "ok", data: token, userType: user.userType});
        }else{ return res.json({ error: "error"});}
    }

     res.json({ staus: "error", error: "invalid password"});
})

app.post("/userData", async (req, res) => {
    const {token} =  req.body;

    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if (err){
                return "token expired";
            }
            return res;
        });

        if (user == "token expired"){
            return res.send({ ststus: "Error", data: "token expired" });
        }
        const userEmail = user.email;
        User.findOne({ email: userEmail }).then((data) => {
            res.send({ ststus: "ok", data: data });
        }).catch((error) => res.send({ error: "error", data: error }))
        
    } catch (error) {
        res.send({status: "error"});
    }
})

app.post("/ResetPassword", async (req, res) => {
    const { email } = req.body;

    try {
        const oldUser = await User.findOne({ email });
        console.log(oldUser);
        if(!oldUser){
           return res.json({status: "User not exist"});
        }

        const secret = JWT_SECRET + oldUser.password;
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id}, secret, {
            expiresIn: "5m"
        })

        const link = `http://localhost:9000/reset-password/${oldUser._id}/${token}`;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'nnedkov74@gmail.com',
              pass: 'jkaaevgkxdlxyqeu'
            }
          });
          
          var mailOptions = {
            from: 'nnedkov74@gmail.com',
            to: 'nikola.n@abv.bg',
            subject: 'Reset password!',
            text: link
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });


        console.log(link);
    } catch (error) {}
  })

  app.get("/reset-password/:id/:token", async (req, res) => {
    const {id, token} = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if(!oldUser){
        return res.json({status: "User not exist"});
     }
     const secret = JWT_SECRET + oldUser.password;
     try {
        const verify = jwt.verify(token, secret);
        res.render("index", { email: verify.email, status: "Not verified" });
     } catch (error) {
        res.send("Not verified");
     }
    //res.send("done");
  })

  app.post("/reset-password/:id/:token", async (req, res) => {
    const {id, token} = req.params;
    const { password } = req.body;
    const oldUser = await User.findOne({ _id: id });
    if(!oldUser){
        return res.json({status: "User not exist"});
     }
     const secret = JWT_SECRET + oldUser.password;
     try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    password: encryptedPassword
                }
            });
            res.render("index", { email: verify.email, status: "verified" });
     } catch (error) {
        res.json({ status: "Password not verified" });
     }
    //res.send("done");
  })

  app.get("/getUserInfo", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.send({ status: "ok", data: allUsers });
    } catch (error) {
        console.log(error);
    }
  })

  app.post("/deleteUser", async (req, res) => {
    const {userId} = req.body;
    try {
        User.deleteOne({_id: userId}, function (err, res) {
            console.log(err);
        });
        res.send({ status: "OK", data: "Deleted"})
    } catch (error) {
        console.log(error);
    }
  })

  app.post("/updateUser", async (req, res) => {
    const { id, name, email, phone } = req.body;
    try {
        await User.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    name, email, phone
                }
            });
            res.send({ status: "OK", data: "Updated"})
    } catch (error) {
        console.log(error);
    }
  })

  app.post("/updateUserPWD", async (req, res) => {
    const { id, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        await User.updateOne(
            {
                _id: id
            },
            {
                $set: {
                     password: encryptedPassword
                }
            });
            res.send({ status: "OK", data: "Updated PWD"})
    } catch (error) {
        console.log(error);
    }
  })
  
const imageModel = require("./postDetails");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });

app.post("/PostService", upload.single("testImage"), (req, res) => {
    const {name, email, phone, title, description, category, price} = req.body;

    try {
        const saveImage =  imageModel({
            img: { data: fs.readFileSync("uploads/" + req.file.filename), contentType: "image/png",},
            name,
            email,
            phone,
            title,
            description,
            category, 
            price,
          });
          saveImage.save()
            .then((res) => {
              console.log("image is saved");
            })
            .catch((err) => {
              console.log(err, "error has occur");
            });
            res.send({status: "OK"});
    } catch (error) {
        res.send({status: "error"});
    }
  });

  app.get("/getUserPostsFreelance", async (req, res) => {
    const userCategory = "Freelance";
    try {
        const allPosts = await imageModel.find({ category: userCategory });
        res.send({ status: "ok", data: allPosts });
    } catch (error) {
        console.log(error);
    }
  })

  app.get("/getUserPostsCopywriting", async (req, res) => {
    const userCategory = "Copywriting";
    try {
        const allPosts = await imageModel.find({ category: userCategory });
        res.send({ status: "ok", data: allPosts });
    } catch (error) {
        console.log(error);
    }
  })

  app.get("/getUserPostsEcom", async (req, res) => {
    const userCategory = "E-commerce";
    try {
        const allPosts = await imageModel.find({ category: userCategory });
        res.send({ status: "ok", data: allPosts });
    } catch (error) {
        console.log(error);
    }
  })

  app.get("/getUserPostsAfiliate", async (req, res) => {
    const userCategory = "Affiliate marketing";
    try {
        const allPosts = await imageModel.find({ category: userCategory });
        res.send({ status: "ok", data: allPosts });
    } catch (error) {
        console.log(error);
    }
  })

  app.get("/getUserPosts", async (req, res) => {
    try {
        const allPosts = await imageModel.find({});
        res.send({ status: "ok", data: allPosts });
    } catch (error) {
        console.log(error);
    }
  })

app.post("/getMyPosts", async (req, res) => {
    const { email } = req.body;
    try {
      const allPosts = await imageModel.find({ email: email });
      console.log(allPosts);
      res.send({ status: "ok", data: allPosts });
    } catch (error) {
      console.log(error);
    }
  })

  app.post("/getOnePosts", async (req, res) => {
    const { id } = req.body;
    try {
      const allPosts = await imageModel.find({ _id: id });
      console.log(allPosts);
      res.send({ status: "ok", data: allPosts });
    } catch (error) {
      console.log(error);
    }
  })

  app.post("/updateOnePosts", async (req, res) => {
    const { id, title, category, price, description } = req.body;
    try {
      await imageModel.updateOne(
        {
            _id: id
        },
        {
            $set: {
                 title: title,
                 category: category,
                 price: price,
                 description: description
            }
        });

        res.send({ status: "OK", data: "Updated post"})
    } catch (error) {
      console.log(error);
    }
  })

  app.post("/getSpecificPost", async (req, res) => {
    const { id } = req.body;
    try {
        const post = await imageModel.find({ _id: id });
        res.send({ status: "ok", data: post });
    } catch (error) {
        console.log(error);
    }
  })

  app.post("/deletePost", async (req, res) => {
    const { onePostId } = req.body;
    try {
      imageModel.deleteOne({_id: onePostId}, function (err, res) {
            console.log(err);
        });
        res.send({ status: "OK", data: "Deleted"})
    } catch (error) {
        console.log(error);
    }
  })


  //////
  const blogModel = require("./blogDetails");

  app.post("/PostBlog", upload.single("testImage"), (req, res) => {
    const {name, email, title, content, type} = req.body;

    try {
        const saveImage =  blogModel({
            img: { data: fs.readFileSync("uploads/" + req.file.filename), contentType: "image/png",},
            name,
            email,
            title,
            content,
            type
          });
          saveImage.save()
            .then((res) => {
              console.log("image is saved");
            })
            .catch((err) => {
              console.log(err, "error has occur");
            });
            res.send({status: "OK"});
    } catch (error) {
        res.send({status: "error"});
    }
  });

  app.post("/getUserBlogs", async (req, res) => {
    const { type } = req.body;
    try {
      const allPosts = await blogModel.find({ type: type });
      res.send({ status: "ok", data: allPosts });
    } catch (error) {
      console.log(error);
    }
  })

  app.get("/getUserBlogs", async (req, res) => {
    try {
        const allBlogs = await blogModel.find({});
        res.send({ status: "ok", data: allBlogs });
    } catch (error) {
        console.log(error);
    }
  })

  app.post("/deleteBlog", async (req, res) => {
    const {id} = req.body;
    try {
      blogModel.deleteOne({_id: id}, function (err, res) {
            console.log(err);
        });
        res.send({ status: "OK", data: "Deleted"})
    } catch (error) {
        console.log(error);
    }
  })
