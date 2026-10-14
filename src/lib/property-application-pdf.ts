import PDFDocument from "pdfkit";
import { company } from "@/data/company";
import type { Application } from "@/schema";

export function createPropertyApplicationPdf(application: Application): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 48 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.rect(0, 0, doc.page.width, 90).fill("#0a0a0f");
    doc.fillColor("#e1122d").fontSize(22).font("Helvetica-Bold").text("BERKELEY SQUARE CAPITAL", 48, 34);
    doc.fillColor("#ffffff").fontSize(11).font("Helvetica").text("Property Application", 48, 62);

    doc.y = 120;
    doc.fillColor("#18181b").fontSize(11).font("Helvetica-Bold").text(`Application ID: ${application.id}`);
    doc.fillColor("#71717a").fontSize(9).text(`Submitted: ${new Date(application.submitted_at).toLocaleString()}`);
    doc.moveDown(1);

    const rows: [string, string][] = [
      ["Property", application.property?.title ?? "Property"],
      ["Status", application.status],
      ["Applicant", `${application.guest_first_name} ${application.guest_last_name}`],
      ["Email", application.guest_email],
      ["Phone", application.guest_phone_number],
      ["Current address", application.guest_current_address],
      ["Message", application.message_from_applicant || "No applicant message."],
      ["Document URLs", (application.guest_document_upload_urls ?? []).join(", ") || "None"],
    ];

    rows.forEach(([label, value], index) => {
      const y = doc.y;
      const height = Math.max(28, doc.heightOfString(value, { width: 330 }) + 14);
      if (doc.y > doc.page.height - 110) doc.addPage();
      if (index % 2 === 0) {
        doc.rect(doc.page.margins.left, doc.y, doc.page.width - doc.page.margins.left - doc.page.margins.right, height).fill("#f4f4f5");
      }
      doc.fillColor("#71717a").fontSize(10).font("Helvetica-Bold").text(label.toUpperCase(), 60, y + 8, { width: 130 });
      doc.fillColor("#18181b").fontSize(10.5).font("Helvetica").text(value, 200, y + 8, { width: 330 });
      doc.y = y + height;
    });

    doc.y = doc.page.height - 70;
    doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).strokeColor("#e4e4e7").stroke();
    doc.fillColor("#a1a1aa").fontSize(9).text(company.address, 48, doc.y + 10);
    doc.text(`${company.phone}  |  ${company.email}`, 48, doc.y + 24);

    doc.end();
  });
}
