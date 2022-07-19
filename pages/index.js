import Product from "../pages/product";
import  Box  from "@mui/system/Box";
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
