const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const basicAuth = require('../auth/basic_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const userHandler = require('../modules/user/handlers/api_handler');
const addressHandler = require('../modules/address/handlers/api_handler');
const mongoConnectionPooling = require('../helpers/databases/mongodb/connection');
const jwtAuth = require('../auth/jwt_auth_helper');

function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for CORS configuration
  const corsConfig = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    // ['*'] -> to expose all header, any type header will be allow to access
    // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
    allowHeaders: ['Authorization'],
    exposeHeaders: ['Authorization']
  });
  this.server.pre(corsConfig.preflight);
  this.server.use(corsConfig.actual);

  // // required for basic auth
  this.server.use(basicAuth.init());

  // anonymous can access the end point, place code bellow
  this.server.get('/users/v1/health-check', (req, res) => {
    wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
  });

  // authenticated client can access the end point, place code bellow
  this.server.post('/users/v1/login', basicAuth.isAuthenticated, userHandler.loginUser);
  this.server.post('/users/v1/verify-login', basicAuth.isAuthenticated, userHandler.verifyOtpLogin);
  this.server.post('/users/v1/register', basicAuth.isAuthenticated, userHandler.createUser);
  this.server.post('/users/v1/verify-register', basicAuth.isAuthenticated, userHandler.verifyOtpRegister);
  this.server.get('/users/v1', jwtAuth.verifyToken, userHandler.getUsers);
  this.server.get('/users/v1/:userId', jwtAuth.verifyToken, userHandler.getUser);
  this.server.put('/users/v1/update/:userId', jwtAuth.verifyToken, userHandler.updateUser);
  this.server.del('/users/v1/:userId', jwtAuth.verifyToken, userHandler.deleteUser);

  // end point address
  this.server.post('/address/v1', jwtAuth.verifyToken, addressHandler.createAddress);
  this.server.get('/address/v1', jwtAuth.verifyToken, addressHandler.getAddresses);
  this.server.get('/address/v1/:addressId', jwtAuth.verifyToken, addressHandler.getAddress);
  this.server.put('/address/v1/:addressId', jwtAuth.verifyToken, addressHandler.updateAddress);
  this.server.del('/address/v1/:addressId', jwtAuth.verifyToken, addressHandler.deleteAddress);

  //Initiation
  mongoConnectionPooling.init();
}

module.exports = AppServer;
