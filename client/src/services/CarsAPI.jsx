const BASE_URL = '/api/customcars'

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const message = data?.error || 'Request failed.'
    throw new Error(message)
  }

  return data
}

export const getAllCars = async () => {
  const response = await fetch(BASE_URL)
  return parseResponse(response)
}

export const getCarById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`)
  return parseResponse(response)
}

export const createCar = async (payload) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  return parseResponse(response)
}

export const updateCar = async (id, payload) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  return parseResponse(response)
}

export const deleteCar = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })

  return parseResponse(response)
}
