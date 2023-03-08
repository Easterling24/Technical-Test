import React, { useContext, useState } from 'react'
import { AppartmentContext } from '../context/appartmentsList'
import { AppartmentContextType, Appartment } from '../@types/appartment'

export default function FormPattern() {
  const { addApartment } = useContext(
    AppartmentContext,
  ) as AppartmentContextType

  const [formData, setFormData] = useState<Appartment | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handleSubmit = (e: React.FormEvent, formData: Appartment | any) => {
    e.preventDefault()

    if(formData){
      addApartment(formData)
    }


  }

  return (
    <div className="w-full max-w-xs mt-20">
      <form onSubmit={(e) => handleSubmit(e, formData)}>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            onChange={handleForm}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="title"
          >
            Description
          </label>
          <input
            onChange={handleForm}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            onChange={handleForm}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Done !
        </button>
      </form>
    </div>
  )
}
