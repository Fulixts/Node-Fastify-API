import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  DATABASE_URL: z.string(),
  DATABASE_CLIENT: z.enum(['sqlite3', 'pg']),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('invalid environment variables: ', _env.error.format())

  throw new Error('invalid environment variables')
}

export const env = _env.data
