const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

let advisorUser = {
  email: 'David@mail.com',
  password: '123'
}

describe('User Login', () => {
  beforeAll((done) => {
    User.create({
      name: 'David Smith',
      username: 'David32prof',
      email: 'David@mail.com',
      avatar_url: 'David.png',
      str_number: '33.1.1.401.3.18.103711',
      work_address: 'RS Mitra Keluarga',
      password: '123',
      role: 'adviseryBoard'
    })
      .then(() => {
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


  test('success login', (done) => {
    request(app)
      .post('/login')
      .send(advisorUser)
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        else {
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('access_token')
          expect(res.body).toHaveProperty('email')
          done()
        }
      })
  })
  test('fail login invalid password', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'David@mail.com',
        password: 'ladadiF'
      })
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        else {
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'Wrong password')
          done()
        }
      })
  })
  test('fail because unregistered email', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'Davidav@mail.com',
        password: 'ladadiF'
      })
      .end(function (err, res) {
        if (err) {
          done(err)
        }
        else {
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'Wrong password')
          done()
        }
      })
  })
})