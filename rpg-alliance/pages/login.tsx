/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { Button } from "@mantine/core";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session && status === "authenticated") {
    router.push("/");
  }

  return (
    <div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmEy8Y4IWVk9vm6n2g-rD6sOhI75Q0QmR3jZn129NW8g&s"
        alt="logo taverna central"
      />
      <Button
        onClick={() =>
          signIn("discord", {
            callbackUrl: `${window.location.origin}/`,
          })
        }
      >
        Entrar com Discord
      </Button>
    </div>
  );
};

export default Login;
