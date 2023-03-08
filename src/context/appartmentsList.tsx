import axios from 'axios'
import { createContext, ReactElement, useEffect, useState } from 'react'
import { Appartment, AppartmentContextType } from '../@types/appartment'

export const AppartmentContext = createContext<AppartmentContextType | null>(
  null,
)

// Setting up children components where the context data could be shared
type ChildrenType = { children?: ReactElement | ReactElement[] }


// Getting the local storage data if any
const getTheLocalStroage = () => {
  return localStorage.getItem('apts')
    ? JSON.parse(localStorage.getItem('apts') as string)
    : []
}

export const AppartmentListProvider = ({children,}: ChildrenType): ReactElement => {

  // Defining the inital states
  const [appartments, setAppartments] = useState<Appartment[]>(getTheLocalStroage())
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [selectedAppartment, setSelectedAppartment] = useState<Appartment[]>([])

  // Fetching Local Json Data
  useEffect(() => {
    const fetchApts = async () => {
      const res = await axios.get('data/flats.json')

      localStorage.setItem('apts', JSON.stringify(res.data))
    }
    fetchApts()
  }, [appartments])

// Adding a new item
  const addApartment = (appartment: Appartment) => {
    const newData: Appartment = {
      id: appartments.length + 1,
      title: appartment.title,
      description: appartment.description,
      price: appartment.price,
      openEdit: false,
      image: 'assets/interior.jpg',
    }
    setAppartments([...appartments, newData])
  }

  // Removing item fro the list

  const removeAppartment = (appartmentToRemove: Appartment) => {
    const filteredArray = appartments.filter(
      (item: Appartment) => item.id !== appartmentToRemove.id,
    )
    setAppartments([...filteredArray])

  }

// Selecting item to edit

  const editAppartment = (appartmentToEdit: Appartment) => {
    appartments.find((item: Appartment) => {
      if (item.id === appartmentToEdit.id) {
        if (item.openEdit) {
          item.openEdit = false
          setOpenEdit(false)
          setSelectedAppartment([])
        } else {
          item.openEdit = true
          setOpenEdit(true)
          setSelectedAppartment([item])
        }
      } else {
        item.openEdit = false
      }
    })

    setAppartments(appartments)
  }
// Updating the needed item

  const sumbitNewData = (appartmentData: Appartment) => {
    console.log(appartmentData.id)

    const newList = appartments.map((item: Appartment) => {
      if (item.id === appartmentData.id) {
        const updatedItem = {
          ...item,
          title: appartmentData?.title,
          description: appartmentData?.description,
          price: appartmentData?.price,
        }

        setSelectedAppartment([updatedItem])
        return updatedItem
      }

      return item
    })

    setAppartments(newList)
  }

  // Passing in the values to be shared among components
  return (
    <AppartmentContext.Provider
      value={{
        appartments,
        addApartment,
        removeAppartment,
        editAppartment,
        sumbitNewData,
        selectedAppartment,
        openEdit,
        setOpenEdit,
      }}
    >
      {children}
    </AppartmentContext.Provider>
  )
}

export default AppartmentListProvider
