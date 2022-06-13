import { createAsyncThunk,createSlice,current } from "@reduxjs/toolkit";
import localStorage from "localStorage";
import { useSelector, useDispatch } from "react-redux";
import instance from "../helper/axios/httpRequest";
import { url, setHeaders } from "../helper/axios/config";
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
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
  cartTotalQuantity: 1,
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

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      console.log(action.payload)
      console.log(state.cart.cartItems)
      const existingIndex = state.cart.cartItems.findIndex(
        item => item.productId === action.payload.productId
      );

      if (existingIndex >= 0) {

        state.cart.cartItems[existingIndex] = {
          ...state.cart.cartItems[existingIndex],
          cartQuantity: state.cart.cartItems[existingIndex].cartQuantity + 1,
        };
        


      } else {
        let skus;
       
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        console.log(tempProductItem)
        instance.get(`${url}/ecommerce/carts`).then(result=>{
                console.log(result)
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
              qty: tempProductItem.cartQuantity
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
      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    },
    decreaseBasket: (state, action) => {
      const itemIndex = state.cart.cartItems.findIndex(
        item => item.productId === action.payload.productId
      );

      if (state.cart.cartItems[itemIndex].cartQuantity > 1) {
        state.cart.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cart.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cart.cartItems.filter(
          item => item.productId !== action.payload.productId
        );

        state.cart.cartItems = nextCartItems;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    },
    removeFromBasket: (state, action) => {
      state.cart.cartItems.map(cartItem => {
        if (cartItem.productId === action.payload.productId) {
          const nextCartItems = state.cart.cartItems.filter(
            item => item.productId !== cartItem.productId
          );

          state.cart.cartItems = nextCartItems;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = state.cart.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

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
    }

  },
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
