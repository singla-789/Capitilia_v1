export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return "";

  // Convert number to string to handle decimals
  const numStr = num.toString();
  const parts = numStr.split('.'); // integer and fractional parts

  let integerPart = parts[0];
  let fractionalPart = parts[1];

  // Indian numbering system
  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== "") {
    const formattedOtherNumbers = otherNumbers.replace(
      /\B(?=(\d{2})+(?!\d))/g,
      ","
    );
    integerPart = formattedOtherNumbers + "," + lastThree;
  } else {
    integerPart = lastThree;
  }

  return fractionalPart
    ? `${integerPart}.${fractionalPart}`
    : integerPart;
};
