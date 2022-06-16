const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.route('/signin')
  .get((req, res) => {
    const { error } = req.query;
    if (error) {
      return res.render('signin', { mesage: '401' });
    }

    res.render('signin');
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const currentUser = await User.findOne({ where: { email } });
      if (currentUser && await bcrypt.compare(password, currentUser.password)) {
        req.session.user = { id: currentUser.id, name: currentUser.name };
        return res.redirect('/');
      }
      res.redirect('/user/signin?error=inputs');
    } else {
      res.redirect('/user/signin');
    }
  })

router.route('/signup')
  .get((req, res) => {
    const { error } = req.query;
    if (error) {
      return res.render('signup', { mesage: '401' });
    }

    res.render('signup');
  })
  
  .post(async (req, res) => {
    const { name, password, email } = req.body;
    if (name && password && email) {
      const secretPass = await bcrypt.hash(password, Number(process.env.ROUNDS));
      try {
        const newUser = await User.create({ ...req.body, password: secretPass });
        req.session.user = { id: newUser.id, name: newUser.name };
        return res.redirect('/');
      } catch (err) {
       
        res.redirect('/user/signup?error=inputs');
      }
    } else {
      return res.redirect('/user/signup');
    }
  });

router.route('/logout')
  .get((req, res) => {
    req.session.destroy();
    res.clearCookie('sid').redirect('/');
  });



module.exports = router;