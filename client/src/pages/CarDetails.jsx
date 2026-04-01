import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteCar, getCarById } from '../services/CarsAPI'
import { EXTERIOR_SWATCH, WHEEL_ICON } from '../utilities/carConfig'
import { toCurrency } from '../utilities/calcPrice'
import '../css/Pages.css'
import '../App.css'

const CarDetails = ({ title }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        const loadCar = async () => {
            try {
                const data = await getCarById(id)
                setCar(data)
            } catch (error) {
                setErrorMessage(error.message)
            }
        }

        loadCar()
    }, [id])

    const handleDelete = async () => {
        const shouldDelete = window.confirm('Delete this custom car permanently?')
        if (!shouldDelete) return

        try {
            await deleteCar(id)
            navigate('/customcars')
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return (
        <main className='detail-wrap'>
            <article>
                {errorMessage ? <p className='error-text'>{errorMessage}</p> : null}

                {!car ? (
                    <p>Loading build details...</p>
                ) : (
                    <>
                        <header>
                            <h2>{car.name}</h2>
                            <p><strong>{toCurrency(car.total_price)}</strong></p>
                        </header>

                        <div className='car-preview' style={{ backgroundColor: EXTERIOR_SWATCH[car.exterior_color] }}>
                            <p className='car-emoji'>🚗</p>
                            <p>{WHEEL_ICON[car.wheel_type]}</p>
                            <p>{car.spoiler ? 'Spoiler: Yes' : 'Spoiler: No'}</p>
                        </div>

                        <p>Exterior: {car.exterior_color}</p>
                        <p>Wheels: {car.wheel_type}</p>
                        <p>Interior: {car.interior_trim}</p>
                        <p>Engine: {car.engine_type}</p>

                        <footer>
                            <Link role='button' to='/customcars'>Back to List</Link>
                            <Link role='button' to={`/edit/${car.id}`}>Edit</Link>
                            <button type='button' className='secondary' onClick={handleDelete}>Delete</button>
                        </footer>
                    </>
                )}
            </article>
        </main>
    )
}

export default CarDetails