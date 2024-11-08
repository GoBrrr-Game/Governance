import { Box, Link, Typography } from "@mui/material";
import { useQuery, useLazyQuery, ApolloQueryResult } from '@apollo/client';
import client from "@/graphql/client";
import { GET_POOL_INFO_QUERY } from '@/graphql/query';
import { useEffect, useState } from "react";
import { formatDisplayNumber } from "@/utils";
import { networkConfig } from "@/config/network";

class PoolInfoData {
  totalDistributionAmount: number;
  totalRewardAmount: number;
  totalLockedStakedAmount: number;
  totalNolockStakedAmount: number;
  totalWithdrawAmount: number;
  constructor(
    totalDistributionAmount: number = 0,
    totalRewardAmount: number = 0,
    totalLockedStakedAmount: number = 0,
    totalNolockStakedAmount: number = 0,
    totalWithdrawAmount: number = 0
  ) {
    this.totalDistributionAmount = totalDistributionAmount;
    this.totalRewardAmount = totalRewardAmount;
    this.totalLockedStakedAmount = totalLockedStakedAmount;
    this.totalNolockStakedAmount = totalNolockStakedAmount;
    this.totalWithdrawAmount = totalWithdrawAmount;
  }
}

export function StakingHeader() {
  const decimals = 10**18;
  const [isUpgradable, setUpgradable] = useState(true);
  const [poolInfo, setPoolInfo] = useState(new PoolInfoData());

  useEffect(() => {
    if (!isUpgradable) return;
    client.query({
      query: GET_POOL_INFO_QUERY,
      fetchPolicy: "no-cache",
      variables: {
        id: networkConfig.stakingContractAddrses.toLowerCase()
      }
    }).then((value: ApolloQueryResult<any>) => {
      const data = value.data;
      const poolInfo: PoolInfoData = new PoolInfoData(
        Number(data.poolInfo.totalDistributionAmount || 0) / decimals,
        Number(data.poolInfo.totalRewardAmount || 0) / decimals,
        Number(data.poolInfo.totalLockedStakedAmount || 0) / decimals,
        Number(data.poolInfo.totalNolockStakedAmount || 0) / decimals,
        Number(data.poolInfo.totalWithdrawAmount || 0) / decimals
      );
      setPoolInfo(poolInfo);
      setUpgradable(false);
    });
  }, [isUpgradable, decimals]);
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
          <g>Total Locked</g>
          <br />
          <g style={{ fontSize: "1.5rem", color: "white", fontWeight: "bold" }}>
            { formatDisplayNumber(poolInfo.totalLockedStakedAmount) }
          </g>
        </Typography>
        <Typography
          sx={{ color: "#8E92A3", maxWidth: "824px", marginRight: "50px" }}
        >
          <g>Total NoLocked</g>
          <br />
          <g style={{ fontSize: "1.5rem", color: "white", fontWeight: "bold" }}>
            { formatDisplayNumber(poolInfo.totalNolockStakedAmount) }
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
