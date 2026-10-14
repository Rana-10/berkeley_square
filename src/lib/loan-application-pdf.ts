import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { company } from "@/data/company";
import type { LoanApplication } from "@/types/loan";

export type LoanPdfInput = {
  reference: string;
  receivedAt: string;
  application: LoanApplication;
};

const MARGIN = 48;
const COL_LABEL = MARGIN + 12;
const COL_VALUE = MARGIN + 220;
const ROW_H = 22;

const label = (value: string | undefined): string => (value && value.trim() ? value : "-");

const currency = (value: string | undefined): string => {
  if (!value || !value.trim()) return "-";
  const clean = value.replace(/[^0-9.]/g, "");
  const n = Number(clean);
  if (Number.isNaN(n)) return value;
  return `£${n.toLocaleString("en-GB")}`;
};

function sectionTitle(doc: PDFKit.PDFDocument, text: string) {
  if (doc.y > doc.page.height - 140) doc.addPage();
  doc.moveDown(1);
  doc.fillColor("#e1122d").fontSize(12).font("Helvetica-Bold").text(text.toUpperCase());
  doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).lineWidth(1.4).strokeColor("#e1122d").stroke();
  doc.moveDown(0.5);
}

function tableRow(doc: PDFKit.PDFDocument, text: string, value: string, shade: boolean) {
  if (doc.y > doc.page.height - 90) doc.addPage();
  const y = doc.y;
  if (shade) {
    doc.rect(doc.page.margins.left, y, doc.page.width - doc.page.margins.left - doc.page.margins.right, ROW_H).fill("#f4f4f5");
  }
  doc.fillColor("#71717a").fontSize(9).font("Helvetica-Bold").text(text, COL_LABEL, y + 6, { width: 190, height: ROW_H, ellipsis: true });
  doc.fillColor("#18181b").fontSize(10).font("Helvetica").text(value, COL_VALUE, y + 5, {
    width: doc.page.width - COL_VALUE - MARGIN,
    lineBreak: false
  });
  doc.y = y + ROW_H;
}

function formatAddress(application: LoanApplication) {
  const address = application.securityInformation.address;
  return [
    address.line1,
    address.line2,
    address.line3,
    address.town,
    address.county,
    address.postcode,
    address.country
  ].filter(Boolean).join(", ") || "-";
}

export function createLoanApplicationPdf(input: LoanPdfInput): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: MARGIN });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.rect(0, 0, doc.page.width, 90).fill("#0a0a0f");

    const emblemPath = path.join(process.cwd(), "public", "branding", "bsq-emblem-dark.png");
    if (fs.existsSync(emblemPath)) {
      doc.image(emblemPath, MARGIN, 20, { width: 50, height: 50 });
      doc.fillColor("#e1122d").fontSize(18).font("Helvetica-Bold").text("BERKELEY SQUARE CAPITAL", MARGIN + 60, 32);
      doc.fillColor("#ffffff").fontSize(10).font("Helvetica").text("Loan Application", MARGIN + 60, 54);
    } else {
      doc.fillColor("#e1122d").fontSize(20).font("Helvetica-Bold").text("BERKELEY SQUARE CAPITAL", MARGIN, 34);
      doc.fillColor("#ffffff").fontSize(11).font("Helvetica").text("Loan Application", MARGIN, 62);
    }

    doc.y = 120;
    doc.fillColor("#18181b").fontSize(11).font("Helvetica-Bold").text(`Reference: ${input.reference}`);
    doc.fillColor("#71717a").fontSize(9).text(`Received: ${new Date(input.receivedAt).toLocaleString()}`);
    doc.moveDown(0.6);

    const app = input.application;
    let shade = false;

    sectionTitle(doc, "1. Personal Information");
    tableRow(doc, "Name", `${label(app.personalInformation.firstName)} ${label(app.personalInformation.lastName)}`, shade = !shade);
    tableRow(doc, "Email", label(app.personalInformation.email), shade = !shade);
    tableRow(doc, "Phone", label(app.personalInformation.phone), shade = !shade);

    sectionTitle(doc, "2. Security Information");
    tableRow(doc, "Transaction type", label(app.securityInformation.transactionType), shade = !shade);
    tableRow(doc, "Property address", formatAddress(app), shade = !shade);
    tableRow(doc, "Estimated value", currency(app.securityInformation.estimatedValue), shade = !shade);
    tableRow(doc, "Loan amount required", currency(app.securityInformation.loanAmountRequired), shade = !shade);
    tableRow(doc, "Property use", label(app.securityInformation.propertyUse), shade = !shade);
    if (app.securityInformation.transactionType === "Purchase") {
      tableRow(doc, "Purchase price", currency(app.securityInformation.purchasePrice), shade = !shade);
    }
    if (app.securityInformation.transactionType === "Refinance") {
      tableRow(doc, "Current mortgage balance", currency(app.securityInformation.currentMortgageBalance), shade = !shade);
    }
    tableRow(doc, "Notes", label(app.securityInformation.notes), shade = !shade);

    sectionTitle(doc, "3. Declaration");
    tableRow(doc, "Submitted by", label(app.declaration.submittedBy), shade = !shade);
    tableRow(doc, "Confirmed accuracy", app.declaration.confirmation ? "Yes" : "No", shade = !shade);

    doc.y = doc.page.height - 70;
    doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).strokeColor("#e4e4e7").stroke();
    doc.fillColor("#a1a1aa").fontSize(9).text(company.address, MARGIN, doc.y + 10);
    doc.text(`${company.phone}  |  ${company.email}`, MARGIN, doc.y + 24);

    doc.end();
  });
}
