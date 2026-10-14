import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { company } from "@/data/company";

export type AppointmentPdfInput = {
  reference: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  receivedAt: string;
};

export function createAppointmentPdf(input: AppointmentPdfInput): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 48 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    // Header
    doc.rect(0, 0, doc.page.width, 90).fill("#0a0a0f");

    const emblemPath = path.join(process.cwd(), "public", "branding", "bsq-emblem-dark.png");
    if (fs.existsSync(emblemPath)) {
      doc.image(emblemPath, 48, 20, { width: 50, height: 50 });
      doc.fillColor("#e1122d").fontSize(18).font("Helvetica-Bold").text("BERKELEY SQUARE CAPITAL", 108, 32);
      doc.fillColor("#ffffff").fontSize(10).font("Helvetica").text("Appointment Request", 108, 54);
    } else {
      doc.fillColor("#e1122d").fontSize(22).font("Helvetica-Bold").text("BERKELEY SQUARE CAPITAL", 48, 34);
      doc.fillColor("#ffffff").fontSize(11).font("Helvetica").text("Appointment Request", 48, 62);
    }

    doc.y = 130;
    doc.fillColor("#e1122d").fontSize(10).text("CONFIRMATION DETAILS", doc.page.width - doc.page.margins.right, doc.y, { align: "right" });

    doc.moveDown(1.5);

    const rows: [string, string][] = [
      ["Reference", input.reference],
      ["Name", input.name],
      ["Email", input.email],
      ["Phone", input.phone],
      ["Service", input.service],
      ["Received", new Date(input.receivedAt).toLocaleString()]
    ];

    rows.forEach(([label, value], index) => {
      const y = doc.y;
      if (index % 2 === 0) {
        doc.rect(doc.page.margins.left, y, doc.page.width - doc.page.margins.left - doc.page.margins.right, 26).fill("#f4f4f5");
      }
      doc.fillColor("#71717a").fontSize(10).font("Helvetica-Bold").text(label.toUpperCase(), 48, y + 8);
      doc.fillColor("#18181b").fontSize(11).font("Helvetica").text(value, 200, y + 8);
      doc.moveDown();
    });

    // Footer
    doc.y = doc.page.height - 70;
    doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).strokeColor("#e4e4e7").stroke();
    doc.fillColor("#a1a1aa").fontSize(9).text(company.address, 48, doc.y + 10);
    doc.text(`${company.phone}  |  ${company.email}`, 48, doc.y + 24);

    doc.end();
  });
}