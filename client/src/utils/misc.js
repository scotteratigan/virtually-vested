function formatCash(pennies) {
  // accepts input in pennies, outputs as formatted string: $ 1,534.99
  if (!pennies) return '';
  return (pennies / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function formatQuotedPrice(dollars) {
  if (!dollars) return '';
  return parseFloat(dollars).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

module.exports = { formatCash, formatQuotedPrice };
