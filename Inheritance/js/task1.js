// Create your own assign method which mimics Object.assign.

const assign = function (...args) {
  const resultObj = args[0];
  let i = 1,
    il = args.length,
    key;
  for (; i < il; i++) {
    for (key in args[i]) {
      if (args[i].hasOwnProperty(key)) {
        resultObj[key] = arguments[i][key];
      }
    }
  }
  return resultObj;
};

const paymentsCard = {
  cash: '100$'
};
const creditCard = {
  creditLimit: '50$',
  cash: '200$'
};
const creditCardVIP = {
  creditLimit: '250$',
  cash: '500$',
  cashBack: '1%'
};
const universalCard = assign({}, creditCard, paymentsCard);
const universalCardVIP = assign({}, creditCardVIP, creditCard, paymentsCard);