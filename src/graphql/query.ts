import { gql } from "apollo-server-micro";

export const GET_POOL_INFO_QUERY = gql`
query PoolInfoQuery($id: String) { 
    poolInfo(id: $id) {
        totalDistributionAmount
        totalRewardAmount
        totalLockedStakedAmount
        totalNolockStakedAmount
        totalWithdrawAmount
        totalWeights
    }
}`

export const GET_USER_INFO_QUERY = gql`
query UserInfoQuery($poolId: String, $userId: String) {
    poolInfo(id: $poolId) {
        cooldownSeconds
    }
    cooldownSnapshotInfo(id: $userId) {
        amount
        timestamp
    }
    userInfo(id: $userId) {
        totalLockedStakedAmount
        totalNolockedStakedAmount
        totalRewardInfoCount
        totalWithdrawedAmount
        totalHistoryCount
        totalClaimedRewardAmount
        currentNolockedStakedAmount
        currentLockedStakedAmount
        userHistories {
            currentNolockedQuantity
            currentLockedQuantity
            claimedEpoch
            finished
            finishedTime
            historyType
            id
            previousLockedQuantity
            previousNolockedQuantity
            rewardQuantity
            startTime
        }
    }
}`

export const GET_USER_HISTORY_QUERY = gql`
query UserInfoQuery($id: String, $skip: Int = 0, $first: Int = 10) { 
    userInfo(id: $id) {
        userHistories(skip: $skip, first: $first, orderBy: id, orderDirection: desc) {
            currentNolockedQuantity
            currentLockedQuantity
            claimedEpoch
            finished
            finishedTime
            historyType
            id
            previousLockedQuantity
            previousNolockedQuantity
            rewardQuantity
            startTime
        }
    }
}`

export const GET_FILTERED_REWARD_INFO_QUERY = gql`
query UserInfoQuery($id: String, $startTime: String, $endTime: String) { 
    userInfo(id: $id) {
        userHistories(where: {startTime_gte: $startTime, startTime_lte: $endTime, historyType: "REWARD"}) {
            rewardQuantity,
        }
    }
}`