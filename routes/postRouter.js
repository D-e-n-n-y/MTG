const router = require('express').Router();
const upload = require('../middleWare/uploadMiddle');
const { Products } = require('../db/models');

router.route('/')
.post(upload.single('img'), async (req, res) => {
    console.log(req.file);
  console.log('-------------------------',req.session);
  const newPost = await Products.create(
    {title: req.body.title,  condition: req.body.condition, img: req.file?.filename, creator_id: req.session.user.id},
  );
  console.log(JSON.parse(JSON.stringify(newPost)))
  res.json({ newPost });
 
});

module.exports = router;