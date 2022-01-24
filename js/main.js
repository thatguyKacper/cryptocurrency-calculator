import { generateOptionsCrypto, generateOptionsFiat } from './utils.js';
import { crypto, fiat } from './currencies.js';
import { handleForm } from './handlers.js';
import { fromSelect, toSelect } from './elements.js';

const form = document.querySelector('.container form');

const optionsCrypto = generateOptionsCrypto(crypto);
const optionsFiat = generateOptionsFiat(fiat);

fromSelect.innerHTML = optionsCrypto;
toSelect.innerHTML = optionsFiat;

form.addEventListener('input', handleForm);
