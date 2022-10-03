export const numberToEuros = (number: number): string => {
  const splittedNumber = number.toString().split(".");
  if (splittedNumber.length === 1) {
    splittedNumber.push("00");
  }

  return splittedNumber.join(",").concat(" EUR");
};
