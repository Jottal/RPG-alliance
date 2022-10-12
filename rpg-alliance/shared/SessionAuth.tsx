import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AppShell } from "@mantine/core";
import CustomNavBar from "./layout/CustomNavBar";
import styled from "styled-components";
import { theme } from "../styles/theme";

interface Props {
  children: React.ReactNode;
}

const SessionAuth = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      !session &&
      status === "unauthenticated" &&
      router.pathname !== "/login"
    ) {
      router.push("/login");
    }
  }, [router, session, status]);

  return (
    <>
      <AppShell
        fixed={false}
        navbar={
          session && status === "authenticated" ? <CustomNavBar /> : undefined
        }
        style={{
          backgroundColor: theme.colors.general.black,
          padding: 0,
          height: "100vh",
        }}
      >
        <Container>{children}</Container>
      </AppShell>
    </>
  );
};

const Container = styled.div`
  position: relative;
  height: "100%";
  overflow-y: "scroll";
`;

export default SessionAuth;
