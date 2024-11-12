import Head from 'next/head';
import { cn } from '@/utils';
import { useState } from 'react';
import { LoginResponse } from './types';

import styles from '../styles/home.module.scss';

export default function Home() {
  const [apiKey, setApiKey] = useState<string>();
  const [userData, setUserData] = useState<LoginResponse>();

  const login = () => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/login?apiKey=${apiKey}`);
      setUserData(await res.json());
    };
    fetchData();
  };

  return (
    <>
      <Head>
        <title>Getflix Quick</title>
        <meta name="description" content="Open source Getflix " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.appView}>
        <input type="text" onChange={e => setApiKey(e.target.value)} />

        <div className={styles.buttonContainer}>
          <button className={cn([styles.buttonStyled, styles.secondary])} onClick={login}>
            <span className={styles.buttonContent}>Sign Up</span>
          </button>

          <button className={styles.buttonStyled} onClick={login}>
            <span className={styles.buttonContent}>Log in</span>
          </button>
        </div>

        {userData && (
          <>
            <p>Name: {userData?.full_name}</p>
            <p>Email: {userData?.email}</p>
            <p>IP Address: {userData?.client_ip}</p>
            {userData?.dns_status ? (
              <p>Your current IP is registered</p>
            ) : (
              <p>Please check your router configuration</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
