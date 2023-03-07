export interface Appartment {
    id: number | unedefined,
    title: string | undefined, 
    description: string | undefined,
    price: number | undefined,
    open: boolean | undefined,
    image: string | undefined

}

export type AppartmentContextType = {
    appartments: Appartment[];
    addApartment: (newAppartment: Appartment) => void
    removeAppartment: (id:number) => void
    openAppartment : (id:number) => void
    // updateAppartment: (id:number) => void

}

