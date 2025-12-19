const DISCOUNT_RATES = {
  REGULAR: 0,
  SILVER: 0.1,
  GOLD: 0.3,
  PLATINUM: 0.5,
};

const calculateDiscount = (amount, type, years) => {
  const loyaltyDiscount = Math.min(years, 5) / 100;

  let discountRate = 0;
  switch (type) {
    case 1:
      discountRate = DISCOUNT_RATES.REGULAR;
      break;
    case 2:
      discountRate = DISCOUNT_RATES.SILVER;
      break;
    case 3:
      discountRate = DISCOUNT_RATES.GOLD;
      break;
    case 4:
      discountRate = DISCOUNT_RATES.PLATINUM;
      break;
    default:
      return amount;
  }

  const priceAfterBaseDiscount = amount * (1 - discountRate);

  const finalPrice = priceAfterBaseDiscount * (1 - loyaltyDiscount);

  return finalPrice;
};

const assert = (expected, actual) => {
  if (expected !== actual)
    console.warn(`${actual} is not equal to ${expected}`);
};
assert(99, calculateDiscount(100, 1, 1));
