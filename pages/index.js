import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  let router = useRouter();
  // console.log(locale);
  return (
    <div className={styles.container}>
      <h1>Hi tijari</h1>
    </div>
  );
}
