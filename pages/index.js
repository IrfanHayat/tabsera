import Product from "../pages/product";
import Box from "@mui/system/Box";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
export default function Home(children) {
  return (
    //<div className={styles.container}>
    //<Layout>
    <Box>
      <Head>
        {/* <title>Next App</title> */}
        <link rel="icon" href="/favicon.png" />
      </Head>

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
