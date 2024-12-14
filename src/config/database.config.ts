import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

import { DATABASE_CONFIG } from '../common/constants/constants';

dotenv.config();

export default registerAs(DATABASE_CONFIG, () => ({
  mongo: {
    uri: process.env.MONGO_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
}))
