import { MONGODB_URI_DEV } from './constants';

export class ConfigService {
  public async getMongoConfig() {
    // 
    return {
      uri: MONGODB_URI_DEV,

      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
