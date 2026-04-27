import * as React from "react";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Orders", href: "/orders" },
  { label: "Branding", href: "/branding" },
];

const Root = styled("header")(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1100,
  width: "100%",
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

const Inner = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  minHeight: theme.spacing(8),
  padding: theme.spacing(1.5, 3),
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    minHeight: "auto",
    padding: theme.spacing(1.5, 2),
  },
}));

const Left = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  minWidth: 0,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "space-between",
  },
}));

const Brand = styled("p")(({ theme }) => ({
  ...theme.typography.subtitle2,
  margin: 0,
  color: theme.palette.text.primary,
  whiteSpace: "nowrap",
}));

const Nav = styled("nav")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  textDecoration: "none",
  padding: theme.spacing(0.75, 1.5),
  borderRadius: theme.spacing(1),
  transition: "background-color 150ms ease, color 150ms ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}));

const ActiveNavLink = styled(NavLink)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.common.white,
  },
}));

const Right = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    justifyContent: "flex-end",
  },
}));

export default function AuthenticatedNavbar() {
  const router = useRouter();

  return (
    <Root>
      <Inner>
        <Left>
          <Brand>Reseller Hub</Brand>
          <Nav aria-label="Primary">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              const LinkComponent = isActive ? ActiveNavLink : NavLink;

              return (
                <LinkComponent key={item.href} href={item.href}>
                  {item.label}
                </LinkComponent>
              );
            })}
          </Nav>
        </Left>

        <Right>
          <IconButton aria-label="Help" size="small">
            <HelpOutlineRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Settings" size="small">
            <SettingsRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton aria-label="Profile" size="small">
            <PersonOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Right>
      </Inner>
    </Root>
  );
}
