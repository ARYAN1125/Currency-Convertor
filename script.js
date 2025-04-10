const apiKey = 'YOUR_API_KEY'; // Replace with your API key
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const result = document.getElementById('result');

// Common Currencies
const currencyList = ["USD", "EUR", "INR", "GBP", "JPY", "CAD", "AUD", "CNY", "RUB", "BRL", "KRW", "TRY", "ZAR", "MXN", "IDR", "SAR"];

currencyList.forEach(currency => {
  const optionFrom = new Option(currency, currency);
  const optionTo = new Option(currency, currency);
  fromCurrency.appendChild(optionFrom);
  toCurrency.appendChild(optionTo);
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    result.innerText = "⚠️ Enter a valid amount.";
    return;
  }

  try {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.result === "success") {
      const rate = data.conversion_rate;
      const converted = (amount * rate).toFixed(2);
      result.innerText = `${amount} ${from} = ${converted} ${to}`;
    } else {
      result.innerText = "❌ Conversion failed. Try again.";
    }
  } catch (err) {
    result.innerText = "⚠️ Error fetching data.";
  }
}
