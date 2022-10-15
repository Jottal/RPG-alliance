import { useState } from "react";
import { createStyles, Navbar, Group, Code } from "@mantine/core";
import {
  IconReceipt2,
  IconLogout,
  IconDashboard,
  IconBrandAppleArcade,
  IconCurrentLocation,
  IconUserCircle,
} from "@tabler/icons";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import { theme as themeGlobal } from "../../styles/theme";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor: themeGlobal.colors.general.yellow,
      border: 0,
    },

    version: {
      backgroundColor: themeGlobal.colors.general.lightYellow,
      color: themeGlobal.colors.general.lightBlack,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${themeGlobal.colors.general.lightBlack}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${themeGlobal.colors.general.lightBlack}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.black,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: themeGlobal.colors.general.lightYellow,
      },
    },

    linkIcon: {
      ref: icon,
      color: themeGlobal.colors.general.lightBlack,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: themeGlobal.colors.general.lightYellow,
        color: theme.black,
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  };
});

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 10px;
    font-size: 1.2rem;
    font-weight: 700;
    color: black;
  }
`;

const data = [
  { link: "/", label: "Dashboard", icon: IconDashboard },
  { link: "/mesas", label: "Mesas", icon: IconCurrentLocation },
  { link: "/rpgs", label: "RPGs", icon: IconBrandAppleArcade },
  { link: "/mestres", label: "Mestres", icon: IconUserCircle },
  { link: "/parceiros", label: "Parceiros", icon: IconReceipt2 },
];

const NavbarSimpleColored = () => {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [active, setActive] = useState(
    data.find((c) => c.link === router.pathname)?.label
  );
  const { data: session } = useSession();

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        router.push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <User>
            <Image
              src={session?.user?.image!}
              alt="Logo usuário"
              width={28}
              height={28}
              style={{ borderRadius: "50%" }}
            />
            <span>{session?.user?.name}</span>
          </User>
          {/* Colocar Role do usuario */}
          <Code className={classes.version}>Staff</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={() =>
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarSimpleColored;
