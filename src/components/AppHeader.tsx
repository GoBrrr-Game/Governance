import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import { uiConfig } from "@/uiConfig";
import {
  Badge,
  Button,
  NoSsr,
  styled,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import ConnectModel from "./connectComponent/ConnectModel";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    top: "2px",
    right: "2px",
    borderRadius: "20px",
    width: "10px",
    height: "10px",
    backgroundColor: `${theme.palette.secondary.main}`,
    color: `${theme.palette.secondary.main}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export function AppHeader() {
  const [walletWidgetOpen, setWalletWidgetOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = ["Dashboard", "Markets", "Stake", "Governance"];
  const headerHeight = 48;

  const [account, setAccount] = useState<string | null>(null);

  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down("md"));
  const sm = useMediaQuery(breakpoints.down("sm"));
  const smd = useMediaQuery("(max-width:1120px)");

  const handleModalChange = (newValue: string) => {
    setAccount(newValue); // Update the parent state with the new value from the modal
  };

  return (
    <Box
      component="header"
      sx={(theme) => ({
        height: headerHeight,
        position: "sticky",
        top: 0,
        transition: theme.transitions.create("top"),
        zIndex: theme.zIndex.appBar,
        backgroundColor: "#2B2D3C",
        padding: {
          xs:
            mobileMenuOpen || walletWidgetOpen
              ? "8px 20px"
              : "8px 8px 8px 20px",
          xsm: "8px 20px",
        },
        display: "flex",
        alignItems: "center",
        flexDirection: "space-between",
        boxShadow: "inset 0px -1px 0px rgba(242, 243, 247, 0.16)",
      })}
    >
      <Box
        component={Link}
        href="/"
        aria-label="Go to homepage"
        sx={{
          lineHeight: 0,
          mr: 3,
          transition: "0.3s ease all",
          "&:hover": { opacity: 0.7 },
        }}
        onClick={() => setMobileMenuOpen(false)}
      >
        <img src={uiConfig.appLogo} alt="AAVE" width={20} height={20} />
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        {navItems.map((item) => (
          <Button
            key={item}
            sx={{ color: "white", textTransform: "capitalize" }}
          >
            {item}
          </Button>
        ))}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <NoSsr>
        <StyledBadge
          variant="dot"
          badgeContent=""
          color="secondary"
          sx={{ mr: 2 }}
        >
          <Button
            variant="outlined"
            aria-label="Switch tool"
            sx={{
              backgroundColor: "#383D51",
              color: "white",
              p: "7px 8px",
              minWidth: "unset",
              gap: 2,
              alignItems: "center",
            }}
          >
            {!smd && (
              <Typography
                component="span"
                typography="subheader1"
                sx={{ fontSize: "12px" }}
              >
                Bridge GHO
              </Typography>
            )}
            <SvgIcon fontSize="small">
              <SparklesIcon className="h-6 w-6 text-blue-500" />
            </SvgIcon>
          </Button>
        </StyledBadge>
      </NoSsr>
      <NoSsr>
        <StyledBadge
          invisible={true}
          variant="dot"
          badgeContent=""
          color="secondary"
          sx={{ mr: 2 }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "white",
              p: "7px 8px",
              minWidth: "unset",
              gap: 2,
              alignItems: "center",
            }}
            aria-label="Switch tool"
          >
            {!smd && (
              <Typography
                component="span"
                typography="subheader1"
                sx={{ fontSize: "12px" }}
              >
                Switch tokens
              </Typography>
            )}
            <SvgIcon fontSize="small">
              <ArrowsRightLeftIcon className="h-6 w-6 text-blue-500" />
            </SvgIcon>
          </Button>
        </StyledBadge>
      </NoSsr>

      <ConnectModel onPropChange={handleModalChange} />
    </Box>
  );
}
