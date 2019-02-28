
function formatCash(pennies) {
  // accepts input in pennies, outputs as formatted string: $ 1,534.99
  return (pennies / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

module.exports = { formatCash };
// formatCash(100);
// formatCash(123);
// formatCash(-1234);
// formatCash(12345);
// formatCash(123456);
// formatCash(-1234567);
// console.log(formatCash(10000000));