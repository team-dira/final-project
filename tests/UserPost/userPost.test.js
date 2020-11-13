const request = require('supertest');
const app = require('../../app');
const { UserPost, User } = require('../../models');

describe('UserPost GET Routes', () => {
  beforeAll((done) => {
    User.bulkCreate([
      {
        name: 'Alex Smith',
        username: 'alex32prof',
        email: 'alex@mail.com',
        avatar_url: 'alex.png',
        str_number: '33.1.1.401.3.18.103711',
        work_address: 'RS Mh. Thamrin',
        password: '123',
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        username: 'Jane32prof',
        email: 'Jane@mail.com',
        avatar_url: 'Jane.png',
        str_number: '33.1.1.401.2.18.103611',
        work_address: 'RS Mediros',
        password: '123',
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'David Smith',
        username: 'David32prof',
        email: 'David@mail.com',
        avatar_url: 'David.png',
        str_number: '33.1.1.401.3.18.103711',
        work_address: 'RS Mitra Keluarga',
        password: '123',
        role: 'adviseryBoard',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]).then(() => {
      return UserPost.bulkCreate([
        {
          title: 'Testing Article',
          thumbnail_url: 'disease.png',
          caption: 'Lorem ipsum dolor sit amet bla bla bla',
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Testing Doctor',
          thumbnail_url: 'bacteria.png',
          caption: 'Lorem ipsum dolor sit amet bla bla bla',
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Testing Corona',
          thumbnail_url: 'corona.png',
          caption: 'Lorem ipsum dolor sit amet bla bla bla',
          UserId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  afterAll((done) => {
    User.destroy({
      truncate: true,
    })
      .then(() => {
        return UserPost.destroy({
          truncate: true,
          cascade: true,
        });
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test('Success GET /posts', (done) => {
    request(app)
      .get('/posts')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body[0]).toBeInstanceOf(Object);
          expect(res.body[0]).toHaveProperty('id', expect.any(Number));
          expect(res.body[1]).toBeInstanceOf(Object);
          expect(res.body[1]).toHaveProperty('id', expect.any(Number));
          expect(res.body[2]).toBeInstanceOf(Object);
          expect(res.body[2]).toHaveProperty('id', expect.any(Number));
          expect(res.body[0]).toHaveProperty('title', 'Testing Article');
          expect(res.body[1]).toHaveProperty('title', 'Testing Doctor');
          expect(res.body[2]).toHaveProperty('title', 'Testing Corona');
          done();
        }
      });
  });
});
