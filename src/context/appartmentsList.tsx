import axios from 'axios'
import { createContext, ReactElement, useEffect, useState } from 'react'

import { Appartment, AppartmentContextType } from '../@types/appartment'

export const AppartmentContext = createContext<AppartmentContextType | null>(
  null,
)

type ChildrenType = { children?: ReactElement | ReactElement[] }

const getTheLocalStroage = () => {
  return localStorage.getItem('apts')
    ? JSON.parse(localStorage.getItem('apts') as string)
    : []
}

export const AppartmentListProvider = ({
  children,
}: ChildrenType): ReactElement => {
  const [appartments, setAppartments] = useState<Appartment[]>(
    getTheLocalStroage()
  )
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

  const removeAppartment = (appartmentToRemove: Appartment) => {
    const filteredArray = appartments.filter(
      (item: Appartment) => item.id !== appartmentToRemove.id,
    )
    setAppartments([...filteredArray])

  }

  useEffect(() => {
    localStorage.setItem('apts', JSON.stringify(appartments))
  }, [appartments])

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
