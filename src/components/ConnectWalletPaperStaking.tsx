import { CircularProgress, Paper, PaperProps, Typography } from "@mui/material";
import { ReactNode } from "react";
// import { StakingPanelNoWallet } from 'src/modules/staking/StakingPanelNoWallet';
import { Button } from "@mui/material";
import ConnectModel from "./connectComponent/ConnectModel";

interface ConnectWalletPaperStakingProps extends PaperProps {
  loading?: boolean;
  description?: ReactNode;
}

export const ConnectWalletPaperStaking = ({
  loading,
  description,
  sx,
  ...rest
}: ConnectWalletPaperStakingProps) => {
  return (
    <Paper
      {...rest}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 4,
        flex: 1,
        ...sx,
      }}
    >
      <>
        {loading ? (
          <CircularProgress />
        ) : (
          <div style={{ marginTop: "5rem", marginBottom: "5rem" }}>
            <Typography
              variant="h5"
              sx={{ mb: 2, marginTop: "1rem", marginBottom: "1rem" }}
            >
              <g>Please, connect your wallet</g>
            </Typography>
            <Typography sx={{ mb: 6 }} color="text.secondary">
              {description || (
                <g>
                  Please connect your wallet to see your supplies, borrowings,
                  and open positions.
                </g>
              )}
            </Typography>
            <ConnectModel />
            {/* <Button
              variant="outlined"
              sx={{
                fontSize: "12px",
                color: "grey",
                p: "7px 8px",
                minWidth: "unset",
                gap: 2,
                alignItems: "center",
              }}
            >
              Connect wallet
            </Button> */}
            {/* <ConnectWalletButton funnel={"Staking page"} /> */}
            {/* <Grid container spacing={1} pt={6} sx={{ maxWidth: '758px', textAlign: 'right' }}>
              <Grid item xs={12} md={4}>
                <StakingPanelNoWallet stakedToken={'GHO'} icon={'gho'} />
              </Grid>
              <Grid item xs={12} md={4}>
                <StakingPanelNoWallet stakedToken={'AAVE'} icon={'aave'} />
              </Grid>
              <Grid item xs={12} md={4}>
                <StakingPanelNoWallet stakedToken={'ABPT V2'} icon={'stkbptv2'} />
              </Grid>
            </Grid> */}
          </div>
        )}
      </>
    </Paper>
  );
};
