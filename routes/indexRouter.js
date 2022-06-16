const {  } = require('../db/models');
const router = require('express').Router();

router.route('/')
  .get(async (req, res) => {
    const postsOrigin = await .findAll({ order: [['createdAt', 'DESC']], raw: true });
    const posts = postsOrigin.map((el) => ({ ...el, owner:  req.session.user?.userId === 1})); 
    res.render('mainPage', { posts });
  });


module.exports = router;