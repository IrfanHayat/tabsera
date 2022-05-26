import React,{useEffect} from 'react'
import Details from '../../component/Detail'
import { useRouter } from 'next/router';
function product_detail(props) {
  const router = useRouter();  
  
  useEffect(() => {
    console.log(router);
}, [router]);
  return (
    <div><Details></Details></div>
  )
}

export default product_detail