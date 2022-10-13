// TODO: change this to work with padEnd
export const numberToEuros = (number: number): string => {
  const splittedNumber = number.toString().split(".");

  if (splittedNumber.length === 1) {
    splittedNumber.push("");
  }

  splittedNumber[1] = splittedNumber[1].padEnd(2, "0");

  return splittedNumber.join(",").concat(" EUR");
};
