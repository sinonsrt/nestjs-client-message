declare namespace NodeJS {
  export interface ProcessEnv {
    // DB
    DATABASE_URL: string;

    // API's
    SEARCH_ADDRESS_API: string;

    // Encrypter
    BCRYPT_SALT: string;

    // KAFKA
    KAFKA_BROKER_URL: string;
    KAFKA_CLIENT_ID: string;
    KAFKA_CONSUMER_GROUP_ID: string;
    KAFKA_CREATE_USER_TOPIC: string;
  }
}
