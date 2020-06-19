
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError, BadRequestError } = require('../../../../helpers/error');
const logger = require('../../../../helpers/utils/logger');
const common = require('../../utils/common');
const validate = require('validate.js');
const config = require('../../../../infra/configs/global_config');
const producer = require('../../../../helpers/events/kafka/kafka_producer');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const Redis = require('../../../../helpers/databases/redis/redis');
const REDIS_CLIENT_CONFIGURATION = {
  connection : {
    host: config.get('/redisHost'),
    port: config.get('/redisPort'),
    password: config.get('/redisPassword')
  },
  index : config.get('/redisIndex')
};
const redisClient = new Redis(REDIS_CLIENT_CONFIGURATION);

class User {

  constructor(db) {
    this.query = new Query(db);
  }

  async loginUser(data) {
    const ctx = 'loginUser';
    const checkUser = await this.query.findOneUser({ email: data.email });
    if (checkUser.err) {
      logger.error(ctx, 'error', 'User not found', checkUser.err);
      return wrapper.error(new NotFoundError('User not found'));
    }
    if (await common.decryptHash(data.password, checkUser.data.password)) {
      const token = await jwtAuth.generateToken({userId: checkUser.data.userId});
      const otp = await common.getOtp(4);
      const dataToKafka = {
        topic: 'otp-login-codebase',
        attributes: 1,
        body: {
          email: checkUser.data.email,
          otp: otp,
          mobileNumber: checkUser.data.mobileNumber,
          userId: checkUser.data.userId,
          fullName: checkUser.data.fullName,
          type: 'EMAIL'
        },
        partition: 1
      };
      await redisClient.setDataEx(`OTP-LOGIN:${checkUser.data.userId}`, otp, 24 * 60 * 60);
      await producer.kafkaSendProducer(dataToKafka);
      const dataResponse = {
        accessToken: token
      };
      logger.log(ctx, token, 'Login Success');
      return wrapper.data(dataResponse, 'Login Success', 200);
    }
    logger.log(ctx, 'fail', 'Password not match');
    return wrapper.error(new BadRequestError('Password not match'));
  }

  async verifyOtpLogin(data) {
    const ctx = 'verifyOtpLogin';
    const checkUser = await this.query.findOneUser({ userId: data.userId });
    if (checkUser.err) {
      logger.error(ctx, 'error', 'User not found', checkUser.err);
      return wrapper.error(new NotFoundError('User not found'));
    }
    const getOtp = await redisClient.getData(`OTP-LOGIN:${data.userId}`);
    if (validate.isEmpty(getOtp) || validate.isEmpty(getOtp.data)) {
      logger.log(ctx, 'fail', 'Otp has been expired');
      const errData = {
        message: 'Otp has been expired',
        code: 1006
      };
      return wrapper.error(new BadRequestError(errData));
    }
    const otpTemp = JSON.parse(getOtp.data);
    if (data.otp === otpTemp.data) {
      delete checkUser.data.password;
      logger.log(ctx, checkUser.data, 'Verify Otp Success');
      return wrapper.data(checkUser.data, 'Verify Otp Success', 200);
    }
    logger.log(ctx, 'fail', 'Otp not match');
    return wrapper.error(new BadRequestError('Otp not match'));
  }

  async verifyOtpRegister(data) {
    const ctx = 'verifyOtpRegister';
    const checkUser = await this.query.findOneUser({ userId: data.userId });
    if (checkUser.err) {
      logger.error(ctx, 'error', 'User not found', checkUser.err);
      return wrapper.error(new NotFoundError('User not found'));
    }
    const getOtp = await redisClient.getData(`CONFIRM:${data.userId}`);
    if (validate.isEmpty(getOtp) || validate.isEmpty(getOtp.data)) {
      logger.log(ctx, 'fail', 'Otp has been expired');
      const errData = {
        message: 'Otp has been expired',
        code: 1006
      };
      return wrapper.error(new BadRequestError(errData));
    }
    const otpTemp = JSON.parse(getOtp.data);
    if (data.otp === otpTemp.data) {
      delete checkUser.data.password;
      logger.log(ctx, checkUser.data, 'Verify Otp Success');
      return wrapper.data(checkUser.data, 'Verify Otp Success', 200);
    }
    logger.log(ctx, 'fail', 'Otp not match');
    return wrapper.error(new BadRequestError('Otp not match'));
  }

  async getUsers() {
    const ctx = 'getUsers';
    const user = await this.query.findUsers({});
    if (user.err) {
      logger.error(ctx, 'error', 'Can not find users', user.err);
      return wrapper.error(new NotFoundError('Can not find users'));
    }
    const { data } = user;
    data.map(v => {
      delete v.password;
    });

    logger.info(ctx, 'success', 'Get users success', data);
    return wrapper.data(data);
  }

  async getUser(payload) {
    const ctx = 'getUser';
    const user = await this.query.findOneUser({ userId: payload.userId });
    if (user.err) {
      logger.error(ctx, 'error', 'Can not find user', user.err);
      return wrapper.error(new NotFoundError('Can not find user'));
    }
    const { data } = user;
    delete data.password;

    logger.info(ctx, 'success', 'Get user success', data);
    return wrapper.data(data);
  }
}

module.exports = User;
