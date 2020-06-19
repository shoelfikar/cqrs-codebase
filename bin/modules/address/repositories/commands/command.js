
class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOneAddress(document){
    this.db.setCollection('address');
    const result = await this.db.insertOne(document);
    return result;
  }

  async upsertOneAddress(params,document){
    this.db.setCollection('address');
    const result = await this.db.upsertOne(params, document);
    return result;
  }

  async deleteOneAddress(document){
    this.db.setCollection('address');
    const result = await this.db.deleteOne(document);
    return result;
  }
}

module.exports = Command;
