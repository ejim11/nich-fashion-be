import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION,
  mailHost: process.env.MAIL_HOST,
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
  awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  awsCloudFrontUrl: process.env.AWS_CLOUDFRONT_URL,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  host:
    process.env.NODE_ENV === 'development'
      ? process.env.LOCAL_HOST
      : process.env.PROD_HOST,
}));
