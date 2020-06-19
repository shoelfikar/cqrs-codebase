
class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOneUser(document){
    this.db.setCollection('users');
    const result = await this.db.insertOne(document);
    return result;
  }

  async upsertOneUser(params,document){
    this.db.setCollection('users');
    const result = await this.db.upsertOne(params, document);
    return result;
  }

  async deleteOneUser(document){
    this.db.setCollection('users');
    const result = await this.db.deleteOne(document);
    return result;
  }
}

module.exports = Command;
