const request = require('supertest');
const app = require('../../app');
const { UserPost } = require('../../models');

describe('UserPost GET Routes', () => {
  beforeAll((done) => {
    UserPost.bulkCreate([
      {
        title: 'Testing Article',
        thumbnail_url: '',
      },
    ]);
  });
});
