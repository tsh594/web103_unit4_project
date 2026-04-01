import dotenv from 'dotenv'
import { pool } from './database.js'

dotenv.config()

const createTableQuery = `
DROP TABLE IF EXISTS custom_cars;

CREATE TABLE custom_cars (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  exterior_color VARCHAR(30) NOT NULL,
  wheel_type VARCHAR(30) NOT NULL,
  interior_trim VARCHAR(30) NOT NULL,
  engine_type VARCHAR(30) NOT NULL,
  spoiler BOOLEAN NOT NULL DEFAULT FALSE,
  total_price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
`

const resetDatabase = async () => {
  try {
    await pool.query(createTableQuery)
    console.log('Database reset complete. custom_cars table created.')
  } catch (error) {
    console.error('Failed to reset database:', error)
  } finally {
    await pool.end()
  }
}

resetDatabase()
