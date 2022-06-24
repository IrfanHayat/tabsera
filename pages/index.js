import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Layout from "../container/Layout";
import Product from "../pages/product";
import NavBar from "../container/Navbar/NavBar";
import { Box } from "@mui/system";

export default function Home(children) {
  let router = useRouter();
 
  return (
    //<div className={styles.container}>
    //<Layout>
    <Box>
      <Product></Product>
    </Box>
    //</Layout>
    //</div>
  );
}
