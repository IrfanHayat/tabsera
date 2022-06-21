


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

export const addToCart = createAsyncThunk(
  "cart/addCart",
  async (product)=>{
   let result=await instance.post(`${url}/ecommerce/carts`)
    console.log(result.data.response.items)
    console.log(product)
    console.log("Hell")


     if(result.length>0 && result.data.response.items.length>0){
      let existingIndex=result.data.response.items.findIndex(
        item => item.cart_item_id === product.cart_item_id
      );
      if(existingIndex){
        result.data.response.items[existingIndex]={
          ...result.data.response.items[existingIndex],
          qty: result.data.response.items[existingIndex].qty + 1,
        };
        await instance.put(`${url}/ecommerce/carts/items/${result.data.response.items[existingIndex].cart_item_id}`,result.data.response.items[existingIndex])
        return result.data.response
      }
     
      
    }else{
      let tempProductItem = { ...product, qty: 1 };
      console.log(tempProductItem)
      let result2=await instance.get(`${url}/ecommerce/products/${tempProductItem.product_id}`)
    // console.log()
     if(tempProductItem.skus.length>0){
      let skus_value;
      tempProductItem.skus.map(result=>{
        skus_value=result.sku;
      })

      let cart={
        cart_id:611,
        sku:skus_value,
        qty: tempProductItem.qty
      }  
      await instance.post(`${url}/ecommerce/carts/items`,cart)

     }else{
      let skus = result2.data.response.skus
      console.log(skus)     
    if(skus.length>0){
      let skus_value;
      skus.map(result=>{
        skus_value=result.sku;
      })
     console.log(skus_value)
      let cart = {
        cart_id:611,
        sku:  skus_value,
        // price: cost,
        qty: tempProductItem.qty
    };
  
      
    console.log(cart)
   await instance.post(`${url}/ecommerce/carts/items`,cart)
     

     }  
      
  }
  let result3=await  instance.post(`${url}/ecommerce/carts`)
      return result3.data.response.items  
    }  
  }
)


export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async () => {
    const result = await instance.post(`${url}/ecommerce/carts`);
  
    return result.data.response.items;;
  }
);

export const getTotalCartQuantity= createAsyncThunk(
  "cart/getTotalCartQunatity",
  async ()=>{
    const result = await instance.post(`${url}/ecommerce/carts`);
    let { total, quantity } = result.data.response.items.reduce(
      (cartTotal, cartItem) => {
       
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
     console.log(quantity)
     return quantity;
  }
)

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
     
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
        instance.get(`${url}/ecommerce/products/${tempProductItem.product_id}`).then(result=>{
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

       instance.post(`${url}/ecommerce/carts`).then(result=>{
        console.log(result.data.response)
})
     state.cart.cartItems
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
      let { total, quantity } = current(state.cart.cartItems).reduce(
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
    builder.addCase(addToCart.pending, (state, action) => {
      
      return { ...state, loading: true };
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      console.log(action.payload)
      state.cart.cartItems = action.payload;
      state.loading = false;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(getTotalCartQuantity.pending, (state, action) => {
      
      return { ...state, loading: true };
    });
    builder.addCase(getTotalCartQuantity.fulfilled, (state, action) => {
    
      state.cart.cartTotalQuantity = action.payload;
      state.loading = false;
    });
    builder.addCase(getTotalCartQuantity.rejected, (state, action) => {
      
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
