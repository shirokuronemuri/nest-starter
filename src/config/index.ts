import { envSchema } from './env.schema';
import { appConfig } from './app.config';

export type ConfigValues = ReturnType<typeof config>;

const config = () => {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('Failed parsing environment variables:');
    console.error(JSON.stringify(parsed.error.issues, null, 2));
    if (process.env.NODE_ENV === 'test') {
      process.exit(1);
    }
    throw new Error('Invalid environment configuration');
  }
  const env = parsed.data;

  return {
    app: appConfig(env),
    db: {
      url: env.DATABASE_URL,
    },
    redis: {
      url: env.REDIS_URL,
    },
  };
};

export default config;
