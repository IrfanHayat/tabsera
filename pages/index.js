import Product from "../pages/product";
import  Box  from "@mui/system/Box";
import { useSelector, useDispatch } from "react-redux";
export default function Home(children) {
  // console.log("env", process.env.PRIVATE_API_KEY);

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
  console.log(process.env.NEXT_PUBLIC_PRIVATE_API_KEY);
  return {
    props: {
      hello: "world",
    },
  };
}
