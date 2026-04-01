import { pool } from '../config/database.js'

const EXTERIOR_PRICES = {
  Red: 700,
  Blue: 600,
  Black: 800,
  White: 500
}

const WHEEL_PRICES = {
  Standard: 400,
  Sport: 900,
  Offroad: 1100
}

const INTERIOR_PRICES = {
  Cloth: 300,
  Leather: 1200,
  Luxury: 2000
}

const ENGINE_PRICES = {
  Eco: 2200,
  Turbo: 4200,
  Electric: 7000
}

const SPOILER_PRICE = 450
const BASE_PRICE = 18000

const calculateTotalPrice = ({ exteriorColor, wheelType, interiorTrim, engineType, spoiler }) => {
  return (
    BASE_PRICE +
    EXTERIOR_PRICES[exteriorColor] +
    WHEEL_PRICES[wheelType] +
    INTERIOR_PRICES[interiorTrim] +
    ENGINE_PRICES[engineType] +
    (spoiler ? SPOILER_PRICE : 0)
  )
}

const getImpossibleReason = ({ wheelType, engineType, interiorTrim, spoiler }) => {
  if (wheelType === 'Offroad' && engineType === 'Electric') {
    return 'Offroad wheels are not available with the Electric engine.'
  }

  if (interiorTrim === 'Luxury' && engineType === 'Eco') {
    return 'Luxury interior requires Turbo or Electric engine.'
  }

  if (spoiler && wheelType === 'Offroad') {
    return 'Spoiler package is not compatible with Offroad wheels.'
  }

  return null
}

const normalizePayload = (body = {}) => {
  return {
    name: typeof body.name === 'string' ? body.name.trim() : '',
    exteriorColor: body.exteriorColor,
    wheelType: body.wheelType,
    interiorTrim: body.interiorTrim,
    engineType: body.engineType,
    spoiler: Boolean(body.spoiler)
  }
}

const validateRequiredFields = (car) => {
  if (!car.name) return 'Please provide a car name.'
  if (!EXTERIOR_PRICES[car.exteriorColor]) return 'Please select a valid exterior color.'
  if (!WHEEL_PRICES[car.wheelType]) return 'Please select a valid wheel type.'
  if (!INTERIOR_PRICES[car.interiorTrim]) return 'Please select a valid interior trim.'
  if (!ENGINE_PRICES[car.engineType]) return 'Please select a valid engine type.'

  return null
}

export const getAllCustomCars = async (_, res) => {
  try {
    const result = await pool.query('SELECT * FROM custom_cars ORDER BY id DESC')
    return res.status(200).json(result.rows)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch cars.' })
  }
}

export const getCustomCarById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM custom_cars WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found.' })
    }

    return res.status(200).json(result.rows[0])
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch car.' })
  }
}

export const createCustomCar = async (req, res) => {
  try {
    const car = normalizePayload(req.body)
    const requiredError = validateRequiredFields(car)

    if (requiredError) {
      return res.status(400).json({ error: requiredError })
    }

    const impossibleReason = getImpossibleReason(car)
    if (impossibleReason) {
      return res.status(400).json({ error: impossibleReason })
    }

    const totalPrice = calculateTotalPrice(car)

    const query = `
      INSERT INTO custom_cars
      (name, exterior_color, wheel_type, interior_trim, engine_type, spoiler, total_price)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `

    const values = [
      car.name,
      car.exteriorColor,
      car.wheelType,
      car.interiorTrim,
      car.engineType,
      car.spoiler,
      totalPrice
    ]

    const result = await pool.query(query, values)
    return res.status(201).json(result.rows[0])
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create car.' })
  }
}

export const updateCustomCar = async (req, res) => {
  try {
    const { id } = req.params
    const car = normalizePayload(req.body)
    const requiredError = validateRequiredFields(car)

    if (requiredError) {
      return res.status(400).json({ error: requiredError })
    }

    const impossibleReason = getImpossibleReason(car)
    if (impossibleReason) {
      return res.status(400).json({ error: impossibleReason })
    }

    const totalPrice = calculateTotalPrice(car)

    const query = `
      UPDATE custom_cars
      SET name = $1,
          exterior_color = $2,
          wheel_type = $3,
          interior_trim = $4,
          engine_type = $5,
          spoiler = $6,
          total_price = $7
      WHERE id = $8
      RETURNING *;
    `

    const values = [
      car.name,
      car.exteriorColor,
      car.wheelType,
      car.interiorTrim,
      car.engineType,
      car.spoiler,
      totalPrice,
      id
    ]

    const result = await pool.query(query, values)

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found.' })
    }

    return res.status(200).json(result.rows[0])
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update car.' })
  }
}

export const deleteCustomCar = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM custom_cars WHERE id = $1 RETURNING *', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Car not found.' })
    }

    return res.status(200).json({ message: 'Car deleted successfully.' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete car.' })
  }
}
