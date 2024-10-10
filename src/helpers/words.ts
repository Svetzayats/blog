export function getYearSuffix(number) {
  if (number >= 11 && number <= 19) {
      return 'лет';
  }

  const lastDigit = number % 10;

  switch (lastDigit) {
      case 1:
          return 'год';
      case 2:
      case 3:
      case 4:
          return 'года';
      default:
          return 'лет';
  }
}