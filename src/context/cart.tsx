import { useMemo, useReducer, createContext, ReactElement } from "react"


export type AppartmentCartType = {
  id: number
  title: string
  description: string
  price: number
}

type AppartmentCartStateType = { cart: AppartmentCartType[] }

const initialAppartmentCartState: AppartmentCartStateType = { cart: [] }

const REDUCER_ACTION_TYPE = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  UPDATE: 'UPDATE',
  SUBMIT: 'SUBMI',
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE
export type ReducerAction = {
  type: string
  payload?: AppartmentCartType
}

const reducer = (
  state: AppartmentCartStateType,
  action: ReducerAction,
): AppartmentCartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error('action.payload missing in ADD action')
      }

      const { id, title, description, price } = action.payload
      return {
        ...state,
        cart: [...state.cart, { id, title, description, price }],
      }
    }

    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!action.payload) {
        throw new Error('action.payload missing in ADD action')
      }

      const { id } = action.payload

      const filteredCart: AppartmentCartType[] = state.cart.filter(
        (item) => item.id !== id,
      )

      return { ...state, cart: [...filteredCart] }
    }

    // case REDUCER_ACTION_TYPE.UPDATE: {
    //   if (!action.payload) {
    //     throw new Error('action.payload missing in ADD action')
    //   }
    // }

    case REDUCER_ACTION_TYPE.SUBMIT: {
      if (!action.payload) {
        throw new Error('action.payload missing in ADD action')
      }

      return { ...state, cart: [] }
    }

    default:
      throw new Error('Unidentified reducer action type')
  }
}


const useCartContext = (initialAppartmentCartState : AppartmentCartStateType) => {
    const [state, dispatch] = useReducer(reducer, initialAppartmentCartState)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const cart = state.cart

    return {dispatch, cart, REDUCER_ACTIONS}
}  

export type UseCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE, 
    cart : []
}


export const CartContext  = createContext<UseCartContextType>(initCartContextState)

type ChildrenType = {children?: ReactElement | ReactElement[]}

export const CartProvider = ({children} :ChildrenType): 
ReactElement  => {
    return (<CartContext.Provider value={useCartContext(initialAppartmentCartState)}>
        {children}
    </CartContext.Provider>)

}