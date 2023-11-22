export const convertToMoney = (num: any, decimal = 0) => {
  let retNum = num;
  // eslint-disable-next-line eqeqeq
  if ((!num && num !== 0) || num == true) {
    return "";
  }
  if (typeof num === "string") {
    retNum = parseInt(retNum, 10);
  }
  retNum = retNum.toFixed(decimal);

  return retNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const convertWithDecimal = (num: number | string) => {
  if (!num && num !== 0) {
    return "";
  }
  const stringNum = num.toString();
  const [full, decimal] = stringNum.split(".");
  const formatFull = full.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  return `${formatFull}${decimal ? "." : ""}${decimal ?? ""}`;
};
