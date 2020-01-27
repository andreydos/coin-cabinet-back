const constEnums = require("./const-enums");

function getRandomArbitrary (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
function getRandomArbitraryWithDecimals (min, max, decimalPlaces = 2) {
  const rand = Math.random() * (max - min) + min;
  const power = 10 ** decimalPlaces;
  return Math.floor(rand * power) / power;
}

function getRandomColor () {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

module.exports = {
  generateFakeWallets (count) {
    const wallets = [];
    const currenciesIsoNames = Object.keys(constEnums.Currency);
    for (let i = 0; count > i; i += 1) {
      const randomIsoName = currenciesIsoNames[
        getRandomArbitrary(0, currenciesIsoNames.length - 1)
      ];
      wallets.push({
        id: i,
        name: `name_${i}`,
        currency: randomIsoName,
        amount: getRandomArbitraryWithDecimals(0, 1000),
        color: getRandomColor(),
        isEnabled: Math.random() > 0.2,
      });
    }
    return wallets;
  },
};
