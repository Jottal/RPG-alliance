import type { NextPage } from "next";
import { Button } from "@mantine/core";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";

const Login: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session && status === "authenticated") {
    router.push("/");
  }

  return (
    <LoginStyle>
      <Image
        src="https://media.discordapp.net/attachments/558408423943700512/1029505167604854845/Taverna-Cerveja.png?width=920&height=920"
        alt="logo taverna central"
        width={220}
        height={220}
      />
      <Button
        mt="sm"
        size="lg"
        onClick={() =>
          signIn("discord", {
            callbackUrl: `${window.location.origin}/`,
          })
        }
      >
        Entrar com Discord
      </Button>
    </LoginStyle>
  );
};

const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1e1e1e;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;

  img {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }
`;

export default Login;
