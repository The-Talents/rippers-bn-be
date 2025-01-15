const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server'); // adjust path if needed
const { expect } = chai;

chai.use(chaiHttp);
describe('Login API Tests', () => {

    it('should log in successfully with valid credentials', (done) => {
      const validUser = {
        email: 'lizza@example.com',
        password: 'SecurePassword123'
      };
  
      chai
        .request(app)
        .post('/api/auth/login')
        .send(validUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message').equal('Login successful');
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('user');
          done();
        });
    });
  
    it('should return 403 for invalid credentials', (done) => {
        const invalidUser = {
          email: 'nonexistent@example.com',
          password: 'WrongPassword123'
        };
    
        chai
          .request(app)
          .post('/api/auth/login')
          .send(invalidUser)
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').equal('Invalid credentials');
            done();
          });
      });
    
  });
  