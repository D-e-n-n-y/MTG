const { Products } = require('../db/models');
const router = require('express').Router();

router.route('/')
  .get(async (req, res) => {
    const postsOrigin = await Products.findAll({ order: [['createdAt', 'DESC']], raw: true });
    const cards = postsOrigin.map((el) => ({ ...el, owner:  req.session.user?.creator_id === req.session.user?.id })); 
    res.render('mainPage', {cards});
  });


module.exports = router;