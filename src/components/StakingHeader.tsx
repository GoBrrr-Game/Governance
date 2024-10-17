import { Box, Link, Typography } from "@mui/material";

export function StakingHeader() {
  return (
    <div
      style={{
        backgroundColor: "#2B2D3C",
        paddingLeft: "96px",
        paddingRight: "96px",
        height: "100%",
        paddingBottom: "66px",
      }}
    >
      <Box mb={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
            paddingTop: "20px",
          }}
        >
          {/* <img src={`/aave-logo-purple.svg`} width="64px" height="64px" alt="" /> */}
          <Typography sx={{ ml: 2, mr: 3, color: "white", fontSize: "30px" }}>
            <a style={{ fontWeight: "bold" }}>Staking</a>
          </Typography>
        </Box>

        <Typography sx={{ color: "#8E92A3", maxWidth: "824px" }}>
          <g>
            AAVE, GHO, and ABPT holders (Ethereum network only) can stake their
            assets in the Safety Module to add more security to the protocol and
            earn Safety Incentives. In the case of a shortfall event, your stake
            can be slashed to cover the deficit, providing an additional layer
            of protection for the protocol.
          </g>{" "}
          <Link
            href="https://docs.aave.com/faq/migration-and-staking"
            sx={{ textDecoration: "underline", color: "#8E92A3" }}
          >
            <g>Learn more about risks involved</g>
          </Link>
        </Typography>
      </Box>
      <div style={{ display: "flex" }}>
        <Typography
          sx={{ color: "#8E92A3", maxWidth: "824px", marginRight: "50px" }}
        >
          <g>Funds in the Safety Module</g>
          <br />
          <g style={{ fontSize: "1.5rem", color: "white", fontWeight: "bold" }}>
            $748.09M
          </g>
        </Typography>
        <Typography sx={{ color: "#8E92A3", maxWidth: "824px" }}>
          <g>Total emission per day</g>
          <br />
          <g style={{ fontSize: "1.5rem", color: "white", fontWeight: "bold" }}>
            820.00AAVE
          </g>
        </Typography>
      </div>
    </div>
  );
}
