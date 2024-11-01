// actions.ts
export const SET_WALLET_ACCOUNT = "SET_WALLET_ACCOUNT";

// Action creator for setting the model value
export const setWalletAddress = (value: string) => ({
  type: SET_WALLET_ACCOUNT,
  payload: value,
});
