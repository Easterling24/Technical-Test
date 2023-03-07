import axios from 'axios'
import { createContext, ReactElement, useEffect, useState } from 'react'

import { Appartment, AppartmentContextType } from '../@types/appartment'

export const AppartmentContext = createContext<AppartmentContextType | null>(
  null,
)

type ChildrenType = { children?: ReactElement | ReactElement[] }

const getTheLocalStroage = () => {
  return localStorage.getItem('apps')
    ? JSON.parse(localStorage.getItem('apps') as string)
    : []
}

export const AppartmentListProvider = ({
  children,
}: ChildrenType): ReactElement => {
  const [appartments, setAppartments] = useState<Appartment[]>([])
  const [openItem, setOpenItem] = useState<Appartment | null>(null)

  // Fetching Local Json Data
  useEffect(() => {
    const fetchApts = async () => {
      const res = await axios.get('data/flats.json')

      setAppartments(res.data)
    }
    fetchApts()
  }, [])

  const addApartment = (appartment: Appartment) => {
    const newData: Appartment = {
      id: appartments.length + 1,
      title: appartment.title,
      description: appartment.description,
      price: appartment.price,
      open: false,
      image: 'assets/interior.jpg',
    }
    setAppartments([...appartments, newData])
  }

  const removeAppartment = (id: number) => {
    const filteredArray = appartments.filter((item) => item.id !== id)
    setAppartments([...filteredArray])
  }



  const openAppartment = (id: number) => {

    const aptExists = appartments.find((elem:Appartment) =>{
      return elem.id === id
    })
    setOpenItem(aptExists)

    console.log(openItem)

    



    // const newList =  appartments.map((item: Appartment) => (item.id === id) ? {...item, open: !item.open} : item)

    // setAppartments(newList)

  }

  return (
    <AppartmentContext.Provider
      value={{ appartments, addApartment, removeAppartment, openAppartment }}
    >
      {children}
    </AppartmentContext.Provider>
  )
}

export default AppartmentListProvider
