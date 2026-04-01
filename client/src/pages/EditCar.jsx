import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CarForm from '../components/CarForm'
import { getCarById, updateCar } from '../services/CarsAPI'
import { getImpossibleCombinationReason } from '../utilities/carValidation'
import '../css/Pages.css'
import '../App.css'

const EditCar = ({ title }) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        exteriorColor: 'Red',
        wheelType: 'Standard',
        interiorTrim: 'Cloth',
        engineType: 'Eco',
        spoiler: false
    })

    useEffect(() => {
        document.title = title
    }, [title])

    useEffect(() => {
        const loadCar = async () => {
            try {
                setLoading(true)
                const car = await getCarById(id)
                setFormData({
                    name: car.name,
                    exteriorColor: car.exterior_color,
                    wheelType: car.wheel_type,
                    interiorTrim: car.interior_trim,
                    engineType: car.engine_type,
                    spoiler: car.spoiler
                })
            } catch (error) {
                setErrorMessage(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadCar()
    }, [id])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage('')

        const impossibleReason = getImpossibleCombinationReason(formData)
        if (impossibleReason) {
            setErrorMessage(impossibleReason)
            return
        }

        try {
            setLoading(true)
            await updateCar(id, formData)
            navigate(`/customcars/${id}`)
        } catch (error) {
            setErrorMessage(error.message)
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <CarForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            submitLabel='Update Build'
            loading={loading}
            errorMessage={errorMessage}
            title='Edit Custom Car'
        />
    )
}

export default EditCar