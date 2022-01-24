export function generateOptionsCrypto(options) {
  return Object.entries(options)
    .map(([currencyKey, currencyValue]) => {
      return `<option value="${currencyKey}">${currencyValue}</option>`;
    })
    .join('');
}

export function generateOptionsFiat(all) {
  return Object.entries(all)
    .map(([currencyKey, currencyValue]) => {
      return `<option value="${currencyKey}">${currencyValue}</option>`;
    })
    .join('');
}

export function formatCurrency(amount, currency) {
  return Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatPercent(amount) {
  return Intl.NumberFormat('pl-PL', {
    style: 'decimal',
    maximumSignificantDigits: '2',
    roundingMode: 'expand',
  }).format(amount);
}
