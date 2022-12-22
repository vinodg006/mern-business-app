import * as dotenv from 'dotenv';

export class ConfigService {
    private readonly envConfig: Record<string, string>;
    constructor() {
        const result = dotenv.config();

        if (result.error) {
            this.envConfig = process.env;
        } else {
            this.envConfig = result.parsed;
        }
    }

    public get(key: string): string {
        return this.envConfig[key];
    }

    public async getPortConfig() {
        return this.get('PORT');
    }

    public async getMongoConfig() {
        return {
            // uri: 'mongodb://' + this.get('MONGO_HOST') + '?replicaSet=rs' + '/' + this.get('MONGO_DATABASE'),
            uri: this.get('MONGO_URI'),
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }
}
