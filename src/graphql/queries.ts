import { gql } from "apollo-server-micro";

export const GET_POOL_INFO_QUERY = gql`
query PoolInfoQuery($id: String) { 
    poolInfo(id: $id) {
        totalDistributionAmount
        totalRewardAmount
        totalStakedAmount
        totalWithdrawAmount
        totalWeights
    }
}`

export const GET_USER_INFO_QUERY = gql`
query UserInfoQuery($id: String) { 
    userInfo(id: $id) {
        currentStakedAmount
        lastTokensWeightedShare
        activeStakeInfoCount
        totalClaimedRewardAmount
        totalPendingRewardAmount
        totalRewardInfoCount
        totalStakeInfoCount
        totalStakedAmount
        totalWithdrawedAmount
        weights
        rewardInfos {
            amount
            claimTime
            claimedEpoch
            id
        }
        stakeInfos {
            finished
            finishedTime
            id
            lockEndTime
            lockPeriod
            lockStartTime
            lockType
            quantity
        }
    }
}`