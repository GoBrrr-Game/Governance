import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputBase,
  Link,
  Typography,
} from "@mui/material";
import WalletRow from "./WalletRow";
const MyDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ fontWeight: "bold" }}
      >
        Connect Wallet
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontWeight: "bold" }}>
          Connect a wallet
        </DialogTitle>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <WalletRow title="Browser wallet"></WalletRow>
          <WalletRow title="WalletConnect"></WalletRow>
          <WalletRow title="Coinbase Wallet"></WalletRow>
          <WalletRow title="Torus"></WalletRow>
        </Box>
        <div
          style={{
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              padding: "10px 0",
            }}
          >
            <Typography variant="inherit" color="text.secondary">
              <g>Track wallet balance in read-only mode</g>
            </Typography>
          </Box>
          <form>
            <InputBase
              sx={(theme) => ({
                py: 1,
                px: 3,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "6px",
                mb: 1,
                overflow: "show",
              })}
              placeholder="Enter ethereum address or ENS name"
              fullWidth
              inputProps={{
                "aria-label": "read-only mode address",
              }}
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                mb: "8px",
              }}
              size="large"
              fullWidth
              aria-label="read-only mode address"
            >
              <g>Track wallet</g>
            </Button>
          </form>
          <Typography
            variant="inherit"
            sx={{ mt: "22px", mb: "30px", alignSelf: "center" }}
          >
            <g>
              Need help connecting a wallet?{" "}
              <Link
                href="https://docs.aave.com/faq/troubleshooting"
                target="_blank"
                rel="noopener"
              >
                Read our FAQ
              </Link>
            </g>
          </Typography>
          <Typography variant="inherit">
            <g>
              Wallets are provided by External Providers and by selecting you
              agree to Terms of those Providers. Your access to the wallet might
              be reliant on the External Provider being operational.
            </g>
          </Typography>
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyDialog;
function useMediaQuery(arg0: any) {
  throw new Error("Function not implemented.");
}
function useTheme(): { breakpoints: any } {
  throw new Error("Function not implemented.");
}
