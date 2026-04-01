import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CarForm from '../components/CarForm'
import { createCar } from '../services/CarsAPI'
import { getImpossibleCombinationReason } from '../utilities/carValidation'
import '../css/Pages.css'
import '../App.css'

const CreateCar = ({ title }) => {
    const navigate = useNavigate()
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
            const savedCar = await createCar(formData)
            navigate(`/customcars/${savedCar.id}`)
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
            submitLabel='Save Build'
            loading={loading}
            errorMessage={errorMessage}
            title='Create Your Custom Car'
        />
    )
}

export default CreateCar