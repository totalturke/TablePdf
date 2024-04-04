window.function = function(jsonInvoiceData) {
  // Parse the input JSON string
  const invoiceData = JSON.parse(jsonInvoiceData.value ?? "{}");

  // Start with the static parts of your invoice HTML
  let html = `<!DOCTYPE html><html><head><style>body { font-family: Arial, sans-serif; }.invoice-box {max-width: 800px;margin: auto;padding: 30px;border: 1px solid #eee;box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);font-size: 16px;line-height: 24px;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;color: #555;}.invoice-box table {width: 100%;line-height: inherit;text-align: left;}.invoice-box table td {padding: 5px;vertical-align: top;}.invoice-box table tr td:nth-child(2) {text-align: right;}.invoice-box table tr.heading td {background: #eee;border-bottom: 1px solid #ddd;font-weight: bold;}.invoice-box table tr.item td {border-bottom: 1px solid #eee;}.invoice-box table tr.total td:nth-child(2) {border-top: 2px solid #eee;font-weight: bold;}</style></head><body><div class="invoice-box"><table cellpadding="0" cellspacing="0"><tr class="heading"><td>Item</td><td>Qty</td><td>Rate</td><td>Price</td></tr>`;

  // Dynamically add rows for each item
  invoiceData.items.forEach((item, index) => {
    html += `<tr class="item ${index === invoiceData.items.length - 1 ? 'last' : ''}"><td>${item.description}</td><td>${item.qty}</td><td>$${parseFloat(item.rate).toFixed(2)}</td><td>$${(item.qty * item.rate).toFixed(2)}</td></tr>`;
  });

  // Calculate totals
  let subtotal = invoiceData.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  let tax = subtotal * invoiceData.taxRate;
  let totalDue = subtotal + tax - invoiceData.paid;

  // Add subtotal, tax, paid, and total due rows
  html += `<tr class="total"><td></td><td></td><td>Subtotal</td><td>$${subtotal.toFixed(2)}</td></tr><tr class="total"><td></td><td></td><td>Tax</td><td>$${tax.toFixed(2)}</td></tr><tr class="total"><td></td><td></td><td>Paid</td><td>$${invoiceData.paid.toFixed(2)}</td></tr><tr class="total"><td></td><td></td><td>Total Due</td><td>$${totalDue.toFixed(2)}</td></tr></table></div></body></html>`;

  // Return the complete HTML as a string
  return html;
}
