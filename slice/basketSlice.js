import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import localStorage from "localStorage";
import { useSelector, useDispatch } from "react-redux";
import instance from "../helper/axios/httpRequest";
import { url, setHeaders } from "../helper/axios/config";
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? localStorage.getItem("cartItems")
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : { location: {} },
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
    cartId: localStorage.getItem("cartId")
      ? localStorage.getItem("cartId")
      : "",
    buyCartItems: localStorage.getItem("buyCartItems")
      ? localStorage.getItem("buyCartItems")
      : [],
  },

  // userIfo:localStorage.getItem("userInfo")
  // ? JSON.parse(localStorage.getItem("userInfo"))
  // : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  products: null,
  filteredProducts: null,
};

export const getProductWithId = createAsyncThunk(
  "cart/getProductWithId",
  async (id) => {
    const result = await instance.get(`${url}/ecommerce/products/${id}`);

    return result.data.response;
  }
);





export const addToCart = createAsyncThunk("cart/addCart", async (product,cart) => {
    let existingIndex = result.data.response.items.findIndex(
      (item) => item.cart_item_id === product.cart_item_id
    );
    if (existingIndex) {
      
      result.data.response.items[existingIndex] = {
        ...result.data.response.items[existingIndex],
        qty: result.data.response.items[existingIndex].qty + 1,
      };
      await instance.put(
        `${url}/ecommerce/carts/items/${result.data.response.items[existingIndex].cart_item_id}`,
        result.data.response.items[existingIndex]
      );
      return result.data.response;
    }
  else {
    let tempProductItem = { ...product, qty: 1 };

    let result2 = await instance.get(
      `${url}/ecommerce/products/${tempProductItem.product_id}`
    );

    if (tempProductItem.skus.length > 0) {
      let skus_value;
      tempProductItem.skus.map((result) => {
        skus_value = result.sku;
      });
      let result=  await instance
      .get(`${url}/ecommerce/products/${tempProductItem.product_id}`)
      let cart = {
        cart_id: result.data.response.cartId,
        sku: skus_value,
        qty: tempProductItem.qty,
      };
      await instance.post(`${url}/ecommerce/carts/items`, cart);
    } else {
      let skus = result2.data.response.skus;

      if (skus.length > 0) {
        let skus_value;
        skus.map((result) => {
          skus_value = result.sku;
        });
      let result=  await instance
            .get(`${url}/ecommerce/products/${tempProductItem.product_id}`)
        let cart = {
          cart_id: result.data.response.cartId,
          sku: skus_value,
          // price: cost,
          qty: tempProductItem.qty,
        };

        await instance.post(`${url}/ecommerce/carts/items`, cart);
      }
    }
    let result3 = await instance.post(`${url}/ecommerce/carts`);
    return result3.data.response.items;
  }
});

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  const result = await instance.post(`${url}/ecommerce/carts`);

  return result.data.response.items;
});

export const getTotalCartQuantity = createAsyncThunk(
  "cart/getTotalCartQunatity",
  async (cart) => {
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
  

    return quantity;
  }
);

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const existingIndex = state.cart.cartItems?.findIndex(
        (item) => item.cart_item_id === action.payload.cart_item_id
      );

      if (existingIndex >= 0) {
        state.cart.cartItems[existingIndex] = {
          ...state.cart.cartItems[existingIndex],
          qty: state.cart.cartItems[existingIndex].qty + 1,
        };

        instance
          .put(
            `${url}/ecommerce/carts/items/${state.cart.cartItems[existingIndex].cart_item_id}`,
            state.cart.cartItems[existingIndex]
          )
          .then((result) => {});
      } else {
        let skus;
        let tempProductItem = { ...action.payload, qty: 1 };
        let a;
        instance.post(`${url}/ecommerce/carts`).then((result1) => {
          instance
            .get(`${url}/ecommerce/products/${tempProductItem.product_id}`)
            .then((result) => {
              skus = result.data.response.skus;

              if (skus.length > 0) {
                let skus_value;
                skus.map((result) => {
                  skus_value = result.sku;
                });

                let cart_id = result1.data.response.cartId;

                localStorage.setItem("cartId", cart_id);

                let cart = {
                  cart_id: result1.data.response.cartId,
                  sku: skus_value,
                  // price: cost,
                  qty: tempProductItem.qty,
                };

                instance
                  .post(`${url}/ecommerce/carts/items`, cart)
                  .then((result) => {});

                instance.post(`${url}/ecommerce/carts`).then((result) => {
                 
                  localStorage.setItem(
                    "cartItems",
                    JSON.stringify(result.data.response.items)
                  );
                });
              }
            });
        });

        // const result = await instance.get(`${url}/ecommerce/products/${temp}`);
        //
        // const data=localStorage.getItem("cartItems1")
        // let resultCart=JSON.parse(data)
        
       // state.cart.cartItems.push(resultCart)
       
      }
      //
    },

    

    buyItem: (state, action) => {
      let skus;
      let tempProductItem = { ...action.payload, qty: 1 };
      let a;
      instance.post(`${url}/ecommerce/carts`).then((result1) => {
        instance
          .get(`${url}/ecommerce/products/${tempProductItem.product_id}`)
          .then((result) => {
            skus = result.data.response.skus;

            if (skus.length > 0) {
              let skus_value;
              skus.map((result) => {
                skus_value = result.sku;
              });
           
              // let cart = {
              //   cart_id: null,
              //   sku: skus_value,
              //   // price: cost,
              //   qty: tempProductItem.qty,
              // };

              // instance
              //   .post(`${url}/ecommerce/carts/items`, cart)
              //   .then((result) => {});
            }
          });
      });

      state.cart.buyCartItems;

      localStorage.setItem(
        "buyCartItems",
        JSON.stringify(state.cart.cartItems)
      );
    },

    // BuyItem: (state, action) => {
    //   let skus;
    //   let tempProductItem = { ...action.payload, qty: 1 };
    //   let a;
    //   instance.post(`${url}/ecommerce/carts`).then((result1) => {
    //     instance
    //       .get(`${url}/ecommerce/products/${tempProductItem.product_id}`)
    //       .then((result) => {
    //         skus = result.data.response.skus;

    //         if (skus.length > 0) {
    //           let skus_value;
    //           skus.map((result) => {
    //             skus_value = result.sku;
    //           });
    
    //           let cart = {
    //             cart_id: null,
    //             sku: skus_value,
    //             // price: cost,
    //             qty: tempProductItem.qty,
    //           };

    //           instance
    //             .post(`${url}/ecommerce/carts/items`, cart)
    //             .then((result) => {});
    //         }
    //       });
    //   });

    //   state.cart.cartItems;

    //   localStorage.setItem(
    //     "buyCartItems",
    //     JSON.stringify(state.cart.cartItems)
    //   );
    // },

    decreaseBasket: (state, action) => {
      const itemIndex = state.cart.cartItems.findIndex(
        (item) => item.cart_item_id === action.payload.cart_item_id
      );

      if (state.cart.cartItems[itemIndex].qty > 1) {
        state.cart.cartItems[itemIndex].qty -= 1;

        instance
          .put(
            `${url}/ecommerce/carts/items/${state.cart.cartItems[itemIndex].cart_item_id}`,
            state.cart.cartItems[itemIndex]
          )
          .then((result) => {});
      } else if (state.cart.cartItems[itemIndex].qty === 1) {
        const nextCartItems = state.cart.cartItems.filter(
          (item) => item.cart_item_id !== action.payload.cart_item_id
        );

        instance
          .put(
            `${url}/ecommerce/carts/items/${state.cart.cartItems[itemIndex].cart_item_id}`,
            nextCartItems
          )
          .then((result) => {});
        state.cart.cartItems = nextCartItems;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
      state.cart.cartItems;
    },
    removeFromBasket: (state, action) => {
      state.cart.cartItems.map((cartItem) => {
        if (cartItem.cart_item_id === action.payload.cart_item_id) {
          // const itemIndex = state.cart.cartItems.findIndex(
          //   item => item.cart_item_id === action.payload.cart_item_id
          // );
          const nextCartItems = state.cart.cartItems.filter(
            (item) => item.cart_item_id !== cartItem.cart_item_id
          );

          state.cart.cartItems = nextCartItems;

          instance
            .delete(
              `${url}/ecommerce/carts/items/${cartItem.cart_item_id}`,
              state.cart.cartItems
            )
            .then((result) => {});
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
        return state;
      });
    },
    getTotals(state, action) {
      let { total, quantity } = current(state.cart.cartItems).reduce(
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
      state.cart.cartTotalQuantity = quantity;
     
      state.cart.cartTotalAmount = total;
    },
    clearBasket(state, action) {
      state.cart.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
    saveShippingAdress(state, action) {
      state = current(state);
      state = {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    },
    saveShippingMap(state, action) {
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
    savePayment(state, action) {
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    },
    userLogin(state, action) {
      return { ...state, userInfo: action.payload };
    },
    userLogout(state, action) {
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
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
  },
});

export const {
  buyItem,
  addToBasket,
  removeFromBasket,
  decreaseBasket,
  clearBasket,
  getTotals,
  saveShippingAdress,
  saveShippingMap,
  userLogin,
  userLogout,
  savePayment,
} = basketSlice.actions;

export default basketSlice.reducer;
