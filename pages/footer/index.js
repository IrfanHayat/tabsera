
import { useRouter } from "next/router";
import Footer from '../../container/Footer';

export default function FooterClass(children) {
  let router = useRouter();
  // console.log(locale);
  return (
    //<div className={styles.container}>
      //<Layout> 
        <>
        
        <Footer/>
        </>        
        //</Layout>
    //</div>
  );
}
