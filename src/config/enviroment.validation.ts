import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production', 'staging')
    .default('development'),
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_HOST: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().required(),
  JWT_REFRESH_TOKEN_TTL: Joi.number().required(),
  PAYSTACK_SECRET_KEY: Joi.string().required(),
  PAYSTACK_BASE_URL: Joi.string().required(),
  LOCAL_HOST: Joi.string().required(),
  PROD_HOST: Joi.string().required(),
  AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_CLOUDFRONT_URL: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
});
