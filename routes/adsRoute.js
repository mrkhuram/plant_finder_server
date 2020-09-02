const router = require("express").Router();
const User = require("../models/user");
const Ads = require("../models/adds");
const Multer = require('../config/multer')



router.post("/post_new_add", Multer.any(), (req, res) => {
  const { plant_title, plant_category, plant_description, posted_by, price_plant,nursery_name } = req.body;

  //simple Validation
  if (!plant_title || !plant_category || !plant_description || !posted_by || !price_plant) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  let img1 = req.files[0].filename
  let img2 = req.files[1].filename
  let img3 = req.files[2].filename

  let images = [img1, img2, img3]
  //Check for existence
  User.findOne({ _id: posted_by }).then(user => {

    if (!user) {
      return res.status(400).json({ msg: "User didn't Exist" });
    }

    const NewAdd = new Ads({
      plant_title, plant_category, plant_description, posted_by, images, price_plant, mobile_number: user.phone,nursery_name
    });

    NewAdd.save().then(docs => {
      if (docs) {

        res.status(200).json(docs)
      }

    })

  });
});


router.get("/get_all_plants", (req, res) => {
  Ads.find({}).then(docs => {
    res.status(200).json(docs)
  })
});

router.post("/get_my_ads", (req, res) => {
  const { user_id } = req.body;
  Ads.find({ posted_by: user_id }).then(docs => {
    res.status(200).json(docs)
  })
});

router.post("/get_my_ads", (req, res) => {
  const { plant_category } = req.body;
  Ads.find({ plant_category: plant_category }).then(docs => {
    res.status(200).json(docs)
  })
});






module.exports = router