import { Appartment, AppartmentContextType } from '../@types/appartment'
import { AppartmentContext } from '../context/appartmentsList'
import { useContext, useState } from 'react'

export default function UdpateAppartment() {
   // Using Values from context state
  const { openEdit, setOpenEdit, selectedAppartment, sumbitNewData} = useContext(AppartmentContext) as AppartmentContextType

  let appartmentData

  if (selectedAppartment.length) {
    appartmentData = selectedAppartment[0]
  }

  const [formData, setFormData] = useState<Appartment | {}>()

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      id: appartmentData?.id,
      [e.currentTarget.id]: e.currentTarget.value,
    })

    console.log(formData)
  }

  const handleSubmit = (e: React.FormEvent, formData: Appartment | any) => {
    e.preventDefault()

    sumbitNewData(formData)
  }

  return (
    <aside
      id="sidebar"
      className={
        !openEdit
          ? 'flex flex-col items-baseline justify-start translate-x-full z-40  transition duration-300 ease-in-out fixed right-0 top-0 h-screen bg-neutral-50 p-10'
          : 'flex flex-col items-baseline  justify-start translate-x-0 transition z-40 duration-300 ease-in-out fixed right-0 top-0 h-screen bg-neutral-50 p-10'
      }
    >
      <div className="flex justify-between items-center w-full ">
        <h1 className="text-black text-2xl w-full text-center">
          Update appartment details
        </h1>
        <button onClick={() => setOpenEdit(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-14 h-14 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      <div className="relative box-border mr-8 mt-10 mb-2 rounded-xl flex flex-col justify-between items-baseline    ">
        <div className="h-80">
          <img
            className=" object-cover w-full h-full rounded-xl"
            src={appartmentData?.image}
            alt={appartmentData?.title}
          />
        </div>

        <div className="flex flex-col justify-start items-baseline">
          <h2 className="text-xl">{appartmentData?.title}</h2>
          <h3 className="text-xl">{appartmentData?.price}$/month</h3>
        </div>

        <div className="w-full mt-10 flex flex-col items-baseline justify-start ">
          <form className="pb-10" onSubmit={(e) => handleSubmit(e, formData)}>
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
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
                className="block text-black text-sm font-bold mb-2"
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
                className="block text-black text-sm font-bold mb-2"
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
              Sauvegarder
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
