async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("from-currency").value;
  const toCurrency = document.getElementById("to-currency").value;

  if (amount === "") {
    alert("Please enter an amount.");
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await res.json();
    const rate = data.rates[toCurrency];
    const converted = (amount * rate).toFixed(2);
    document.getElementById("converted-amount").value = converted;
  } catch (error) {
    alert("Error fetching currency data. Try again later.");
    console.error(error);
  }
}

function toggleMode() {
  document.body.classList.toggle("light-mode");
}
