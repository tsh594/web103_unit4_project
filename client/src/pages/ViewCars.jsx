import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteCar, getAllCars } from '../services/CarsAPI'
import { toCurrency } from '../utilities/calcPrice'
import '../css/Pages.css'
import '../App.css'

const ViewCars = ({ title }) => {
    const [cars, setCars] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = title
    }, [title])

    const loadCars = async () => {
        try {
            setLoading(true)
            const data = await getAllCars()
            setCars(data)
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCars()
    }, [])

    const handleDelete = async (id) => {
        const shouldDelete = window.confirm('Delete this build permanently?')
        if (!shouldDelete) return

        try {
            await deleteCar(id)
            setCars((prev) => prev.filter((car) => car.id !== id))
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    
    return (
        <main className='list-wrap'>
            <article>
                <header>
                    <h2>Saved Custom Cars</h2>
                </header>

                {errorMessage ? <p className='error-text'>{errorMessage}</p> : null}
                {loading ? <p>Loading your builds...</p> : null}

                {!loading && cars.length === 0 ? (
                    <p>No cars saved yet. Go to Customize to create your first build.</p>
                ) : null}

                <div className='car-grid'>
                    {cars.map((car) => (
                        <article key={car.id} className='car-card'>
                            <header>
                                <h3>{car.name}</h3>
                                <p>{toCurrency(car.total_price)}</p>
                            </header>
                            <p>Exterior: {car.exterior_color}</p>
                            <p>Wheels: {car.wheel_type}</p>
                            <p>Interior: {car.interior_trim}</p>
                            <p>Engine: {car.engine_type}</p>
                            <p>Spoiler: {car.spoiler ? 'Yes' : 'No'}</p>

                            <footer>
                                <Link role='button' to={`/customcars/${car.id}`}>Details</Link>
                                <Link role='button' to={`/edit/${car.id}`}>Edit</Link>
                                <button type='button' className='secondary' onClick={() => handleDelete(car.id)}>Delete</button>
                            </footer>
                        </article>
                    ))}
                </div>
            </article>
        </main>
    )
}

export default ViewCars