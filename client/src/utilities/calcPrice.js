import {
  BASE_PRICE,
  ENGINE_PRICES,
  EXTERIOR_PRICES,
  INTERIOR_PRICES,
  SPOILER_PRICE,
  WHEEL_PRICES
} from './carConfig'

export const calculateTotalPrice = ({ exteriorColor, wheelType, interiorTrim, engineType, spoiler }) => {
  return (
    BASE_PRICE +
    EXTERIOR_PRICES[exteriorColor] +
    WHEEL_PRICES[wheelType] +
    INTERIOR_PRICES[interiorTrim] +
    ENGINE_PRICES[engineType] +
    (spoiler ? SPOILER_PRICE : 0)
  )
}

export const toCurrency = (value) => {
  return Number(value || 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}
