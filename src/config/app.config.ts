import { Env } from './env.schema';

export const appConfig = (env: Env) => ({
  environment: env.NODE_ENV,
  port: env.PORT,
});
