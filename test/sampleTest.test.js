
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { app, db } = require('../src/sample_dbTest.js'); 

// const expect = chai.expect;
// chai.use(chaiHttp);

// describe('User Creation Test', () => {
//   before(async () => {
//     if (!db?.sequelize) {
//       throw new Error('Database connection not initialized');
//     }
//     await db.sequelize.sync();
//   });

//   after(async () => {
//     if (db?.sequelize) {
//       await db.sequelize.close();
//     }
//   });

//   it('should create a new user successfully', (done) => {
//     const newUser = {
//       firstName: 'keza',
//       lastName: 'Doe',
//       email: 'johndoe7@example.com',
//       // birthOfDate: new Date('1990-01-01T00:00:00.000Z'),
//       preferredLanguage: 'English',
//       preferredCurrency: 'USD',
//       whereYouLive: 'Kigali, Rwanda',
//       role: 'Developer',
//       department: 'IT',
//       lineManager: 'Jane Smith',
//       gender: 'Male',
//       telephoneNumber: '1234567890'
//     };
  
//     chai.request(app)
//       .post('/create-user')
//       .send(newUser)
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res.body).to.have.property('message').eql('User created successfully!');
//         expect(res.body).to.have.property('user').that.includes(newUser);
//         done();
//       });
//   });
  

// });
