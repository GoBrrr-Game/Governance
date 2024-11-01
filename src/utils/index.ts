export const formatDisplayNumber = (num: number | string) => {
  return Number(num).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}