const hippie = require('hippie');
const AppServer = require('../../bin/app/server');

describe('Root', () => {
  let appServer;

  beforeEach(function () {
    appServer = new AppServer();
    this.server = appServer.server;
  });

  afterEach(function () {
    this.server.close();
  });

  it('Should access root service', function (done) {

    hippie(this.server)
      .get('/users/v1/health-check')
      .expectStatus(200)
      .end((err, res, body) => {
        if(err){
          throw err;
        }
        done();
      });
  });
});
