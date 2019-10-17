const bcrypt = require('bcrypt');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'sunny',
          password: bcrypt.hashSync('pass', 8),
          department: 'management',
        },
        {
          username: 'norman',
          password: bcrypt.hashSync('pass', 8),
          department: 'office b',
        },
        {
          username: 'sue',
          password: bcrypt.hashSync('pass', 8),
          department: 'management',
        },
        {
          username: 'axle',
          password: bcrypt.hashSync('pass', 8),
          department: 'emergency',
        },
        {
          username: 'jonathan',
          password: bcrypt.hashSync('pass', 8),
          department: 'office b',
        },
        {
          username: 'ali',
          password: bcrypt.hashSync('pass', 8),
          department: 'office b',
        },
        {
          username: 'adil',
          password: bcrypt.hashSync('pass', 8),
          department: 'management',
        },
      ]);
    });
};
