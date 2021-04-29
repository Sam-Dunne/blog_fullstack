import * as dotenv from 'dotenv';
dotenv.config();

export default {
    stripe: {
        secret: process.env.STRIPE_API_KEY
    }
}