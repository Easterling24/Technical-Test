export interface Appartment {
  id: number
  title: string
  description: string
  price: number
  openEdit: boolean
  image: string
}

export type AppartmentContextType = {
  appartments: Appartment[]
  openEdit:boolean,
  addApartment: (newAppartment: Appartment) => void
  removeAppartment: (appartmentToRemove: Appartment) => void
  editAppartment: (appartmentToEdit: Appartment) => void
  sumbitNewData: (appartmentData: Appartment) => void
  setOpenEdit:(boolean) => void
  selectedAppartment: Appartment[]
}
