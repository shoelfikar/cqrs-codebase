
const Command = require('./command');
const model = require('./command_model');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { InternalServerError } = require('../../../../helpers/error');
const uuidv4 = require('uuid/v4');

class Address {

  constructor(db) {
    this.command = new Command(db);
  }

  async createAddress(data) {
    const ctx = 'createAddress';
    const address = model.address();
    address.addressId = uuidv4();
    address.zipCode = data.zipCode;
    address.province = data.province;
    address.city = data.city;
    address.district = data.district;
    address.subDistrict = data.subDistrict;
    address.address = data.address;
    address.createdAt = new Date();
    address.lastModified = new Date();

    const saveAddress = await this.command.insertOneAddress(address);
    if (saveAddress.err) {
      logger.error(ctx,'error', 'Internal server error', saveAddress.err);
      return wrapper.error(new InternalServerError('Internal server error'));
    }
    logger.info(ctx, 'success', 'Create address success', address);
    return wrapper.data(address, 'Create address success', 100);
  }

  async updateAddress(data) {
    const ctx = 'updateAddress';

    const document = {
      $set: {
        zipCode: data.zipCode,
        province: data.province,
        city: data.city,
        district: data.district,
        subDistrict: data.subDistrict,
        address: data.address,
        lastModified: new Date()
      }
    };
    const saveAddress = await this.command.upsertOneAddress({addressId: data.addressId}, document);
    if (saveAddress.err) {
      logger.error(ctx,'error', 'Internal server error', saveAddress.err);
      return wrapper.error(new InternalServerError('Internal server error'));
    }
    logger.info(ctx, 'success', 'Update address success', saveAddress.data);
    return wrapper.data(saveAddress.data, 'Update address success', 200);
  }

  async deleteAddress(data) {
    const ctx = 'deleteAddress';
    const deladdress = await this.command.deleteOneAddress({ addressId: data.addressId });
    if (deladdress.err) {
      logger.error(ctx,'error', 'Internal server error', deladdress.err);
      return wrapper.error(new InternalServerError('Internal server error'));
    }

    logger.info(ctx, 'success', 'Delete address success', '');
    return wrapper.data('', 'Delete address success', 200);
  }

}

module.exports = Address;
