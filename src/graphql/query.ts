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
    }
}`

export const GET_REWARD_INFO_QUERY = gql`
query UserInfoQuery($id: String, $skip: Int = 0, $first: Int = 10) { 
    userInfo(id: $id) {
        rewardInfos(skip: $skip, first: $first, orderBy: claimTime, orderDirection: desc) {
            amount
            claimTime
            claimedEpoch
            id
        }
    }
}`

export const GET_STAKE_INFO_QUERY = gql`
query UserInfoQuery($id: String, $skip: Int = 0, $first: Int = 10) { 
    userInfo(id: $id) {
        stakeInfos(skip: $skip, first: $first, orderBy: lockStartTime, orderDirection: desc) {
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

export const GET_FILTERED_REWARD_INFO_QUERY = gql`
query UserInfoQuery($id: String, $startTime: String, $endTime: String) { 
    userInfo(id: $id) {
        rewardInfos(where: {claimTime_gte: $startTime, claimTime_lte: $endTime}) {
            amount
            claimTime
            claimedEpoch
            id
        }
    }
}`