import { convert } from './lib.js';
import { formatCurrency, formatPercent } from './utils.js';
import { fromInput, fromSelect, toSelect, toEl, toChange } from './elements.js';

export async function handleForm(e) {
  const rawAmount = await convert(
    fromInput.value,
    fromSelect.value,
    toSelect.value
  );

  toEl.textContent = formatCurrency(rawAmount[0], toSelect.value);
  toChange.textContent = `${formatPercent(rawAmount[1])} %`;
}
