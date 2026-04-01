import express from 'express'
import {
  createCustomCar,
  deleteCustomCar,
  getAllCustomCars,
  getCustomCarById,
  updateCustomCar
} from '../controllers/customCarsController.js'

const router = express.Router()

router.get('/', getAllCustomCars)
router.get('/:id', getCustomCarById)
router.post('/', createCustomCar)
router.put('/:id', updateCustomCar)
router.delete('/:id', deleteCustomCar)

export default router
