import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

import { AUTH_CONFIG } from '../common/constants/constants';

dotenv.config();

export default registerAs(AUTH_CONFIG, () => ({
  secret: {
    jwtSecret: process.env.JWT_SECRET
  }
}))