const PDFDocument =
  require('pdfkit');

const fs =
  require('fs');

class InvoiceService {
  generate(sale) {
    const doc =
      new PDFDocument();

    const path =
      `invoices/${sale.invoice_number}.pdf`;

    doc.pipe(
      fs.createWriteStream(path)
    );

    doc.fontSize(20)
      .text(
        'POS Invoice'
      );

    doc.moveDown();

    doc.text(
      `Invoice: ${sale.invoice_number}`
    );

    doc.text(
      `Total: ₹${sale.total}`
    );

    doc.end();

    return path;
  }
}

module.exports =
  new InvoiceService();