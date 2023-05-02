import * as dotenv from 'dotenv';

dotenv.config();

export default {
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgresql://admin:admin@localhost:5432/mydb?schema=barbershop',
  SEARCH_ADDRESS_API:
    process.env.SEARCH_ADDRESS_API || 'https://viacep.com.br/ws/value/json/',
  BCRYPT_SALT: process.env.BCRYPT_SALT || 12,
  KAFKA_BROKER_URL: process.env.KAFKA_BROKER_URL || 'localhost:9092',
  KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'user',
  KAFKA_CONSUMER_GROUP_ID:
    process.env.KAFKA_CONSUMER_GROUP_ID || 'user-consumer',
  KAFKA_CREATE_USER_TOPIC: process.env.KAFKA_CREATE_USER_TOPIC || 'createUser',
};
