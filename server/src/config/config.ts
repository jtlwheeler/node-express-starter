import * as Joi from 'joi';
import * as dotenv from 'dotenv';

const envFile = process.env.CONFIG_FILE || '.env';
const result = dotenv.config({path: envFile});
if (result.error) {
    throw result.error;
}

const environmentSchema = Joi.object({
    NODE_ENV: Joi.string().required()
        .allow(['development', 'production', 'test'])
        .default('development'),
    SERVER_PORT: Joi.number()
        .default(3000),
    MONGO_URI: Joi.string().required(),
    JWT_SECRET: Joi.string().required()
}).unknown()
    .required();

const {error, value: envVars} = Joi.validate(process.env, environmentSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    mongoUri: envVars.MONGO_URI,
    jwtSecret: envVars.JWT_SECRET
};

export default config;
