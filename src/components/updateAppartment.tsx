import { Appartment, AppartmentContextType } from '../@types/appartment'
import { AppartmentContext } from '../context/appartmentsList'
import { useContext } from 'react'

export default function UdpateAppartment() {
  const { appartments } = useContext(AppartmentContext) as AppartmentContextType

  console.log(appartments.map(elt => elt.open))










  // console.log(toggleUpdateApt)

  return (
    <aside
      id="sidebar"
      // className={
      //   !toggleUpdateApt === true
      //     ? 'flex translate-x-full z-40  transition duration-300 ease-in-out fixed right-0 top-0 h-screen bg-slate-700 p-10'
      //     : 'flex translate-x-0 transition z-40  duration-300 ease-in-out fixed right-0 top-0 h-screen bg-slate-700 p-10'
      // }
    >
      <h1 className="text-white text-4xl text-center">
        Ajouter un nouvel appartment
      </h1>
    </aside>
  )
}
