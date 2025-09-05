export function formatCurrency(value: number, currency: string = 'USD', locale?: string) {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  } catch {
    // Fallback if Intl or currency not available
    return `$${Number(value).toFixed(2)}`;
  }
}

