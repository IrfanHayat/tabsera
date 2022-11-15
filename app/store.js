import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slice/basketSlice";
import productReducer from "../slice/productSlice";
import authReducer from "../slice/authSlice";
import categoryReducer from "../slice/categorySlice";
import paymentReducer from "../slice/paymentSlice";
import { productsApi } from "../RTK/productApi";
import dealsReducer from "../slice/dealsPromotionsSlice";
import shipmentsReducer from "../slice/shipmentSlice";
import merchantReducer from "../slice/merchantSlice";
import placeOrderReducer from "../slice/placeOrderSlice";
import mrechantStoreReducer from "../slice/merchantStoreSlice";
import reviewsReducer from "../slice/reviewsSlice";
import lockerReducer from "../slice/lockerSlice";
import discountsReducer from "../slice/discountsSlice";
import freeShippingReducer from "../slice/freeShippingSlice";
import couponsReducer from "../slice/couponsSlice";
import campaignsReducer from "../slice/campaignsSlice";
import profileReducer from "../slice/profileSlice"

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    product: productReducer,
    auth: authReducer,
    category: categoryReducer,
    merchant: merchantReducer,
    shipments: shipmentsReducer,
    placeorder: placeOrderReducer,
    payment: paymentReducer,
    deals: dealsReducer,
    reviews: reviewsReducer,
    merchantStore: mrechantStoreReducer,
    lockers: lockerReducer,
    discounts: discountsReducer,
    freeShipping: freeShippingReducer,
    coupons: couponsReducer,
    campaigns: campaignsReducer,
    profile: profileReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
