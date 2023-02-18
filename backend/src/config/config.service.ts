const MONGODB_URI_DEV = 'mongodb://mongodb:27017/universities';
export class ConfigService {
  public async getMongoConfig() {
    // console.log(this.get('MONGODB_URI'));
    return {
      uri: MONGODB_URI_DEV,

      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
