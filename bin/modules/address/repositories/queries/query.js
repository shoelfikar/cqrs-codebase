
class Query {

  constructor(db) {
    this.db = db;
  }

  async findAddresses(parameter) {
    this.db.setCollection('address');
    const recordset = await this.db.findMany(parameter);
    return recordset;
  }

  async findOneAddress(parameter) {
    this.db.setCollection('address');
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }
}

module.exports = Query;
