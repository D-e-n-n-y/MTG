const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Users } = require('../db/models');

router.route('/login')
  .get((req, res) => {
    const { error } = req.query;
    if (error) {
      return res.render('login', { mesage: '401' });
    }

    res.render('login');
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    if (email && password) {
      const currentUser = await Users.findOne({ where: { email } });
      if (currentUser && await bcrypt.compare(password, currentUser.password)) {
        req.session.user = { id: currentUser.id, name: currentUser.name };
        return res.redirect('/');
      }
      res.redirect('/user/login?error=inputs');
    } else {
      res.redirect('/user/login');
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
    const { name, password, email, city} = req.body;
    console.log(name, password, email, city);
    if (name && password && email && city) {
      const secretPass = await bcrypt.hash(password, Number(process.env.ROUNDS));
      try {
        const newUser = await Users.create({ ...req.body, password: secretPass });
        req.session.user = { id: newUser.id, name: newUser.name };
        return res.redirect('/');
      } catch (err) {
       console.log(err);
        res.redirect('/user/signup?error=inputs');
      }
    }
  });

router.route('/logout')
  .get((req, res) => {
    req.session.destroy();
    res.clearCookie('sid').redirect('/');
  });

  router.route('/LK')
  .get((req, res) => {
    const { error } = req.query;
    if (error) {
      return res.render('LK', { mesage: '401' });
    }

    res.render('LK');
  })


  router.route('/basket')
  .get((req, res) => {
    const { error } = req.query;
    if (error) {
      return res.render('Basket', { mesage: '401' });
    }

    res.render('Basket');
  })



module.exports = router;