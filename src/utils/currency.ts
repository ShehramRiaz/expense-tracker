const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatCurrency(amountCents: number): string {
  const dollars = amountCents / 100;

  return currencyFormatter.format(dollars);
}
