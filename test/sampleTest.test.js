
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { app, db } = require('../src/sample_dbTest.js'); 

// const expect = chai.expect;
// chai.use(chaiHttp);

// describe('Database Connection Test', () => {
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

//   it('should connect to the database successfully', (done) => {
//     chai.request(app)
//       .get('/test-db')
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('message').eql('Database connection successful!');
//         done();
//       });
//   });

//   // it('should fail to connect to the database', async () => {
//   //   await db.sequelize.close(); 
//   //   const res = await chai.request(app).get('/test-db');
//   //   expect(res).to.have.status(500);
//   //   expect(res.body).to.have.property('message').eql('Database connection failed!');
//   // });
// });

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, db } = require('../src/sample_dbTest.js'); 

const expect = chai.expect;
chai.use(chaiHttp);

describe('Database Connection Test', () => {
  before(async () => {
    if (!db?.sequelize) {
      throw new Error('Database connection not initialized');
    }
    await db.sequelize.sync();
  });

  after(async () => {
    if (db?.sequelize) {
      await db.sequelize.close();
    }
  });

  it('should connect to the database successfully', (done) => {
    chai.request(app)
      .get('/test-db')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').eql('Database connection successful!');
        done();
      });
  });

  // You may uncomment this for testing a failed database connection
  // it('should fail to connect to the database', async () => {
  //   await db.sequelize.close(); 
  //   const res = await chai.request(app).get('/test-db');
  //   expect(res).to.have.status(500);
  //   expect(res.body).to.have.property('message').eql('Database connection failed!');
  // });
});
