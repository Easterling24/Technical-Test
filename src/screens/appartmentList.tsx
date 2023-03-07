import { useContext, useState } from 'react'
import AppartmentCard from '../components/AppartmentCard'
import FormPattern from '../components/FormPattern'
import UdpateAppartment from '../components/updateAppartment'
import { AppartmentContextType } from '../@types/appartment'
import { AppartmentContext } from '../context/appartmentsList'

export default function AppartmentList() {
  const { appartments } = useContext(AppartmentContext) as AppartmentContextType
  const [toggleForm, setToggleFrom] = useState(false)




  const handleForm = () => {
    if (!toggleForm) {
      setToggleFrom(true)
    } else {
      setToggleFrom(false)
    }
  }

  return (
    <div className="container my-10 mx-auto">
      <h1 className="mb-10 text-white text-center text-4xl">
        Ma liste d'appartments
      </h1>
      <button
        onClick={handleForm}
        type="button"
        className={
          toggleForm
            ? 'opacity-0 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-6 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
            : 'opacity-100 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-6 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
        }
      >
        Ouvrir le formulaire d'ajout
      </button>

      <UdpateAppartment />

      <aside
        className={
          !toggleForm
            ? ' flex translate-x-full z-40 transition duration-300 ease-in-out fixed right-0 top-0 h-screen bg-slate-700 p-10'
            : 'flex translate-x-0 transition z-40 duration-300 ease-in-out fixed right-0 top-0 h-screen bg-slate-700 p-10'
        }
      >
        <div className="flex relative flex-col justify-start">
          {' '}
          <h1 className="text-white text-4xl text-center">
            Ajouter un nouvel appartment
          </h1>
          <button onClick={handleForm} className="absolute bottom-5 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-14 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <FormPattern />
        </div>
      </aside>

      {appartments && appartments.length ? (
        <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-14">
          {appartments.map((elt) => {
            return (
              <AppartmentCard
                id={elt.id}
                key={elt.id}
                title={elt.title}
                description={elt.description}
                price={elt.price}
                open={elt.open}
                image={elt.image}
              />
            )
          })}
        </div>
      ) : (
        <div>Ouups nothing here</div>
      )}
    </div>
  )
}
