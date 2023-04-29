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
    removeFromBasket: (state, action) => {},
  },
})

export const { addToBasket, removeFromBasket } = basketSlice.actions

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: RootState) => state.basket.items

export default basketSlice.reducer
