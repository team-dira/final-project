const request = require('supertest');
const jwt = require('jsonwebtoken')
const app = require('../app');
const { UserPost, User } = require('../models');


let postId
let doctorToken
let advisorToken
let advisorId

let doctorAccount = {
  name: 'Alex Smith',
  username: 'alex32prof',
  email: 'alex@mail.com',
  avatar_url: 'alex.png',
  str_number: '33.1.1.401.3.18.103711',
  work_address: 'RS Mh. Thamrin',
  password: '123',
  role: 'doctor'
}

let advisorAccount = {
  name: 'David Smith',
  username: 'David32prof',
  email: 'David@mail.com',
  avatar_url: 'David.png',
  str_number: '33.1.1.401.3.18.103711',
  work_address: 'RS Mitra Keluarga',
  password: '123',
  role: 'adviseryBoard'
}



describe('posts test', () => {
  beforeAll((done) => {
    User.create(doctorAccount)
      .then(data => {
        doctorToken = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET)
        return User.create(advisorAccount)
      })
      .then(data => {
        advisorId = data.id
        advisorToken = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET)
        return UserPost.create({
          title: 'Testing Corona',
          thumbnail_url: 'corona.png',
          caption: 'Lorem ipsum dolor sit amet bla bla bla',
          UserId: data.id
        })
      })
      .then((data) => {
        postId = data.id
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterAll((done) => {
    User.destroy({
      where: {},
      truncate: true
    })
      .then(_ => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  describe('/GET', () => {
    test('success get post', (done) => {
      request(app)
        .get('/posts')
        .expect(200)
        .set('access_token', advisorToken)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body[0]).toBeInstanceOf(Object);
            expect(res.body[0]).toHaveProperty('id', expect.any(Number));
            expect(res.body[0]).toHaveProperty('title', 'Testing Corona');
            done();
          }
        });
    })

    test('success get post By ID', (done) => {
      request(app)
        .get(`/posts/${postId}`)
        .expect(200)
        .set('access_token', advisorToken)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).toHaveProperty('id', expect.any(Number));
            expect(res.body).toHaveProperty('title', expect.any(String));
            done();
          }
        });
    })

    test('fail because no authentication', (done) => {
      request(app)
        .get(`/posts`)
        .expect(400)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.body).toHaveProperty('msg', 'cannot access');
          }
        });
    })
  })

  describe('/POST', () => {
    test('success post', (done) => {
      request(app)
        .post('/posts')
        .send({
          title: 'Testing Article',
          thumbnail_url: 'disease.png',
          caption: 'Lorem ipsum dolor sit amet bla bla bla',
          UserId: advisorId,
        })
        .set('access_token', advisorToken)
        .expect(201)
        .end(function (err, res) {
          if (err) {
            done(err)
          }
          else {
            expect(res.body).toHaveProperty('msg', 'create post succeed')
            done()
          }
        })
    })

    test('fail post because no authentication', (done) => {
      request(app)
        .post('/posts')
        .send({
          title: 'Testing Article',
          thumbnail_url: 'disease.png',
          caption: 'Lorem ipsum dolor sit amet bla bla bla',
          UserId: 0,
        })
        .expect(400)
        .end(function (err, res) {
          if (err) {
            done(err)
          }
          else {
            expect(res.body).toHaveProperty('msg', 'cannot access')
            done()
          }
        })
    })

    test('fail post because empty property', (done) => {
      request(app)
        .post('/posts')
        .send({
          title: '',
          thumbnail_url: '',
          caption: '',
          UserId: 0,
        })
        .expect(400)
        .set('access_token', advisorToken)
        .end(function (err, res) {
          if (err) {
            done(err)
          }
          else {
            expect(res.body).toHaveProperty('msg', 'cannot be empty')
            done()
          }
        })
    })
  })

  describe('Delete posts', () => {
    test('success deleting post', (done) => {
      request(app)
        .delete(`/posts/${postId}`)
        .set('access_token', advisorToken)
        .expect(200)
        .end((err, res) => {
          console.log(postId,advisorId)
          if (err) {
            done(err)
          }
          else {
            expect(res.body).toHaveProperty('msg', 'Delete succeed')
            done()
          }
        })
    })
    test('fail delete because no authentication', (done) => {
      request(app)
        .delete(`/posts/${postId}`)
        .expect(400)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          else {
            expect(res.body).toHaveProperty('msg', 'cannot access')
            done()
          }
        })
    })
    test('fail delete because unauthorized', (done) => {
      request(app)
        .delete(`/posts/${postId}`)
        .expect(400)
        .set('access_token', doctorToken)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          else {
            expect(res.body).toHaveProperty('msg', 'Unauthorized')
            done()
          }
        })
    })

    test('fail delete because no post found', (done) => {
      request(app)
        .delete(`/posts/999`)
        .expect(404)
        .set('access_token', advisorToken)
        .end((err, res) => {
          if (err) {
            done(err)
          }
          else {
            expect(res.body).toHaveProperty('msg', 'Not Found')
            done()
          }
        })
    })
  })
})