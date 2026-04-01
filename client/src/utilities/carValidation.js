export const getImpossibleCombinationReason = ({ wheelType, engineType, interiorTrim, spoiler }) => {
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
