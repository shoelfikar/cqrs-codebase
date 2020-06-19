
const Command = require('./command');
const Query = require('../queries/query');
const model = require('./command_model');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const config = require('../../../../infra/configs/global_config');
const producer = require('../../../../helpers/events/kafka/kafka_producer');
const Redis = require('../../../../helpers/databases/redis/redis');
const { BadRequestError, InternalServerError } = require('../../../../helpers/error');
const uuidv4 = require('uuid/v4');
const common = require('../../utils/common');
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
    this.command = new Command(db);
    this.query = new Query(db);
  }

  async createUser(data) {
    const ctx = 'Register';
    if (/^(\+62|62|0)/.test(data.mobileNumber)) {
      data.mobileNumber = data.mobileNumber.replace(/^(\+62|62|0)/, '0');
    }
    const checkUser = await this.query.findOneUser({ email: data.email });
    if (checkUser.err) {
      const user = model.user();
      user.userId = uuidv4();
      user.fullName = data.fullName;
      user.mobileNumber = data.mobileNumber;
      user.email = data.email;
      user.password = await common.generateHash(data.password);
      user.status = '0';
      user.createdAt = new Date();
      user.lastModified = new Date();

      const saveUser = await this.command.insertOneUser(user);
      if (saveUser.err) {
        logger.error(ctx,'error', 'Internal server error', saveUser.err);
        return wrapper.error(new InternalServerError('Internal server error'));
      }
      const otp = await common.getOtp(4);
      const dataToKafka = {
        topic: 'otp-register',
        attributes: 1,
        body: {
          email: user.email,
          otp: otp,
          mobileNumber: user.mobileNumber,
          userId: user.userId,
          fullName: user.fullName,
          type: 'EMAIL'
        },
        partition: 1
      };
      await redisClient.setDataEx(`CONFIRM:${user.userId}`, otp, 24 * 60 * 60);
      await producer.kafkaSendProducer(dataToKafka);
      delete user.password;
      logger.info(ctx, 'success', 'Register success', user);
      return wrapper.data(user, 'Register success', 100);
    }
    logger.log(ctx, 'fail', 'Email is already taken!');
    const errData = {
      message: 'Email is already taken!',
      code: 1003
    };
    return wrapper.error(new BadRequestError(errData));
  }

  async updateUser(data) {
    const ctx = 'updateUser';
    if (/^(\+62|62|0)/.test(data.mobileNumber)) {
      data.mobileNumber = data.mobileNumber.replace(/^(\+62|62|0)/, '0');
    }

    const document = {
      $set: {
        fullName: data.fullName,
        mobileNumber: data.mobileNumber
      }
    };

    const saveUser = await this.command.upsertOneUser({ userId: data.userId }, document);
    if (saveUser.err) {
      logger.error(ctx,'error', 'Internal server error', saveUser.err);
      return wrapper.error(new InternalServerError('Internal server error'));
    }
    delete saveUser.data.password;
    logger.info(ctx, 'success', 'Update user success', saveUser.data);
    return wrapper.data(saveUser.data, 'Update user success', 200);
  }

  async deleteUser(data) {
    const ctx = 'deleteUser';
    const delUser = await this.command.deleteOneUser({ userId: data.userId });
    if (delUser.err) {
      logger.error(ctx,'error', 'Internal server error', delUser.err);
      return wrapper.error(new InternalServerError('Internal server error'));
    }

    logger.info(ctx, 'success', 'Delete user success', '');
    return wrapper.data('', 'Delete user success', 200);
  }

}

module.exports = User;
