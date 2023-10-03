 // aws-config.js
import AWS from 'aws-sdk';
// import dotenv from 'dotenv';

// Load environment variables from .env.local
// dotenv.config();

// Configure AWS services with your credentials and region
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'eu-north-1',
});

// Export the configured AWS object
export default AWS;




