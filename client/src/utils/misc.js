function formatCash(pennies) {
  // accepts input in pennies, outputs as formatted string: $ 1,534.99
  return (pennies / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

module.exports = { formatCash };
