// actions.ts
export const SET_MODEL_VALUE = "SET_MODEL_VALUE";

// Action creator for setting the model value
export const setModelValue = (value: string) => ({
  type: SET_MODEL_VALUE,
  payload: value,
});
