export function isValidAmountFormat(amount: string): boolean {
  const amountPattern = /^\d+(\.\d{1,2})?$/;

  return amountPattern.test(amount);
}

export function isValidAmount(amount: string): boolean {
  if (!isValidAmountFormat(amount)) return false;

  const [dollars, cents = "0"] = amount.split(".");

  const totalCents = BigInt(dollars) * 100n + BigInt(cents.padEnd(2, "0"));

  return totalCents > 0n && totalCents <= BigInt(Number.MAX_SAFE_INTEGER);
}

export function parseAmountToCents(amount: string): number {
  if (!isValidAmount(amount)) {
    throw new Error("Invalid transaction amount");
  }

  const [dollars, cents = "0"] = amount.split(".");

  const totalCents = BigInt(dollars) * 100n + BigInt(cents.padEnd(2, "0"));

  return Number(totalCents);
}
