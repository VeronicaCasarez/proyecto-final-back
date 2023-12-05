import dotenv from "dotenv";

dotenv.config();

export const PERSISTENCE = process.env.PERSISTENCE || "MONGO";

export default {
  app: {
    ENV: process.env.NODE_ENV || "development",
  },
  mailing: {
    SERVICE: process.env.MAILING_SERVICE,
    USER: process.env.MAILING_USER,
    PASSWORD: process.env.MAILING_PASSWORD,
  },
  mongo: {
    URL: process.env.MONGO_URL,
  },
  jwt: {
    COOKIE: process.env.NAME_COOKIE,
    SECRET: process.env.SECRET_SECRET,
  },
};
