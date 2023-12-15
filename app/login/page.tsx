"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import styles from "./loginPage.module.css";

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession()

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className='w-full bg-green'>
        <div className={styles.socialButton} onClick={() => signIn("google")} >
          Sign in with Spotify
        </div>
        <div className={styles.socialButton} onClick={() => signIn("github")}>
          Sign in with Github
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
