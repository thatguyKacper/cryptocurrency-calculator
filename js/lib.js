const endpoint = 'https://api.coingecko.com/api/v3/simple/price';

export async function fetchRates(ids = 'bitcoin', vs_currencies = 'usd') {
  const res = await fetch(
    `${endpoint}?ids=${ids}&vs_currencies=${vs_currencies}&include_24hr_change=true`
  );
  const rates = await res.json();
  return rates;
}

export async function convert(amount, name, price) {
  const rates = await fetchRates(name, price);
  const rate = rates[name][price];
  const change24 = rates[name][`${price}_24h_change`];
  const convertedAmount = rate * amount;
  return [convertedAmount, change24];
}
