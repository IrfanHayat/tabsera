import React, { useState, useEffect } from "react";
import PlaceOrder from "../../container/PlaceOrder";
import { useRouter,withRouter } from 'next/router';

import useStyles from "../../utils/styles";

//import { clearBasket } from "../../slice/basketSlice";
//import Cookies from 'js-cookie';
import { useSelector, useDispatch } from "react-redux";
import localStorage from "localStorage";
import {
  getTotals
  } from "../../slice/basketSlice";

function placeorder() {
  let [groupProductData, setGroupedProductData] = useState();
  const { userData } = useSelector(
    state => state.shipments
  );
 
  const classes = useStyles();
  const router = useRouter();
  const  dispatch  = useDispatch();
  const {
    cart: { cartItems },
  } = useSelector(state => state.basket);
  
  
  useEffect(() => {
    //dispatch(getCartItems())

   
    // dispatch(getCartItems())
    var groupedCategory = groupArrayOfObjects(cartItems);
    setGroupedProductData(groupedCategory);
  }, [cartItems]);

  function groupArrayOfObjects(list) {
    const grouped = _.groupBy(list, (items) => items.merchant_id);
    return grouped;
  }


  useEffect(()=>{
    dispatch(getTotals())
   
  },[])

 

  // useEffect(() => {
  //   if (!paymentMethod) {
  //     router.push("/payment");
  //   }
  //   if (cartItems.length === 0) {
  //     router.push("/cart");
  //   }
  // }, []);
  // const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  // const placeOrderHandler = async () => {
  //   // closeSnackbar();
  //   try {
  //     setLoading(true);
  //     //   const { data } = await axios.post(
  //     //     '/api/orders',
  //     //     {
  //     //       orderItems: cartItems,
  //     //       shippingAddress,
  //     //       paymentMethod,
  //     //       itemsPrice,
  //     //       shippingPrice,
  //     //       taxPrice,
  //     //       totalPrice,
  //     //     },
  //     //     {
  //     //       headers: {
  //     //         authorization: `Bearer ${userInfo.token}`,
  //     //       },
  //     //     }
  //     //   );
  //     dispatch(clearBasket());
  //     //Cookies.remove('cartItems');
  //     localStorage.removeItem("cartItems");
  //     setLoading(false);
  //     //  router.push(`/order/${data._id}`);
  //   } catch (err) {
  //     setLoading(false);
  //     //enqueueSnackbar(getError(err), { variant: 'error' });
  //   }
  // };
  return (
    <>
    
      
     
    
        <PlaceOrder
        // shippingAddress={shippingAddress}
        // shippingPrice={shippingPrice}
        // taxPrice={taxPrice}
        // totalPrice={totalPrice}
       // placeOrderHandler={placeOrderHandler}
       // loading={loading} 
        classes={classes}
        //paymentMethod={paymentMethod}
        cartItems={cartItems}
        userData={userData}
        productPrice={cartItems}
        productCartData={groupProductData}
        shippementData={router.query}
        //itemsPrice={itemsPrice}
      ></PlaceOrder>
     
  </>
  );
}

export default withRouter(placeorder);
