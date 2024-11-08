import { CircularProgress, Grid2, Paper, PaperProps, Typography, Box, Dialog, DialogActions, DialogTitle, IconButton, InputBase, Button, Link, Select, MenuItem, Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { DateRangePicker } from '@nextui-org/react';
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import { ReactNode, useEffect, useState } from "react";
// import { StakingPanelNoWallet } from 'src/modules/staking/StakingPanelNoWallet';
import ConnectModel from "./connect/ConnectModel";
import { GET_USER_INFO_QUERY } from "@/graphql/query";
import client from "@/graphql/client";
import { ApolloQueryResult } from "@apollo/client";
import { formatDisplayNumber } from "@/utils";
import GoBrrStakingABI from '@/contracts/GoBrrStaking.json';
import TokenABI from '@/contracts/Token.json';
import { networkConfig } from "@/config/network";
import { ethers } from "ethers";
import classNames from "classnames";
import moment from "moment";

interface TestStakingProps extends PaperProps {
  address: string;
}

interface StakeInfo {
  id: string;
  startTime: string;
  previousLockedQuantity: string;
  previousNolockedQuantity: string;
  currentLockedQuantity: string;
  currentNolockedQuantity: string;
  claimedEpoch: string;
  historyType: string;
  finished: boolean;
  finishedTime: string;
}

interface RewardInfo {
  amount: string;
  claimTime: string;
  claimedEpoch: string;
  id: string;
}

class UserInfoData {
  totalLockedStakedAmount: number;
  totalNolockedStakedAmount: number;
  totalRewardInfoCount: number;
  totalWithdrawedAmount: number;
  totalHistoryCount: number;
  totalClaimedRewardAmount: number;
  currentNolockedStakedAmount: number;
  currentLockedStakedAmount: number;
  cooldownAmount: number;
  cooldownTimestamp: number;
  userHistories: StakeInfo[] = [];
  constructor(
    totalLockedStakedAmount: number = 0,
    totalNolockedStakedAmount: number = 0,
    totalRewardInfoCount: number = 0,
    totalWithdrawedAmount: number = 0,
    totalHistoryCount: number = 0,
    totalClaimedRewardAmount: number = 0,
    currentNolockedStakedAmount: number = 0,
    currentLockedStakedAmount: number = 0,
    cooldownAmount: number = 0,
    cooldownTimestamp: number = 0
  ) {
    this.totalLockedStakedAmount = totalLockedStakedAmount;
    this.totalNolockedStakedAmount = totalNolockedStakedAmount;
    this.totalRewardInfoCount = totalRewardInfoCount;
    this.totalWithdrawedAmount = totalWithdrawedAmount;
    this.totalHistoryCount = totalHistoryCount;
    this.totalClaimedRewardAmount = totalClaimedRewardAmount;
    this.currentNolockedStakedAmount = currentNolockedStakedAmount;
    this.currentLockedStakedAmount = currentLockedStakedAmount;
    this.cooldownAmount = cooldownAmount;
    this.cooldownTimestamp = cooldownTimestamp;
  }
}

const formatTime = function (value: any): any {
  return moment(Number(value) * 1000).format('YYYY-MM-DD HH:mm');
}

const getLockType = function (value: any): any {
  switch (Number(value)) {
    case 1:
      return '1 Month Lock';
    case 2:
      return '3 Months Lock';
    case 3:
      return '6 Months Lock';
    case 4:
      return '9 Months Lock';
    case 5:
      return '12 Months Lock';
  }
  return 'No Lock';
}

const historyTableColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 50,
    valueGetter: (value: any) => (Number((value || '').split('-')[1]) + 1)
  },
  { field: 'claimedEpoch', headerName: 'ClaimedEpoch', flex: 130, valueGetter: (value) => formatDisplayNumber(Number(value) / 10 ** 18) },
  { field: 'previousLockedQuantity', headerName: 'PrevLocked', flex: 130, valueGetter: (value) => formatDisplayNumber(Number(value) / 10 ** 18) },
  { field: 'previousNolockedQuantity', headerName: 'PrevNoLocked', flex: 130, valueGetter: (value) => formatDisplayNumber(Number(value) / 10 ** 18) },
  { field: 'currentLockedQuantity', headerName: 'CurLocked', flex: 130, valueGetter: (value) => formatDisplayNumber(Number(value) / 10 ** 18) },
  { field: 'currentNolockedQuantity', headerName: 'CurNoLocked', flex: 130, valueGetter: (value) => formatDisplayNumber(Number(value) / 10 ** 18) },
  { field: 'rewardQuantity', headerName: 'Rewards', flex: 130, valueGetter: (value) => formatDisplayNumber(Number(value) / 10 ** 18) },
  { field: 'startTime', headerName: 'StartTime', width: 200, valueGetter: (value) => (value && value != '0' ? formatTime(value) : '') },
  { field: 'historyType', headerName: 'HistoryType', flex: 130 },
  {
    field: 'finished',
    headerName: 'State',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 110,
    valueGetter: (value, row) => `${row.finished  ? 'Finished' : ''}`,
  },
  { field: 'finishedTime', headerName: 'WithdrawTime', width: 200, valueGetter: (value) => (value && value != '0' ? formatTime(value) : '') },
];

const stakeTableColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 50,
    renderCell: (params: any) => (Number(params.row.id.split('-')[1]) + 1)
  },
  { field: 'quantity', headerName: 'Quantity', flex: 130, valueGetter: (value) => formatDisplayNumber(Number(value) / 10 ** 18) },
  { field: 'lockStartTime', headerName: 'LockStartTime', flex: 130, valueGetter: (value) => formatTime(value) },
  { field: 'lockEndTime', headerName: 'LockEndTime', flex: 130, valueGetter: (value) => formatTime(value) },
  { field: 'lockPeriod', headerName: 'LockPeriod', flex: 130, valueGetter: (value) => (Math.floor(Number(value) / 24 / 60 / 60) + ' days')},
  { field: 'lockType', headerName: 'LockType', flex: 100, valueGetter: (value) => getLockType(value) },
  {
    field: 'finished',
    headerName: 'State',
    description: 'This column has a value getter and is not sortable.',
    sortable: true,
    width: 110,
    valueGetter: (value, row) => `${row.finished  ? 'Withdraw' : 'Stake'}`,
  },
  { field: 'finishedTime', headerName: 'WithdrawTime', width: 130, valueGetter: (value) => (value && value != '0' ? formatTime(value) : '') },
];

const rewardTableColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1,
    renderCell: (params: any) => (Number(params.row.id.split('-')[1]) + 1)
  },
  { field: 'amount', headerName: 'Reward', flex: 2, valueGetter: (value) => formatDisplayNumber(Number(value) / (10**18)) },
  { field: 'claimedEpoch', headerName: 'Claimed Epoch', flex: 2 },
  { field: 'claimTime', headerName: 'Claim Time', flex: 2, valueGetter: (value) => formatTime(value) },
];


const paginationModel = { page: 0, pageSize: 5 };

export const TestStaking: React.FC<
TestStakingProps
> = ({ address, sx, ...rest }: TestStakingProps) => {
  const decimals = 10**18;
  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [userInfo, setUserInfo] = useState(new UserInfoData());
  const [modalType, setModalType] = useState('');
  const [browserProvider, setBrowserProvider] = useState<ethers.BrowserProvider | null>(null);
  const [stakingContract, setStakingContract] = useState<ethers.Contract | null>(null);
  const [tokenContract, setTokenContract] = useState<ethers.Contract | null>(null);
  const [unlockAmount, setUnlockAmount] = useState(0);
  const [claimableRewards, setClaimableRewards] = useState(0);
  const [stakeValue, setStakeValue] = useState(0);
  const [lockType, setLockType] = useState(0);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [lockRemainText, setLockRemainText] = useState("");
  const [claimInterval, setClaimInterval] = useState({
    start: parseDate(moment().format("YYYY-MM-DD")),
    end: parseDate(moment().format("YYYY-MM-DD")),
  });

  const getClaimedRewardInterval = () => {
    client.query({
      query: GET_USER_INFO_QUERY,
      variables: {
        id: address,
        startTime: Math.floor(claimInterval.start.toDate(getLocalTimeZone()).getTime() / 1000),
        endTime: Math.floor((claimInterval.end.toDate(getLocalTimeZone()).getTime() + 24*60*60*1000) / 1000),
      }
    }).then((value: ApolloQueryResult<any>) => {
      const data = value.data;
      if (!data.userInfo || !data.userInfo.userHistories) return;
      let totalAmount: number = 0;
      data.userInfo.userHistories.map((history: any) => {
        totalAmount += Number(history.rewardQuantity) / decimals;
      });
      alert(formatDisplayNumber(totalAmount));
    });
  }
  const handleStakeChange = (e: any) => {
    setStakeValue(e.target.value);
  }

  const handleLockTypeChange = (e: any) => {
    setLockType(e.target.value);
  }

  const handleShowModal = async (type: string) => {
    if (type == 'withdraw') {
      await getUnlockTokens();
    }else if(type == 'claim') {
      await getClaimableRewards();
    }
    setModalType(type);
  }

  const handleCloseModal = () => {
    setModalType('');
  }

  const getClaimableRewards = async (): Promise<void> => {
    if (!stakingContract) {
      setClaimableRewards(0);
      return;
    }
    try {
      const claimableRewards = await stakingContract.getClaimableRewards(address);
      setClaimableRewards(Number(claimableRewards) / decimals);
    } catch (err) {
      console.log(err);
    }
  }

  const getUnlockTokens = async (): Promise<void> => {
    if (!stakingContract) {
      setUnlockAmount(0);
      return;
    }
    try {
      const unlockAmount = await stakingContract.getUnlockTokens(address);
      setUnlockAmount(Number(unlockAmount) / decimals);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async () => {
    switch (modalType) {
      case 'stake':
        handleStake(stakeValue, lockType);
        break;
      case 'withdraw':
        handleWithdraw();
        break;
      case 'claim':
        handleClaimRewards();
        break;
    }
    setModalType('');
    return false;
  }
  const handleStake = async (amount: number, lockType: number) => {
    if (!stakingContract || !tokenContract) return;
    try {
      setLoading(true);
      const allowance = Number(await tokenContract.allowance(address, networkConfig.stakingContractAddrses)) / decimals;
      if (allowance < amount) {
        const tx1 = await tokenContract.approve(networkConfig.stakingContractAddrses, BigInt(Math.ceil(amount)) * BigInt(decimals));
        await tx1.wait();
      }
      const tx2 = await stakingContract.stake(BigInt(amount) * BigInt(decimals));
      await tx2.wait();
      upgradeAll();
      setLoading(false);
      console.log("Staked");
    } catch (err: any) {
      console.log(err, err.message);
    }
  }

  const handleCooldown = async () => {
    if (!stakingContract) return;
    try {
      setLoading(true);
      const tx = await stakingContract.cooldown();
      await tx.wait();
      upgradeAll();
      setLoading(false);
      console.log("Cooldown");
    } catch (err) {
      console.log(err);
    }
  }

  const handleWithdraw = async () => {
    if (!stakingContract) return;
    try {
      if (unlockAmount <= 0) {
        alert('No amount to withdraw');
        return;
      }
      setLoading(true);
      const tx = await stakingContract.withdraw();
      await tx.wait();
      upgradeAll();
      setLoading(false);
      console.log("Withdrawed");
    } catch (err) {
      console.log(err);
    }
  }

  const handleClaimRewards = async () => {
    if (!stakingContract) return;
    try { 
      if (claimableRewards <= 0) {
        alert('No amount to claim');
        return;
      }
      setLoading(true);
      const tx = await stakingContract.claimRewards();
      await tx.wait();
      upgradeAll();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  const upgradeAll = () => {
    client.query({
      query: GET_USER_INFO_QUERY,
      variables: {
        poolId: networkConfig.stakingContractAddrses,
        userId: address
      }
    }).then((value: ApolloQueryResult<any>) => {
      const data = value.data;
      if (!data.userInfo || !data.cooldownSnapshotInfo) return;
      const userInfo: UserInfoData = new UserInfoData(
        Number(data.userInfo.totalLockedStakedAmount) / decimals,
        Number(data.userInfo.totalNolockedStakedAmount) / decimals,
        Number(data.userInfo.totalRewardInfoCount) / decimals,
        Number(data.userInfo.totalWithdrawedAmount) / decimals,
        Number(data.userInfo.totalHistoryCount) / decimals,
        Number(data.userInfo.totalClaimedRewardAmount) / decimals,
        Number(data.userInfo.currentNolockedStakedAmount) / decimals,
        Number(data.userInfo.currentLockedStakedAmount) / decimals,
        Number(data.cooldownSnapshotInfo.amount) / decimals,
        Number(data.cooldownSnapshotInfo.timestamp)
      );
      setCooldownSeconds(Number(data.poolInfo.cooldownSeconds));
      console.log(address, userInfo);
      userInfo.userHistories = data.userInfo.userHistories;
      if (tokenContract) {
        tokenContract.balanceOf(address).then((value) => {
          setCurrentBalance(Number(value) / decimals);
        })
        getUnlockTokens();
      }
      setUserInfo(userInfo);
    });
  }
  useEffect(() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setBrowserProvider(provider);

    provider.getSigner().then((signer) => {
      try {
        const stakingContract = new ethers.Contract(networkConfig.stakingContractAddrses, GoBrrStakingABI, signer);
        setStakingContract(stakingContract);
  
        const _tokenContract = new ethers.Contract(networkConfig.tokenContractAddress, TokenABI, signer);
        setTokenContract(_tokenContract);
        if (_tokenContract) {
          _tokenContract.balanceOf(address).then((value) => {
            setCurrentBalance(Number(value) / decimals);
          }).catch((err) => {
            console.log(err);
          })
        }
      } catch (err) {
        console.log(err);
      }
    });
  }, [address, decimals]);

  useEffect(() => {
    if (!address) return;
    upgradeAll();
    const interval = setInterval(() => {
      upgradeAll()
    },12000);
    const lockInterval = setInterval(() => {
      const curTime = new Date().getTime() / 1000;
      console.log(userInfo.cooldownTimestamp + cooldownSeconds, curTime);
      if (userInfo.cooldownTimestamp + cooldownSeconds <= curTime) {
        setLockRemainText("Unlocked");
      }else {
        const remain = Math.floor(userInfo.cooldownTimestamp + cooldownSeconds - curTime);
        setLockRemainText(`${Math.floor(remain / 3600)}h ${Math.floor((remain % 3600)/60)}m ${Math.floor(remain % 60)}s Remain`);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(lockInterval);
    }
  }, [address]);

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
        ) : (<>
          <div style={{ display: "flex", width: "100%", marginBottom: "30px" }}>
            <Typography sx={{ color: "#888888", width: "10%" }}>
              <g>Balance</g>
              <br />
              <g style={{ fontSize: "1rem", color: "#424242" }}>
                { formatDisplayNumber(currentBalance) }
              </g>
            </Typography>
            <Typography sx={{ color: "#888888", width: "10%" }}>
              <g>Total Locked</g>
              <br />
              <g style={{ fontSize: "1rem", color: "#424242" }}>
                { formatDisplayNumber(userInfo.totalLockedStakedAmount) }
              </g>
            </Typography>
            <Typography sx={{ color: "#888888", width: "10%" }}>
              <g>Total NoLock</g>
              <br />
              <g style={{ fontSize: "1rem", color: "#424242" }}>
                { formatDisplayNumber(userInfo.totalNolockedStakedAmount) }
              </g>
            </Typography>
            <Typography sx={{ color: "#888888", width: "10%" }}>
              <g>Claimed</g>
              <br />
              <g style={{ fontSize: "1rem", color: "#424242" }}>
                { formatDisplayNumber(userInfo.totalClaimedRewardAmount) }
              </g>
            </Typography>
            <Typography sx={{ color: "#888888", width: "10%" }}>
              <g>Current Staked</g>
              <br />
              <g style={{ fontSize: "1rem", color: "#424242" }}>
                { formatDisplayNumber(userInfo.currentLockedStakedAmount + userInfo.currentNolockedStakedAmount) }
              </g>
            </Typography>
            <Typography sx={{ color: "#888888", width: "10%" }}>
              <g>Current Cooldown</g>
              <br />
              <g style={{ fontSize: "1rem", color: "#424242" }}>
                { formatDisplayNumber(userInfo.cooldownAmount) }
              </g>
            </Typography>
            <Typography sx={{ color: "#888888", width: "10%" }}>
              <g>Cooldown Remain</g>
              <br />
              <g style={{ fontSize: "1rem", color: "#424242" }}>
                { lockRemainText }
              </g>
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <Box>
              <Button
                variant="outlined"
                onClick={() => handleShowModal('stake')}
                style={{ fontWeight: "bold", marginRight: "20px" }}
              >
                STAKE
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleCooldown()}
                style={{ fontWeight: "bold", marginRight: "20px" }}
              >
                COOLDOWN
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleShowModal('withdraw')}
                style={{ fontWeight: "bold", marginRight: "20px" }}
              >
                Withdraw
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleShowModal('claim')}
                style={{ fontWeight: "bold" }}
              >
                Claim
              </Button>
            </Box>
          </div>
          <Typography sx={{ color: "#333", fontSize: "1.5rem", marginTop: "20px" }}>
            <g>Stake History</g>
          </Typography>
          <DataGrid
            rows={userInfo.userHistories}
            columns={historyTableColumns}
            initialState={{ pagination: { paginationModel }, sorting: { sortModel: [{field: 'lockStartTime', sort: 'desc'}]} }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0, width: '100%' }}
          />
          <Typography sx={{ color: "#333", fontSize: "1.5rem", marginTop: "20px", marginBottom: "20px" }}>
            <g>Reward History</g>
          </Typography>
          <div style={{ display: "flex", width: "100%" }}>
            <DateRangePicker
              label=""
              aria-label="Range"
              style={{ marginRight: "20px", border: "1px solid #888" }}
              className="max-w-[284px]"
              value={claimInterval}
              onChange={setClaimInterval}
            />
            <Button
              type="button"
              variant="outlined"
              style={{ fontWeight: "bold", marginLeft: "20px" }}
              onClick = {() => (getClaimedRewardInterval())}
            >
              Get Claimed Rewards
            </Button>
          </div>
          {/* <DataGrid
            rows={userInfo.rewardInfos}
            columns={rewardTableColumns}
            initialState={{ pagination: { paginationModel }, sorting: { sortModel: [{field: 'claimTime', sort: 'desc'}]} }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0, width: '100%' }}
          /> */}
          <Dialog open={ modalType == 'stake' || modalType == 'cooldown' || modalType == 'withdraw' || modalType == 'claim' } onClose={handleCloseModal}>
            <DialogTitle style={{ fontWeight: "bold" }}>
              { modalType.toUpperCase() }
              <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={{
                  backgroundColor: "grey",
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
              </IconButton>
            </DialogTitle>
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
                  <g>{ modalType == 'stake' ? 
                    `Max amount is ${formatDisplayNumber(currentBalance)}. Input stake amount. ` 
                    : (modalType == 'withdraw' 
                        ? `Unlock amount is ${formatDisplayNumber(unlockAmount)}. Are you going to withdraw all you staked?` 
                        : `Claimable Rewards: ${formatDisplayNumber(claimableRewards)}`) }</g>
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
                  className={classNames("", {
                    hidden: modalType =='stake' ? false : true
                  })}
                  placeholder="Enter stake amount"
                  fullWidth
                  value={stakeValue}
                  onChange={handleStakeChange}
                  inputProps={{
                    "aria-label": "read-only mode address",
                  }}
                />
                {/* <Select
                  value={lockType}
                  onChange={handleLockTypeChange}
                  sx={(theme) => ({
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "6px",
                    mb: 1,
                    width: "100%",
                    maxWidth: "100%"
                  })}
                  className={classNames("", {
                    hidden: modalType =='stake' ? false : true
                  })}
                >
                  <MenuItem value={0}>No Lock</MenuItem>
                  <MenuItem value={1}>1 Month Lock</MenuItem>
                  <MenuItem value={2}>3 Months Lock</MenuItem>
                  <MenuItem value={3}>6 Months Lock</MenuItem>
                  <MenuItem value={4}>9 Months Lock</MenuItem>
                  <MenuItem value={5}>12 Months Lock</MenuItem>
                </Select> */}
                <Button
                  type="button"
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
                  onClick={handleSubmit}
                >
                  <g>{ modalType.toUpperCase() }</g>
                </Button>
              </form>
            </div>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary"></Button>
            </DialogActions>
          </Dialog>
        </>)}
      </>
    </Paper>
  );
};
