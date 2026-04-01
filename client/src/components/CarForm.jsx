import React from 'react'
import {
  ENGINE_LABEL,
  ENGINE_OPTIONS,
  EXTERIOR_OPTIONS,
  EXTERIOR_SWATCH,
  INTERIOR_OPTIONS,
  WHEEL_ICON,
  WHEEL_OPTIONS
} from '../utilities/carConfig'
import { calculateTotalPrice, toCurrency } from '../utilities/calcPrice'

const CarForm = ({
  formData,
  setFormData,
  onSubmit,
  submitLabel,
  loading,
  errorMessage,
  title
}) => {
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const total = calculateTotalPrice(formData)

  return (
    <main className='page-wrap'>
      <article className='builder-panel'>
        <header>
          <h2>{title}</h2>
          <p>Choose options and watch the build update instantly.</p>
        </header>

        {errorMessage ? <p className='error-text'>{errorMessage}</p> : null}

        <form onSubmit={onSubmit}>
          <label htmlFor='name'>Build Name</label>
          <input
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Ex: Sunset Rocket'
            required
          />

          <label htmlFor='exteriorColor'>Exterior Color</label>
          <select id='exteriorColor' name='exteriorColor' value={formData.exteriorColor} onChange={handleChange}>
            {EXTERIOR_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <label htmlFor='wheelType'>Wheel Type</label>
          <select id='wheelType' name='wheelType' value={formData.wheelType} onChange={handleChange}>
            {WHEEL_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <label htmlFor='interiorTrim'>Interior Trim</label>
          <select id='interiorTrim' name='interiorTrim' value={formData.interiorTrim} onChange={handleChange}>
            {INTERIOR_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <label htmlFor='engineType'>Engine Type</label>
          <select id='engineType' name='engineType' value={formData.engineType} onChange={handleChange}>
            {ENGINE_OPTIONS.map((option) => (
              <option key={option} value={option}>{ENGINE_LABEL[option]}</option>
            ))}
          </select>

          <label htmlFor='spoiler'>
            <input
              id='spoiler'
              type='checkbox'
              name='spoiler'
              checked={formData.spoiler}
              onChange={handleChange}
            />
            Add spoiler package
          </label>

          <p><strong>Estimated Total: {toCurrency(total)}</strong></p>

          <button type='submit' aria-busy={loading}>{submitLabel}</button>
        </form>
      </article>

      <article className='preview-panel'>
        <header>
          <h3>Live Preview</h3>
        </header>
        <div className='car-preview' style={{ backgroundColor: EXTERIOR_SWATCH[formData.exteriorColor] }}>
          <p className='car-emoji'>🚗</p>
          <p>{WHEEL_ICON[formData.wheelType]}</p>
          <p>{formData.spoiler ? 'Spoiler: Yes' : 'Spoiler: No'}</p>
        </div>

        <p><strong>{formData.name || 'Unnamed Build'}</strong></p>
        <p>Engine: {ENGINE_LABEL[formData.engineType]}</p>
        <p>Interior: {formData.interiorTrim}</p>
      </article>
    </main>
  )
}

export default CarForm
