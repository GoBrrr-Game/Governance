import { ReactNode, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface TopBarNotifyProps {
  notifyText: ReactNode;
}

export default function TopBarNotify({ notifyText }: TopBarNotifyProps) {
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down("md"));
  return (
    <AppBar
      component="header"
      sx={{
        padding: `8px, 12px, 8px, 12px`,
        display: "flex",
        backgroundColor: "primary.main",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 0,
      }}
      position="static"
    >
      <Toolbar
        sx={{
          display: "flex",
          paddingRight: md ? 0 : "",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="dense"
      >
        <Box sx={{ padding: md ? "20px 10px" : "", paddingRight: 0 }}>
          <Typography
            sx={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
            }}
            component="div"
          >
            <g>{notifyText}</g>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
