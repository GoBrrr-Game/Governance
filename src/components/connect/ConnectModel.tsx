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
import { useDispatch } from "react-redux";
import { setWalletAddress } from "../../store/actions/actions"; // Import the action
import { switchNetwork } from "@/utils/network";

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

  const dispatch = useDispatch();
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
        await switchNetwork();
        setAccount(accounts[0]); // Set the first account
        dispatch(setWalletAddress(accounts[0])); // Dispatch action to update Redux state
        handleClose();
      } catch (error) {
        setError("Failed to connect to MetaMask");
      }
    } else {
      setError("MetaMask is not installed");
    }
  };

  const checkMetaMaskConnection = async () => {
    try {
      // Check if window.ethereum exists (MetaMask is installed)
      if (window.ethereum) {
        // Check if accounts are already connected
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        await switchNetwork();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          dispatch(setWalletAddress(accounts[0]));
        } else {
          setAccount("");
        }
      } else {
        console.log("MetaMask is not installed");
      }
    } catch (error) {
      console.error("Error checking MetaMask connection:", error);
    }
  };

  // Listen to account changes
  useEffect(() => {
    checkMetaMaskConnection();
    // Listen for account changes
    window.ethereum?.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        dispatch(setWalletAddress(accounts[0])); // Dispatch action to update Redux state
      } else {
        setAccount("");
        dispatch(setWalletAddress("")); // Dispatch action to update Redux state
      }
    });
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
