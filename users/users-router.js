const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config()

const Users = require('./users-model.js');
const restricted = require('../auth/restrict-middleware.js');

// POST /api/register
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(added => {
      const token = generateToken(added);
      res.status(201).json({ user: added, token });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'error adding user...'})
    });
});

// POST /api/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome back, ${user.username}!`, token});
      } else {
        res.status(401).json({ message: `You cannot pass!`});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Stretch goal only returns same department
// GET /api/users by department
router.get('/users', restricted, (req, res) => {
  const { username, department } = req.decodedToken;

    Users.findBy({ department })
      .then(users => {
        res.json({ loggedUser: username, department, users});
      })
      .catch(err => res.status(500).send(err))
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department,
  };
  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router;