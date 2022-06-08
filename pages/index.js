import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Layout from '../container/Layout';
import Product from '../pages/product';
import Footer from '../pages/footer';

export default function Home(children) {
  let router = useRouter();
  // console.log(locale);
  return (
    //<div className={styles.container}>
      //<Layout> 
        <>
        <Product></Product>
        <Footer/>
        </>        
        //</Layout>
    //</div>
  );
}
