const request = require('supertest');
const jwt = require('jsonwebtoken')
const app = require('../app');
const { UserPost, User } = require('../models');

let advisorToken = jwt.sign({ email: "David@mail.com", password: '123' }, process.env.JWT_SECRET)
let regularToken = jwt.sign({ email: "alex@mail.com", password: '123' }, process.env.JWT_SECRET)
let dummyPosts = {
  title: 'Testing Article',
  thumbnail_url: 'disease.png',
  caption: 'Lorem ipsum dolor sit amet bla bla bla wkc wk'
}


describe('UserPost Routes', () => {
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
          UserId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Testing Doctor',
          thumbnail_url: 'bacteria.png',
          caption: 'Lorem ipsum dolor sit amet bla bla bla',
          UserId: 3,
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
  describe('userPost GET', () => {
    test('Success GET /posts', (done) => {
      request(app)
        .get('/posts')
        .expect(200)
        .set('access_token', regularToken)
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
    test('Failed GET /posts', (done) => {
      request(app)
        .get('/posts')
        .expect(401)
        .set('access_token', "")
        .end((err, res) => {
          if (err) {
            done(err)
          }
          else {
            expect(res.body.message).toBe('cannot access')
          }
        })
    })
  })
  describe('userPost POST', () => {
    describe('Success adding post', () => {
      test('success POST /posts', (done) => {
        request(app)
          .post('/posts')
          .send(dummyPosts)
          .set('access_token', advisorToken)
          .expect(201)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            else {
              expect(res.body.message).toBe('Success Post')
              done()
            }
          })
      })
    })
    describe('Fail adding post', () => {
      test('unauthorized account', (done) => {
        request(app)
          .post('/posts')
          .send(dummyPosts)
          .set('access_token', regularToken)
          .expect(401)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            else {
              expect(res.body.message).toBe('Unauthorized')
              done()
            }
          })
      })
      test('empty title', (done) => {
        request(app)
          .post('/posts')
          .send({
            thumbnail_url: 'disease.png',
            caption: 'Lorem ipsum dolor sit amet bla bla bla wkc wk'
          })
          .set('access_token', advisorToken)
          .expect(401)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            else {
              expect(res.body.message).toBe('tittle cannot be empty')
              done()
            }
          })
      })
      test('empty caption', (done) => {
        request(app)
          .post('/posts')
          .send({
            title: 'asdasdasd',
            thumbnail_url: 'disease.png'
          })
          .set('access_token', advisorToken)
          .expect(401)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            else {
              expect(res.body.message).toBe('caption cannot be empty')
            }
          })
      })
    })
  })
  describe('delete posts', () => {
    describe('Success delete posts', () => {
      test('succes DEL post', (done) => {
        request(app)
          .delete('/posts/2')
          .set('access_token', advisorToken)
          .expect(201)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            else {
              expect(res.body.message).toBe('Delete succeeded')
              done()
            }
          })
      })
    })
    describe('Fail delete posts', () => {
      test("wrong token", (done) => {
        request(app)
          .delete('/posts/2')
          .set('access_token', regularToken)
          .expect(401)
          .end((err, res) => {
            if (err) {
              done(err)
            }
            else {
              expect(res.body.message).toBe('Unauthorized')
              done()
            }
          })
      })
    })
  })
});
