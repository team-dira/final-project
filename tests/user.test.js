const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let userData = {
  name: 'admin',
  username: 'admin',
  email: 'admin@mail.com',
  avatar_url: 'https://i.pravatar.cc/300',
  str_number: 1111111,
  work_address: '9411 Canterbury Street, Nutley, NJ 07110',
  password: '1234',
  role: 'advisoryDoctor'
}

// SUCCESS
describe('Register / Success Case', () => {
  test('Should send an object with keys: messange, status-code, id and username', (done) => {
    request(app)
      .post('/register')
      .send(userData)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        else {
          expect(res.status).toBe(201)
          expect(res.body).toHaveProperty('message', 'user success to register')
          expect(res.body).toHaveProperty('status-code', 201)
          expect(res.body).toHaveProperty('id', expect.any(Number))
          expect(res.body).toHaveProperty('name', userData.name)
          expect(res.body).toHaveProperty('username', userData.username)
          expect(res.body).toHaveProperty('email', userData.email)
          expect(res.body).toHaveProperty('avatar_url', userData.avatar_url)
          expect(res.body).toHaveProperty('str_number', userData.str_number)
          expect(res.body).toHaveProperty('work_address', userData.work_address)
          expect(res.body).not.toHaveProperty('password')
          done()
        }
      })
  })
})

// SUCCESS
describe('Login / Success Case', () => {
  test('Successfully login', (done) => {
    request(app)
      .post('/login')
      .send(userData)
      .set('Accept', 'application/json')
      .then((err, res) => {
        if (err) {
          done(err)
        }
        else {
          const { status, body } = res
          expect(status).toBe(201)
          expect(body).toHaveProperty('access_token', expect.any(String))
          done()
        }
      })
  })
})

// FAILED
describe('Login failed validation', () => {
  test('wrong password', (done) => {
    let wrongPass = { ...userData, password: 'salahpassbro' }
    request(app)
      .post('/login')
      .send(wrongPass)
      .set('Accept', 'application/json')
      .then((err, res) => {
        if (err) {
          done(err)
        }
        else {
          const { status, body } = res
          expect(status).toBe(401)
          expect(body).toHaveProperty('msg', 'wrong password / email')
          done()
        }
      })
  })
  test('wrong email', (done) => {
    let wrongUsername = { ...userData, email: 'salahemailbro' }
    request(app)
      .post('/login')
      .send(wrongUsername)
      .set('Accept', 'application/json')
      .then((err, res) => {
        if (err) {
          done(err)
        }
        else {
          const { status, body } = res
          expect(status).toBe(401)
          expect(body).toHaveProperty("msg", "user not found")
          done()
        }
      })
  })
})

afterAll((done) => {
  queryInterface.bulkDelete('Users')
    .then(() => {
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
})

