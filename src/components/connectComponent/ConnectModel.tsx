import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Link,
  Typography,
} from "@mui/material";
import WalletRow from "./WalletRow";
import { ethers } from "ethers";
import CloseIcon from "@mui/material/Icon";

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

  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Shorten Ethereum address
  const shortenAddress = (address: string): string => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Check if MetaMask is available and connect to it
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        // Request MetaMask accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]); // Set the first account
        handleClose();
      } catch (error) {
        setError("Failed to connect to MetaMask");
      }
    } else {
      setError("MetaMask is not installed");
    }
  };
  // Auto-connect if already authorized
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // MetaMask is disconnected or no accounts available
          setAccount(null);
        } else {
          // User switched accounts, update the state
          setAccount(accounts[0]);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      // Cleanup listener on component unmount
      return () => {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    }
  }, []);

  return (
    <div>
      {account ? (
        <Button variant="outlined" style={{ fontWeight: "bold" }}>
          {shortenAddress(account)}
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          style={{ fontWeight: "bold" }}
        >
          Connect Wallet
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ fontWeight: "bold" }}>
          Connect a wallet
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              backgroundColor: "grey",
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <WalletRow title="Browser wallet" onClick={connectWallet}></WalletRow>
          <WalletRow title="WalletConnect" onClick={connectWallet}></WalletRow>
          <WalletRow
            title="Coinbase Wallet"
            onClick={connectWallet}
          ></WalletRow>
          <WalletRow title="Torus" onClick={connectWallet}></WalletRow>
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
          <Button onClick={handleClose} color="primary"></Button>
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
