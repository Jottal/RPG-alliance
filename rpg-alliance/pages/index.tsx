import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session && status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <>
      Signed in <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export default Home;
