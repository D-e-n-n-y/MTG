const router = require('express').Router();
const upload = require('../middleWare/uploadMiddle');
const { checkUser } = require('../middleWare/userMiddle');
const { Products } = require('../db/models');

router.route('/')
.post(upload.single('img'), async (req, res) => {
    console.log(req.file);
  console.log('-------------------------',req.session);
  const newPost = await Products.create(
    {title: req.body.title, img: req.file?.filename, condition: req.body.condition,  creator_id: req.session.user.id},
  );
  console.log(JSON.parse(JSON.stringify(newPost)))
  res.json({ newPost });
 
});


router.route('/:id')
  .delete(checkUser, async (req, res) => {
    await Products.destroy({ where: { id: req.params.id } });
    res.sendStatus('200');
  });



module.exports = router;