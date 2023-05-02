import { RootState } from '@/app/store'
import { CaseReducer, PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state: any, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem: any) => basketItem.id === action.payload.id
      )

      let newBasketList = [...state.items]

      if (index >= 0) {
        newBasketList.splice(index, 1)
      } else {
        console.warn('Product does not exist in basket list')
      }

      state.items = newBasketList
    },
  },
})

export const { addToBasket, removeFromBasket } = basketSlice.actions

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: RootState) => state.basket.items

export default basketSlice.reducer
