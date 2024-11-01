import { Box, Link, Typography } from "@mui/material";
import { useQuery, useLazyQuery, ApolloQueryResult } from '@apollo/client';
import client from "@/graphql/client";
import { GET_POOL_INFO_QUERY } from '@/graphql/queries';
import { useEffect, useState } from "react";
import { formatDisplayNumber } from "@/utils";
import { networkConfig } from "@/config/network";

class PoolInfoData {
  totalDistributionAmount: number;
  totalRewardAmount: number;
  totalStakedAmount: number;
  totalWithdrawAmount: number;
  constructor(
    totalDistributionAmount: number = 0,
    totalRewardAmount: number = 0,
    totalStakedAmount: number = 0,
    totalWithdrawAmount: number = 0
  ) {
    this.totalDistributionAmount = totalDistributionAmount;
    this.totalRewardAmount = totalRewardAmount;
    this.totalStakedAmount = totalStakedAmount;
    this.totalWithdrawAmount = totalWithdrawAmount;
  }
}

export function StakingHeader() {
  const decimals = 10**18;
  let [isUpgradable, setUpgradable] = useState(true);
  let [poolInfo, setPoolInfo] = useState(new PoolInfoData());

  useEffect(() => {
    if (!isUpgradable) return;
    client.query({
      query: GET_POOL_INFO_QUERY,
      variables: {
        id: networkConfig.stakingContractAddrses.toLowerCase()
      }
    }).then((value: ApolloQueryResult<any>) => {
      const data = value.data;
      const poolInfo: PoolInfoData = new PoolInfoData(
        Number(data.poolInfo.totalDistributionAmount) / decimals,
        Number(data.poolInfo.totalRewardAmount) / decimals,
        Number(data.poolInfo.totalStakedAmount) / decimals,
        Number(data.poolInfo.totalWithdrawAmount) / decimals
      );
      setPoolInfo(poolInfo);
      setUpgradable(false);
    });
  }, [isUpgradable]);
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
      </Box>
      <div style={{ display: "flex" }}>
        <Typography
          sx={{ color: "#8E92A3", maxWidth: "824px", marginRight: "50px" }}
        >
          <g>Total Distributed</g>
          <br />
          <g style={{ fontSize: "1.5rem", color: "white", fontWeight: "bold" }}>
            { formatDisplayNumber(poolInfo.totalDistributionAmount) }
          </g>
        </Typography>
        <Typography
          sx={{ color: "#8E92A3", maxWidth: "824px", marginRight: "50px" }}
        >
          <g>Total Reward</g>
          <br />
          <g style={{ fontSize: "1.5rem", color: "white", fontWeight: "bold" }}>
            { formatDisplayNumber(poolInfo.totalRewardAmount) }
          </g>
        </Typography>
        <Typography
          sx={{ color: "#8E92A3", maxWidth: "824px", marginRight: "50px" }}
        >
          <g>Total Staked</g>
          <br />
          <g style={{ fontSize: "1.5rem", color: "white", fontWeight: "bold" }}>
            { formatDisplayNumber(poolInfo.totalStakedAmount) }
          </g>
        </Typography>
        <Typography
          sx={{ color: "#8E92A3", maxWidth: "824px", marginRight: "50px" }}
        >
          <g>Total Withdraw</g>
          <br />
          <g style={{ fontSize: "1.5rem", color: "white", fontWeight: "bold" }}>
            { formatDisplayNumber(poolInfo.totalWithdrawAmount) }
          </g>
        </Typography>
      </div>
      
    </div>
  );
}
