import { createAsyncThunk,createSlice,current } from "@reduxjs/toolkit";
import localStorage from "localStorage";
import { useSelector, useDispatch } from "react-redux";
import instance from "../helper/axios/httpRequest";
import { url, setHeaders } from "../helper/axios/config";
const initialState = {
  cart: {
    cartItems: [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : { location: {} },
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
  },
  // userIfo:localStorage.getItem("userInfo")
  // ? JSON.parse(localStorage.getItem("userInfo"))
  // : [],
  cartTotalQuantity: 0,
  cartTotalAmount:0,
  products: null,
  filteredProducts: null,
};


export const getProductWithId = createAsyncThunk(
  "cart/getProductWithId",
  async (id) => {
    const result = await instance.get(`${url}/ecommerce/products/${id}`);
    console.log(result)
    return result.data.response;;
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async () => {
    const result = await instance.post(`${url}/ecommerce/carts`);
    console.log(result.data.response.items)
    return result.data.response.items;;
  }
);

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      console.log(action.payload)
      console.log(state.cart.cartItems)
      const existingIndex = state.cart.cartItems.findIndex(
        item => item.cart_item_id === action.payload.cart_item_id
      );

      if (existingIndex >= 0) {
        console.log("existing Index")
        console.log(existingIndex)
        console.log('----------------------')
        state.cart.cartItems[existingIndex] = {
          ...state.cart.cartItems[existingIndex],
          qty: state.cart.cartItems[existingIndex].qty + 1,
        };
        console.log(state.cart.cartItems[existingIndex].cart_item_id)

        instance.put(`${url}/ecommerce/carts/items/${state.cart.cartItems[existingIndex].cart_item_id}`,state.cart.cartItems[existingIndex]).then(result=>{
          console.log(result)
     })
         

      } else {
        let skus;
       
        let tempProductItem = { ...action.payload, qty: 1 };
        console.log(tempProductItem)
        instance.post(`${url}/ecommerce/carts`).then(result=>{
                console.log(result.data.response)
        })
        instance.get(`${url}/ecommerce/products/${tempProductItem.productId}`).then(result=>{
          skus=result.data.response.skus
            console.log(skus)     
          if(skus.length>0){
            let skus_value;
            skus.map(result=>{
              skus_value=result.sku;
            })
           
            let cart = {
              cart_id:611,
              sku:  skus_value,
              // price: cost,
              qty: tempProductItem.qty
          };
          console.log(cart)
          instance.post(`${url}/ecommerce/carts/items`,cart).then(result=>{
               console.log(result)
          })
          }

        });
      
        // const result = await instance.get(`${url}/ecommerce/products/${temp}`);
       // console.log(result)
       
        state.cart.cartItems.push(tempProductItem);
      }
     // localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    },
    decreaseBasket: (state, action) => {
      const itemIndex = state.cart.cartItems.findIndex(
        item => item.cart_item_id === action.payload.cart_item_id
      );

      if (state.cart.cartItems[itemIndex].qty > 1) {
        state.cart.cartItems[itemIndex].qty -= 1;
                  
        instance.put(`${url}/ecommerce/carts/items/${state.cart.cartItems[itemIndex].cart_item_id}`,state.cart.cartItems[itemIndex]).then(result=>{
          console.log(result)
     })
      } else if (state.cart.cartItems[itemIndex].qty === 1) {
        const nextCartItems = state.cart.cartItems.filter(
          item => item.cart_item_id !== action.payload.cart_item_id
        );
       
        instance.put(`${url}/ecommerce/carts/items/${state.cart.cartItems[itemIndex].cart_item_id}`,nextCartItems).then(result=>{
          console.log(result)
     })
        state.cart.cartItems = nextCartItems;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
       state.cart.cartItems
  
    },
    removeFromBasket: (state, action) => {
      state.cart.cartItems.map(cartItem => {
        if (cartItem.cart_item_id === action.payload.cart_item_id) {
          // const itemIndex = state.cart.cartItems.findIndex(
          //   item => item.cart_item_id === action.payload.cart_item_id
          // );
          const nextCartItems = state.cart.cartItems.filter(
            item => item.cart_item_id !== cartItem.cart_item_id
          );

          state.cart.cartItems = nextCartItems;
          // console.log(itemIndex)
          console.log(state.cart.cartItems)
          instance.delete(`${url}/ecommerce/carts/items/${cartItem.cart_item_id}`,state.cart.cartItems).then(result=>{
            console.log(result)
       })
        }
        
        localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      console.log("I am here")
      console.log(current(state.cart.cartItems))
      let { total, quantity } = state.cart.cartItems.reduce(
        (cartTotal, cartItem) => {
          console.log("cartItem")
          console.log(cartItem)
          console.log("-------------------")
          const { price, qty } = cartItem;
          const itemTotal = price * qty;

          cartTotal.total += itemTotal;
          cartTotal.quantity += qty;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    clearBasket(state, action) {
      state.cart.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
    saveShippingAdress(state, action) {
      state=current(state);
      state={
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
      console.log(state)
    },
    saveShippingMap(state,action){
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            location: action.payload,
          },
        },
      };
    },
    savePayment(state,action){
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    },
    userLogin(state,action){
      return { ...state, userInfo: action.payload };
    },
    userLogout(state,action){
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };
    },
  

  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state, action) => {
      
      return { ...state, loading: true };
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      
      state.cart.cartItems = action.payload;
      state.loading = false;
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });


  }
});

export const {
  addToBasket,
  removeFromBasket,
  decreaseBasket,
  clearBasket,
  getTotals,
  saveShippingAdress,
  saveShippingMap,
  userLogin,
  userLogout,
  savePayment
  
} = basketSlice.actions;

export default basketSlice.reducer;
