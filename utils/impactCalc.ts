type MaterialType = {
  id: string;
  materialType: string;
  estimatedCo2SavingsKG: number;
  estimatedWaterSavingsLT: number;
};

type params = {
  firstMaterialType: MaterialType | null;
  firstMaterialTypeQuantity: number | null;
  secondMaterialType: MaterialType | null;
  secondMaterialTypeQuantity: number | null;
  thirdMaterialType: MaterialType | null;
  thirdMaterialTypeQuantity: number | null;
  fourthMaterialType: MaterialType | null;
  fourthMaterialTypeQuantity: number | null;
  fifthMaterialType: MaterialType | null;
  fifthMaterialTypeQuantity: number | null;
};

export const impactCalculator = ({
  firstMaterialType,
  secondMaterialType,
  thirdMaterialType,
  fourthMaterialType,
  fifthMaterialType,
  firstMaterialTypeQuantity,
  secondMaterialTypeQuantity,
  thirdMaterialTypeQuantity,
  fourthMaterialTypeQuantity,
  fifthMaterialTypeQuantity,
}: params) => {
  let totalCo2Savings = 0;
  let totalWaterSavings = 0;

  const convertToPercentage = (value: number) => value / 100;

  if (firstMaterialType && firstMaterialTypeQuantity) {
    totalCo2Savings += firstMaterialType.estimatedCo2SavingsKG * convertToPercentage(firstMaterialTypeQuantity);
    totalWaterSavings += firstMaterialType.estimatedWaterSavingsLT * convertToPercentage(firstMaterialTypeQuantity);
  }
  if (secondMaterialType && secondMaterialTypeQuantity) {
    totalCo2Savings += secondMaterialType.estimatedCo2SavingsKG * convertToPercentage(secondMaterialTypeQuantity);
    totalWaterSavings += secondMaterialType.estimatedWaterSavingsLT * convertToPercentage(secondMaterialTypeQuantity);
  }
  if (thirdMaterialType && thirdMaterialTypeQuantity) {
    totalCo2Savings += thirdMaterialType.estimatedCo2SavingsKG * convertToPercentage(thirdMaterialTypeQuantity);
    totalWaterSavings += thirdMaterialType.estimatedWaterSavingsLT * convertToPercentage(thirdMaterialTypeQuantity);
  }
  if (fourthMaterialType && fourthMaterialTypeQuantity) {
    totalCo2Savings += fourthMaterialType.estimatedCo2SavingsKG * convertToPercentage(fourthMaterialTypeQuantity);
    totalWaterSavings += fourthMaterialType.estimatedWaterSavingsLT * convertToPercentage(fourthMaterialTypeQuantity);
  }
  if (fifthMaterialType && fifthMaterialTypeQuantity) {
    totalCo2Savings += fifthMaterialType.estimatedCo2SavingsKG * convertToPercentage(fifthMaterialTypeQuantity);
    totalWaterSavings += fifthMaterialType.estimatedWaterSavingsLT * convertToPercentage(fifthMaterialTypeQuantity);
  }
  return {
    totalCo2Savings,
    totalWaterSavings,
  };
};
