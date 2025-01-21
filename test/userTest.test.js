const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server'); 
const { expect } = chai;
const { sequelize } = require('../models/index');
// chai.use(chaiHttp);
// describe('Login API Tests', () => {
//     it('should create a new user successfully', (done) => {
//       const newUser = {
//         firstName: 'keza',
//         lastName: 'kiriku',
//         email: 'tttt2@example.com',
//         birthOfDate: new Date('1990-01-01T00:00:00.000Z'), // Assuming birthOfDate is a date
//         preferredLanguage: 'English',
//         preferredCurrency: 'USD',
//         whereYouLive: 'Kigali, Rwanda',
//         role: 'Developer',
//         department: 'IT',
//         lineManager: 'Jane Smith',
//         gender: 'Male',
//         telephoneNumber: '1234567890',
//         password: 'Password123' // Password field
//       };
  
//       chai
//         .request(app)
//         .post('/api/auth/register') 
//         .send(newUser)
//         .end((err, res) => {
//           if (err) {
//             console.error(err);
//           }
//           expect(res).to.have.status(201);  
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('message').equal('User successfully registered');
//           expect(res.body).to.have.property('user');
//           expect(res.body).to.have.property('token');
//           done();
//         });
//     });
  
//     // Additional test cases can be added here...


//     it('should log in successfully with valid credentials', (done) => {
//       const validUser = {
//         email: 'tttt2@example.com',
//         password: 'Password123'
//       };
  
//       chai
//         .request(app)
//         .post('/api/auth/login')
//         .send(validUser)
//         .end((err, res) => {
//           expect(res).to.have.status(201);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('message').equal('Login successful');
//           expect(res.body).to.have.property('token');
//           expect(res.body).to.have.property('user');
//           done();
//         });
//     });
  
//     it('should return 403 for invalid credentials', (done) => {
//         const invalidUser = {
//           email: 'nonexistent@example.com',
//           password: 'WrongPassword123'
//         };
    
//         chai
//           .request(app)
//           .post('/api/auth/login')
//           .send(invalidUser)
//           .end((err, res) => {
//             expect(res).to.have.status(401);
//             expect(res.body).to.be.an('object');
//             expect(res.body).to.have.property('message').equal('Invalid credentials');
//             done();
//           });
//       });
    

//     });
    



chai.use(chaiHttp);

describe('Login API Tests', () => {
  before(async () => {
    await sequelize.sync({ force: true }); // Ensure clean DB
  });

  after(async () => {
    await sequelize.close(); // Close DB connection
  });

  it('should create a new user successfully', (done) => {
    const newUser = {
      firstName: 'keza',
      lastName: 'kiriku',
      email: 'tttt2@example.com',
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
      .post('/api/auth/register')
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

  it('should log in successfully with valid credentials', (done) => {
    const validUser = {
      email: 'tttt2@example.com',
      password: 'Password123',
    };

    chai
      .request(app)
      .post('/api/auth/login')
      .send(validUser)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message', 'Login successful');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
        done();
      });
  });

  it('should return 401 for invalid credentials', (done) => {
    const invalidUser = {
      email: 'nonexistent@example.com',
      password: 'WrongPassword123',
    };

    chai
      .request(app)
      .post('/api/auth/login')
      .send(invalidUser)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message', 'Invalid credentials');
        done();
      });
  });


  it('should return a valid JWT token on login', (done) => {
    const validUser = {
      email: 'tttt2@example.com',
      password: 'Password123',
    };

    chai
      .request(app)
      .post('/api/auth/login')
      .send(validUser)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('token');
        const token = res.body.token;
        expect(token).to.match(/^eyJ[\w-]+\.[\w-]+\.[\w-]+$/);
        done();
      });
  });
});
