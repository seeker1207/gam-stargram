import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Layout from '../component/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>GamStargram</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <div> 레이아웃 테스트! </div>
        <div> 레이아웃 테스트! </div>
        <div> 레이아웃 테스트! </div><div> 레이아웃 테스트! </div>
        <div> 레이아웃 테스트! </div>
        <div> 레이아웃 테스트! </div>
        <div> 레이아웃 테스트! </div>
      </Layout>
    </>
  );
}
