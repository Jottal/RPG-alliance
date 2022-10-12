import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return <></>;
};

export default Home;
