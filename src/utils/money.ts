// TODO: change this to work with padEnd
export const numberToEuros = (number: number): string => {
  const splittedNumber = number.toString().split(".");
  if (splittedNumber.length === 1) {
    splittedNumber.push("00");
  }

  if (splittedNumber[1].length === 1) {
    splittedNumber[1] = splittedNumber[1].concat("0");
  }

  return splittedNumber.join(",").concat(" EUR");
};
