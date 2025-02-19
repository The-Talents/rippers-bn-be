// import db from '../models/index.js';
// const { User } = db; 
import db from '../models/index.js';
await db.sequelize.sync({ force: true });
const { User } = db;

import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from '../src/server.js';

chai.use(chaiHttp);

describe('User Registration API Tests', () => {
  before(async () => {
    await User.sequelize.sync({ force: true });  
  });

  after(async () => {
    await User.sequelize.close();  
  });

  it('should create a new user successfully', (done) => {
    const newUser = {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      birthOfDate: "1985-03-22",
      preferredLanguage: "French",
      preferredCurrency: "EUR",
      whereYouLive: "Paris, France",
      role: "Product Manager",
      department: "Marketing",
      lineManager: "Michael Brown",
      gender: "Female",
      telephoneNumber: "0987654321",
      password: "TestPassword2025"
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
