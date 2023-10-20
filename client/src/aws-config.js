 // aws-config.js
import AWS from 'aws-sdk';
// import dotenv from 'dotenv';

// Load environment variables from .env.local
// dotenv.config();

// Configure AWS services with your credentials and region
AWS.config.update({
  accessKeyId: 'AKIA3KL5YXS5X4X2DJ6D',
  secretAccessKey: 'LqNDXBW+/M9am2GS/v2yNAx6gRbJ5boepkZaNtBA',
  region: 'eu-north-1',
});

// Export the configured AWS object
export default AWS;




