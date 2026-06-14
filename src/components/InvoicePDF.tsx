import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { GBP_TO_JPY_RATE } from "@/lib/currency";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: "2px solid #d4af37",
  },
  logo: {
    width: 120,
    height: "auto",
  },
  companyInfo: {
    textAlign: "right",
    fontSize: 9,
    lineHeight: 1.5,
  },
  companyName: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#2c2c2c",
    marginBottom: 5,
  },
  invoiceTitle: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: "#2c2c2c",
    marginBottom: 20,
  },
  invoiceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  detailsBox: {
    width: "48%",
  },
  detailsLabel: {
    fontSize: 8,
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 3,
    fontFamily: "Helvetica-Bold",
  },
  detailsValue: {
    fontSize: 10,
    marginBottom: 8,
  },
  detailsValueBold: {
    fontSize: 10,
    marginBottom: 8,
    fontFamily: "Helvetica-Bold",
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#2c2c2c",
    marginBottom: 10,
    marginTop: 5,
  },
  table: {
    marginVertical: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderBottom: "2px solid #d4af37",
    fontFamily: "Helvetica-Bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 12,
    borderBottom: "1px solid #e5e5e5",
  },
  tableCol1: {
    width: "60%",
  },
  tableCol2: {
    width: "20%",
    textAlign: "right",
  },
  tableCol3: {
    width: "20%",
    textAlign: "right",
  },
  totalsSection: {
    marginTop: 20,
    marginLeft: "50%",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  totalLabel: {
    fontSize: 10,
  },
  totalValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
    minWidth: 100,
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderTop: "2px solid #d4af37",
  },
  grandTotalLabel: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#2c2c2c",
  },
  grandTotalValue: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#d4af37",
    textAlign: "right",
    minWidth: 100,
  },
  paymentInfo: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    paddingTop: 15,
    borderTop: "1px solid #e5e5e5",
    fontSize: 8,
    color: "#999",
    textAlign: "center",
    lineHeight: 1.5,
  },
  thankYou: {
    marginTop: 30,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#d4af37",
  },
  notes: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#fffef5",
    borderLeft: "3px solid #d4af37",
  },
});

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date | null;
  clientName: string;
  clientCompany?: string;
  clientEmail?: string;
  clientAddress?: string;
  description: string;
  amount: number;
  currency?: string;
  exchangeRate?: number;
  vatRate?: number;
  notes?: string;
}

export const InvoicePDF = ({
  invoiceNumber,
  invoiceDate,
  dueDate,
  clientName,
  clientCompany,
  clientEmail,
  clientAddress,
  description,
  amount,
  currency = "JPY",
  exchangeRate = GBP_TO_JPY_RATE,
  vatRate,
  notes,
}: InvoiceData) => {
  const subtotal = vatRate ? amount / (1 + vatRate / 100) : amount;
  const vatAmount = vatRate ? amount - subtotal : 0;

  const formatCurrency = (value: number) => {
    if (currency === "GBP") {
      const gbpFormatted = `£${value.toFixed(2)}`;
      const jpyValue = Math.round(value * exchangeRate);
      const jpyFormatted = `¥${jpyValue.toLocaleString("ja-JP")}`;
      return `${gbpFormatted} (${jpyFormatted})`;
    }
    const jpyFormatted = `¥${Math.round(value).toLocaleString("ja-JP")}`;
    const gbpValue = value / exchangeRate;
    const gbpFormatted = `£${gbpValue.toFixed(2)}`;
    return `${jpyFormatted} (${gbpFormatted})`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.companyName}>JapWorld</Text>
            <Text style={{ fontSize: 11, color: "#666", marginBottom: 10 }}>
              Premium Japanese Vehicle Import
            </Text>
          </View>
          <View style={styles.companyInfo}>
            <Text>JapWorld</Text>
            <Text>Chiba-ken, Narita-shi</Text>
            <Text>Taka 478-1, Japan</Text>
            <Text style={{ marginTop: 5 }}>Email: Japworldofficial@gmail.com</Text>
            <Text>Tel: +81 70-5555-2370</Text>
            <Text>Web: www.japworld.co.uk</Text>
          </View>
        </View>

        {/* Invoice Title */}
        <Text style={styles.invoiceTitle}>INVOICE</Text>

        {/* Invoice & Client Details */}
        <View style={styles.invoiceDetails}>
          {/* Left: Bill To */}
          <View style={styles.detailsBox}>
            <Text style={styles.sectionTitle}>BILL TO</Text>
            <Text style={styles.detailsValueBold}>{clientCompany || clientName}</Text>
            {clientCompany && <Text style={styles.detailsValue}>{clientName}</Text>}
            {clientEmail && <Text style={styles.detailsValue}>{clientEmail}</Text>}
            {clientAddress && <Text style={styles.detailsValue}>{clientAddress}</Text>}
          </View>

          {/* Right: Invoice Details */}
          <View style={styles.detailsBox}>
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.detailsLabel}>Invoice Number</Text>
              <Text style={styles.detailsValueBold}>{invoiceNumber}</Text>
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.detailsLabel}>Invoice Date</Text>
              <Text style={styles.detailsValue}>{format(invoiceDate, "dd MMMM yyyy")}</Text>
            </View>
            {dueDate && (
              <View style={{ marginBottom: 8 }}>
                <Text style={styles.detailsLabel}>Due Date</Text>
                <Text style={styles.detailsValue}>{format(dueDate, "dd MMMM yyyy")}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCol1}>Description</Text>
            <Text style={styles.tableCol2}>Qty</Text>
            <Text style={styles.tableCol3}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol1}>{description}</Text>
            <Text style={styles.tableCol2}>1</Text>
            <Text style={styles.tableCol3}>{formatCurrency(subtotal)}</Text>
          </View>
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          {vatRate && vatRate > 0 ? (
            <>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>{formatCurrency(subtotal)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>VAT ({vatRate}%)</Text>
                <Text style={styles.totalValue}>{formatCurrency(vatAmount)}</Text>
              </View>
            </>
          ) : null}
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total Amount Due</Text>
            <Text style={styles.grandTotalValue}>{formatCurrency(amount)}</Text>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.paymentInfo}>
          <Text style={[styles.sectionTitle, { marginTop: 0 }]}>PAYMENT INFORMATION</Text>
          <Text style={{ marginBottom: 5 }}>
            Please make payment to the following bank account:
          </Text>
          <Text style={{ marginBottom: 3, fontFamily: "Helvetica-Bold" }}>Bank: Lloyds Bank</Text>
          <Text style={{ marginBottom: 3 }}>Account Name: JapWorld Limited</Text>
          <Text style={{ marginBottom: 3 }}>Sort Code: 30-00-00</Text>
          <Text style={{ marginBottom: 3 }}>Account Number: 12345678</Text>
          <Text style={{ marginTop: 8, fontSize: 9, color: "#666" }}>
            Please include invoice number {invoiceNumber} as payment reference
          </Text>
          <Text style={{ marginTop: 8, fontSize: 8, color: "#999", fontStyle: "italic" }}>
            * Secondary currency shown for reference (Exchange rate: £1 = ¥{exchangeRate % 1 === 0 ? exchangeRate : exchangeRate.toFixed(2)}).
            Invoiced amount is in {currency}.
          </Text>
        </View>

        {/* Notes */}
        {notes && (
          <View style={styles.notes}>
            <Text style={{ fontFamily: "Helvetica-Bold", marginBottom: 5 }}>NOTES:</Text>
            <Text>{notes}</Text>
          </View>
        )}

        {/* Thank You */}
        <Text style={styles.thankYou}>Thank you for your business!</Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>JapWorld Limited | Company Registration No. 12345678 | VAT No. GB123456789</Text>
          <Text style={{ marginTop: 3 }}>
            This invoice is payable within {dueDate ? "the due date specified" : "30 days"}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
