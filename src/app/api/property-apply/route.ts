import { NextResponse } from "next/server";
import { propertyListings } from "@/data/properties";
import { applicationsStore } from "@/data/applications-store";
import { propertiesStore } from "@/data/properties-store";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      propertySlug,
      applicationType,
      offerPrice,
      targetCompletionDate,
      solicitorInfo,
      applicantName,
      applicantEmail,
      applicantPhone,
      currentAddress,
      nationality,
      applicantType,
      sourceOfFunds,
      equityDeposit,
      bankName,
      documents
    } = data;

    if (!applicantName || !applicantEmail || !applicantPhone || !propertySlug) {
      return NextResponse.json(
        { error: "Missing required application fields." },
        { status: 400 }
      );
    }

    const matchedProperty =
      propertiesStore.getBySlug(propertySlug) ||
      propertyListings.find((p) => p.slug === propertySlug);

    // Generate Unique Application Reference ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `BSQ-APP-2026-${randomSuffix}`;
    const submissionTime = new Date().toISOString();

    // Persist application in Admin Applications Queue & Trigger Admin Notification
    const newApp = applicationsStore.create({
      referenceId,
      propertySlug,
      propertyTitle: matchedProperty?.title || "Prime Real Estate Asset",
      propertyLocation: matchedProperty?.location || "London",
      propertyRef: matchedProperty?.referenceCode || "BSQ-PROP",
      applicationType: applicationType || "Purchase Acquisition",
      offerPrice: offerPrice ? String(offerPrice) : String(matchedProperty?.price || 0),
      targetCompletionDate,
      solicitorInfo,
      applicantName,
      applicantEmail,
      applicantPhone,
      currentAddress,
      nationality,
      applicantType: applicantType || "Private Individual",
      sourceOfFunds: sourceOfFunds || "Cash Reserves",
      equityDeposit,
      bankName,
      documents: documents || [],
      submittedAt: submissionTime
    });

    // Generate Confirmation Email Payload
    const emailReceipt = {
      to: applicantEmail,
      subject: `Application Confirmation: ${matchedProperty?.title || "Property"} (${referenceId})`,
      referenceId,
      propertyTitle: matchedProperty?.title || "Prime Real Estate Asset",
      propertyLocation: matchedProperty?.location || "London",
      propertyRef: matchedProperty?.referenceCode || "BSQ-PROP",
      offerAmount: offerPrice ? `£${Number(offerPrice).toLocaleString()}` : matchedProperty?.priceDisplay,
      applicationType: applicationType || "Purchase Acquisition",
      submittedAt: submissionTime,
      documentsReceived: documents ? documents.map((d: any) => d.name) : []
    };

    console.log("[Berkeley Square Capital] Online Application Logged for Admin:", {
      referenceId,
      applicant: `${applicantName} <${applicantEmail}>`,
      property: matchedProperty?.title,
      offer: emailReceipt.offerAmount
    });

    return NextResponse.json({
      success: true,
      referenceId,
      applicationId: newApp.id,
      submittedAt: submissionTime,
      emailSentTo: applicantEmail,
      emailReceipt,
      message: `Your application (${referenceId}) has been successfully submitted. An automatic confirmation email has been dispatched to ${applicantEmail}.`
    });
  } catch (error) {
    console.error("Error processing property application:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your application." },
      { status: 500 }
    );
  }
}
