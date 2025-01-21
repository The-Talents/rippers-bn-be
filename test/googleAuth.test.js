const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { OAuth2Client } = require('google-auth-library');
const app = require('../src/server');
const { User } = require('../models');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth API Tests', () => {
  // Suppress error logging
  before(() => {
    console.error = () => {};
  });

  let googleAuthStub;

  beforeEach(() => {
    if (googleAuthStub) {
      googleAuthStub.restore();
    }
  });

  describe('GET /api/v1/auth/google-login', () => {
    it('should return 400 if no token is provided', (done) => {
      chai
        .request(app)
        .get('/api/v1/auth/google-login')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal('Authorization code is required');
          done();
        });
    });

    it('should successfully login with valid Google token for existing user', (done) => {
      const mockGooglePayload = {
        email: 'test@example.com',
        given_name: 'John',
        family_name: 'Doe',
        picture: 'http://example.com/picture.jpg'
      };

      const mockUser = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        profilePicture: 'http://example.com/picture.jpg',
        role: 'user'
      };

      googleAuthStub = sinon.stub(OAuth2Client.prototype, 'verifyIdToken').resolves({
        getPayload: () => mockGooglePayload
      });

      const userFindStub = sinon.stub(User, 'findOne').resolves(mockUser);

      chai
        .request(app)
        .get('/api/v1/auth/google-login')
        .query({ token: 'valid_google_token' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.message).to.equal('Login successful');
          expect(res.body.data).to.have.property('token');
          userFindStub.restore();
          done();
        });
    });

    it('should return 404 when user does not exist', (done) => {
      const mockGooglePayload = {
        email: 'nonexistent@example.com',
        given_name: 'Jane',
        family_name: 'Smith',
        picture: 'http://example.com/picture.jpg'
      };

      googleAuthStub = sinon.stub(OAuth2Client.prototype, 'verifyIdToken').resolves({
        getPayload: () => mockGooglePayload
      });

      const userFindStub = sinon.stub(User, 'findOne').resolves(null);

      chai
        .request(app)
        .get('/api/v1/auth/google-login')
        .query({ token: 'valid_google_token' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(404);
          expect(res.body.message).to.equal('Account does not exist. Please create an account first.');
          userFindStub.restore();
          done();
        });
    });

    it('should handle Google API errors', (done) => {
      googleAuthStub = sinon.stub(OAuth2Client.prototype, 'verifyIdToken').rejects(
        new Error('Invalid token')
      );

      chai
        .request(app)
        .get('/api/v1/auth/google-login')
        .query({ token: 'invalid_token' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(400);
          expect(res.body.message).to.equal('Invalid token');
          done();
        });
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  // Restore error logging
  after(() => {
    console.error = console.error;
  });
});