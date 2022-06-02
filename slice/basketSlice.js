import { createSlice,current } from "@reduxjs/toolkit";
import localStorage from "localStorage";
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
  products: null,
  filteredProducts: null,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existingIndex = state.cart.cartItems.findIndex(
        item => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cart.cartItems[existingIndex] = {
          ...state.cart.cartItems[existingIndex],
          cartQuantity: state.cart.cartItems[existingIndex].cartQuantity + 1,
        };
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cart.cartItems.push(tempProductItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    },
    decreaseBasket: (state, action) => {
      const itemIndex = state.cart.cartItems.findIndex(
        item => item.id === action.payload.id
      );

      if (state.cart.cartItems[itemIndex].cartQuantity > 1) {
        state.cart.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cart.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cart.cartItems.filter(
          item => item.id !== action.payload.id
        );

        state.cart.cartItems = nextCartItems;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
    },
    removeFromBasket: (state, action) => {
      state.cart.cartItems.map(cartItem => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cart.cartItems.filter(
            item => item.id !== cartItem.id
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
