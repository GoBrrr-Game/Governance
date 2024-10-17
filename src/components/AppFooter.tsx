import * as React from "react";
import { useEffect, useState } from "react";
import { Box, styled, SvgIcon, Typography } from "@mui/material";
import Link from "next/link";

interface StyledLinkProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const StyledLink = styled(Link)<StyledLinkProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  display: "flex",
  alignItems: "center",
}));

export function AppFooter() {
  const FOOTER_LINKS = [
    {
      href: "https://aave.com/terms-of-service",
      label: <g>Terms</g>,
      key: "Terms",
    },
    {
      href: "https://aave.com/privacy-policy/",
      label: <g>Privacy</g>,
      key: "Privacy",
    },
    {
      href: "https://docs.aave.com/hub/",
      label: <g>Docs</g>,
      key: "Docs",
    },
    {
      href: "https://docs.aave.com/faq/",
      label: <g>FAQS</g>,
      key: "FAQS",
    },
    {
      href: "https://discord.com/invite/aave",
      label: <g>Send feedback</g>,
      key: "Send feedback",
      onClick: (event: React.MouseEvent) => {
        event.preventDefault();
      },
    },
    {
      href: "/",
      label: <g>Manage analytics</g>,
      key: "Manage analytics",
      onClick: (event: React.MouseEvent) => {
        event.preventDefault();
      },
    },
  ];

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        padding: ["22px 0px 40px 0px", "0 22px 0 40px", "20px 22px"],
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "22px",
        flexDirection: ["column", "column", "row"],
        boxShadow:
          theme.palette.mode === "light"
            ? "inset 0px 1px 0px rgba(0, 0, 0, 0.04)"
            : "inset 0px 1px 0px rgba(255, 255, 255, 0.12)",
      })}
    >
      {/* <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {FOOTER_LINKS.map((link) => (
          <StyledLink onClick={link.onClick} key={link.key} href={link.href}>
            <Typography variant="caption">{link.label}</Typography>
          </StyledLink>
        ))}
      </Box> */}
    </Box>
  );
}
