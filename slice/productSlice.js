import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import productData from '../data/product'

export const getProduct=createAsyncThunk("product/getProduct",async ({id})=>{
    return fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((json) => console.log(json));
})


const addProduct = createSlice({
     name:'product',
     initialState:{
      productData,
      loading:false,
      error:null
        },
        reducers:{
            updateQuantity: (state, action) => {
                
                // console.log(state.productData[0].rname)
                 console.log(action)
                
                 const index = state.productData.findIndex(basketItem => basketItem.id == action.payload.item.id)
                 console.log(index)
                if(index >= 0) {
                  if(action.payload.quantity > 0){
                      console.log('I am here')
                    state.productData[index].qnty = action.payload.quantity
                   
                  }else {
                    let newBasket = [...state.productData]
                    newBasket.splice(index, 1)
                    state.productData = newBasket
                  }

                }
                else console.warn(`Can't remove product ${action.payload.id} as its does not exist!`)
                return state
              },
            removeFromCart:(state,action)=>{
                console.log(current(state))
                
                // immutable
                //   copy 
                //   copy change 
                //   copy set new state
                const cartItems = current(state).productData.filter(
                    (item) => item.id !== action.payload.id
                  );
                  let state1={ productData: cartItems } 
                  console.log(state1.productData)
                 return state1.productData;
            },           
     extraReducers:{
         [getProduct.pending]:(state,action)=>{
             state.loading=true
         },
         [getProduct.fulfilled]:(state,action)=>{
            state.loading=false,
            state.product=[action.payload]
        },
        [getProduct.rejected]:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        
        }
     }   



})

export const {  updateQuantity, removeFromCart } = addProduct.actions;

export default addProduct.reducer
