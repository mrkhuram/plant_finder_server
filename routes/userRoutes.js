const router = require("express").Router();
const User = require("../models/user");
// const Trade = require("../models/trademodels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require('./middleware/auth');
const nodemailer = require("nodemailer");


// async..await is not allowed in global scope, must use a wrapper
async function sendContactemail(body) {

  let {
    name,
    email,
    subject,
    msgBody
  } = body

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'plantslovers3@gmail.com',
      pass: 'newlife116'
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'noreply@panacloud.com', // sender address
    to: "plantslovers3@gmail.com", // list of receivers
    subject: subject, // Subject line
    text: subject, // plain text body
    html: `
    <h1>Greetings </h1>
    <p>My name is ${name}, and I want to tell you that, I found you on Plants Lovers.</p>
    <p>${msgBody}</p>
    <p>My Email Adress is ${email}</p>
    <p>Thank you.</p>
    ` // html body
  });

  return info
}




router.post("/register_user", (req, res) => {
  const { fullname, email, password, coordinates, phone } = req.body;

  //simple Validation
  if (!fullname || !email || !password || !coordinates.longitude || !phone) {
    return res.status(200).json({ msg: "Please enter all fields" });
  }

  email = email.toLowerCase()
  //Check for existence
  User.findOne({ email }).then(user => {

    if (user) {
      return res.status(200).json({ msg: "Email already exist" });
    }
    const newUser = new User({
      fullname, email, password, coordinates, phone,
      type: "user"
    });

    //Create Salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser.save().then(user => {

          res.json({
            user
          });
        }
        );

      });
    });
  });
});

router.post("/register_nursery", (req, res) => {
  const { fullname, email, password, coordinates, phone } = req.body;

  //simple Validation
  if (!fullname || !email || !password || !coordinates.longitude || !phone) {
    return res.status(200).json({ msg: "Please enter all fields" });
  }
  email = email.toLowerCase()
  //Check for existence
  User.findOne({ email }).then(user => {

    if (user) {
      return res.status(200).json({ msg: "User already exist " });
    }
    const newUser = new User({
      fullname, email, password, coordinates,
      phone,
      type: "nursery"
    });

    //Create Salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        newUser.save().then(user => {

          res.json({

            user
          });
        }
        );

      });
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  //simple Validation
  email = email.toLowerCase

  //simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  //Check for existence
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "user does not exist " });
    }

    // Validate password
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })
        res.json({
          user
        });
      }
      );

  });
});



router.post("/update", (req, res) => {
  const { username, email, password, oldpassword } = req.body;

  //simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }



  //Check for existence
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(400).json({ msg: "user does not exist " });
    }

    // Validate password
    bcrypt.compare(oldpassword, user.password)
      .then(isMatch => {
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" })

        const updatedUser = {
          username,
          email,
          password,
          oldpassword
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(updatedUser.password, salt, (err, hash) => {
            if (err) throw err;
            // console.log(hash)
            updatedUser.password = hash
            // console.log(updatedUser);
            // console.log(user.password);
            User.findOneAndUpdate({ email }, {
              $set: {
                username: user.username,
                password: updatedUser.password
              }
            }, (err, doc) => {
              if (err) {
                console.log("Something wrong when updating data!");
              } else {
                console.log('update successfuly');

              }
            });
          })

          jwt.sign(
            { id: user.id },
            "secret_key",
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user
              });
            }
          );
        })
      })
  });
});

router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user))
})

router.get('/get_user', (req, res) => {
  User.find({}, function (err, userlist) {
    res.json({
      userlist
    })
  })
})

router.post("/contact_us", (req, res) => {
  sendContactemail(req.body)
    .then((doc) => {
      res.status(200).json("Msg Send.")
    })
})

router.post("/logout", (req, res) => { });

module.exports = router;
