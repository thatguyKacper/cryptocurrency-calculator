const form = document.querySelector('.app form');
const fromInput = document.querySelector('[name="from_amount"]');
const fromSelect = document.querySelector('[name="from_currency"]');
const toSelect = document.querySelector('[name="to_currency"]');
const toEl = document.querySelector('.to_amount');
const toChange = document.querySelector('[class="to_amount change"]');
const endpoint = 'https://api.coingecko.com/api/v3/simple/price';

const crypto = {
  bitcoin: 'Bitcoin', //Bitcoin btc
  ethereum: 'Ethereum', //Ethereum eth
  litecoin: 'Litecoin', //Litecoin ltc
  // bch: 'bitcoin-cash', //Bitcoin Cash bch
  binancecoin: 'Binance Coin', //Binance Coin bnb
  eos: 'Eos.io', //EOS.io eos
  ripple: 'Ripple', //Ripple xrp
  stellar: 'Stellar', //Lumens | Stellar xlm
  chainlink: 'Chainlink', //Chainlink link
  polkadot: 'Polkadot', //Polkadot dot
  // yfi: 'yearn-finance', //Yearn.finance yfi
  bitswift: 'Bitswift', //Bits bits
  // sats: 'Baby Satoshi', //Satoshi sats
};

const fiat = {
  usd: 'US Dollar',
  aed: 'United Arab Emirates Dirham',
  ars: 'Argentine Peso',
  aud: 'Australian Dollar',
  bdt: 'Bangladeshi Taka',
  bhd: 'Bahraini Dinar',
  bmd: 'Bermudian Dollar',
  brl: 'Brazil Real',
  cad: 'Canadian Dollar',
  chf: 'Swiss Franc',
  clp: 'Chilean Peso',
  cny: 'Chinese Yuan',
  czk: 'Czech Koruna',
  dkk: 'Danish Krone',
  eur: 'Euro',
  gbp: 'British Pound Sterling',
  hkd: 'Hong Kong Dollar',
  huf: 'Hungarian Forint',
  idr: 'Indonesian Rupiah',
  ils: 'Israeli New Shekel',
  inr: 'Indian Rupee',
  jpy: 'Japanese Yen',
  krw: 'South Korean Won',
  kwd: 'Kuwaiti Dinar',
  lkr: 'Sri Lankan Rupee',
  mmk: 'Burmese Kyat',
  mxn: 'Mexican Peso',
  myr: 'Malaysian Ringgit',
  ngn: 'Nigerian Naira',
  nok: 'Norwegian Krone',
  nzd: 'New Zealand Dollar',
  php: 'Philippine Peso',
  pkr: 'Pakistani Rupee',
  pln: 'Polish Zloty',
  rub: 'Russian Ruble',
  sar: 'Saudi Riyal',
  sek: 'Swedish Krona',
  sgd: 'Singapore Dollar',
  thb: 'Thai Baht',
  try: 'Turkish Lira',
  twd: 'New Taiwan Dollar',
  uah: 'Ukrainian hryvnia',
  vef: 'Venezuelan bolívar fuerte',
  vnd: 'Vietnamese đồng',
  zar: 'South African Rand',
  xdr: 'IMF Special Drawing Rights',
  xag: 'Silver - Troy Ounce',
  xau: 'Gold - Troy Ounce',
};

function generateOptionsCrypto(options) {
  return Object.entries(options)
    .map(([currencyKey, currencyValue]) => {
      return `<option value="${currencyKey}">${currencyValue}</option>`;
    })
    .join('');
}

function generateOptionsFiat(all) {
  return Object.entries(all)
    .map(([currencyKey, currencyValue]) => {
      return `<option value="${currencyKey}">${currencyValue}</option>`;
    })
    .join('');
}

async function fetchRates(ids = 'bitcoin', vs_currencies = 'usd') {
  const res = await fetch(
    `${endpoint}?ids=${ids}&vs_currencies=${vs_currencies}&include_24hr_change=true`
  );
  const rates = await res.json();
  // console.log(rates);
  return rates;
}

async function convert(amount, name, price) {
  const rates = await fetchRates(name, price);
  // console.log(rates);
  const rate = rates[name][price];
  const change24 = rates[name][`${price}_24h_change`];
  // console.log(rate);
  const convertedAmount = rate * amount;
  // console.log(`${amount} ${name} is ${convertedAmount} in ${price}`);
  return [convertedAmount, change24];
}

function formatCurrency(amount, currency) {
  return Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
  }).format(amount);
}

async function handleForm(e) {
  const rawAmount = await convert(
    fromInput.value,
    fromSelect.value,
    toSelect.value
  );

  toEl.textContent = formatCurrency(rawAmount[0], toSelect.value);
  toChange.textContent = `${formatPercent(rawAmount[1])} %`;
}

const optionsCrypto = generateOptionsCrypto(crypto);
const optionsFiat = generateOptionsFiat(fiat);

fromSelect.innerHTML = optionsCrypto;
toSelect.innerHTML = optionsFiat;

form.addEventListener('input', handleForm);
