
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server'); 
const { expect } = chai;
const { sequelize } = require('../models/index');

chai.use(chaiHttp);

describe('User Registration API Tests', () => {
  before(async () => {
    await sequelize.sync({ force: true }); 
  });

  after(async () => {
    await sequelize.close(); 
  });

  it('should create a new user successfully', (done) => {
    const newUser = {
      firstName: 'keza',
      lastName: 'kiriku',
      email: 'tombola2@example.com',
      birthOfDate: '1990-01-01',
      preferredLanguage: 'English',
      preferredCurrency: 'USD',
      whereYouLive: 'Kigali, Rwanda',
      role: 'Developer',
      department: 'IT',
      lineManager: 'Jane Smith',
      gender: 'Male',
      telephoneNumber: '1234567890',
      password: 'Password123',
    };

    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send(newUser)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'User successfully registered');
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  
  it('should return 400 if required fields are missing', (done) => {
    const incompleteUser = {
      firstName: 'keza',
      email: 'missingfields@example.com',
      password: 'Password123',
    };

    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send(incompleteUser)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(400); 
        expect(res.body).to.have.property('message').that.includes('required'); 
        done();
      });
  });
});
