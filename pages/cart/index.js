import React,{useState,useEffect} from 'react'
import ShoppingCart from '../../component/ShoppingCart'
import { useSelector, useDispatch } from 'react-redux'

import { useRouter,withRouter } from 'next/router';
import { updateQuantity,removeFromCart } from '../../slice/productSlice';





function cart() {
 
 const product=useSelector((state)=>state.product.productData)
  let router=useRouter();
  let [filterData,setFilterData]=useState([]);
  let dispatch=useDispatch()
  
  console.log('product')
  console.log(product)
  useEffect(()=>{
     
      console.log('-------------')
    let new_arr=product.filter(result=>result.id==router?.query?.id)
    
    setFilterData(new_arr)
     
  },[router.query.id]) 


  const updateCartHandler = async (item, quantity) => {
    
    
   // const { data } = await axios.get(`/api/products/${item._id}`);
    // if (data.countInStock < quantity) {
    //   window.alert('Sorry. Product is out of stock');
    //   return;
    // }
    dispatch(updateQuantity({item,quantity}))
   // dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
   let state= dispatch(removeFromCart(item))
   console.log('update State')
   console.log(state)
   console.log("-0----------0")
   //setFilterData(state) 
    // dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };    


console.log('filterData')
 console.log(filterData)|
console.log('-------------------')

  
  return (
    <ShoppingCart productCartData={filterData} updateCartHandler={updateCartHandler} removeItemHandler={removeItemHandler} ></ShoppingCart>
  )
}

export default withRouter(cart)