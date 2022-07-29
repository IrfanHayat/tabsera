import Product from "../pages/product";
import Box from "@mui/system/Box";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
export default function Home(children) {
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

export async function getServerSideProps() {
  return {
    props: {
      hello: "world",
    },
  };
}
