import { z } from "zod";

const required = (label: string) => z.string().trim().min(1, `${label} is required`);
const email = z.string().trim().email("Enter a valid email address");
const optionalText = z.string().optional().default("");
const optionalEmail = z.string()
  .optional()
  .default("")
  .refine((value) => !value.trim() || z.string().email().safeParse(value).success, "Enter a valid email address");
const yesNo = z.enum(["yes", "no"], { required_error: "Choose yes or no" });

const numericString = (
  label: string,
  {
    min = 0,
    max = 500_000_000,
    isCurrency = false,
    unit = ""
  }: { min?: number; max?: number; isCurrency?: boolean; unit?: string } = {}
) =>
  z.string()
    .trim()
    .min(1, `${label} is required`)
    .refine((val) => {
      const clean = val.replace(/[^0-9.]/g, "");
      if (!clean) return false;
      const num = Number(clean);
      return !Number.isNaN(num) && num >= min;
    }, `${label} must be at least ${isCurrency ? `£${min.toLocaleString()}` : `${min}${unit ? ` ${unit}` : ""}`}`)
    .refine((val) => {
      const clean = val.replace(/[^0-9.]/g, "");
      if (!clean) return true;
      const num = Number(clean);
      return !Number.isNaN(num) && num <= max;
    }, `${label} cannot exceed ${isCurrency ? `£${max.toLocaleString()}` : `${max.toLocaleString()}${unit ? ` ${unit}` : ""}`}`);

const optionalNumericString = (
  label: string,
  {
    min = 0,
    max = 500_000_000,
    isCurrency = false,
    unit = ""
  }: { min?: number; max?: number; isCurrency?: boolean; unit?: string } = {}
) =>
  z.string()
    .optional()
    .default("")
    .refine((val) => {
      if (!val || !val.trim()) return true;
      const clean = val.replace(/[^0-9.]/g, "");
      if (!clean) return true;
      const num = Number(clean);
      return !Number.isNaN(num) && num >= min && num <= max;
    }, `${label} must be between ${isCurrency ? `£${min.toLocaleString()}` : `${min}${unit ? ` ${unit}` : ""}`} and ${isCurrency ? `£${max.toLocaleString()}` : `${max.toLocaleString()}${unit ? ` ${unit}` : ""}`}`);

export const addressSchema = z.object({
  line1: required("Address line 1"),
  line2: optionalText,
  line3: optionalText,
  town: required("Town or city"),
  county: optionalText,
  postcode: required("Postcode"),
  country: required("Country")
});

export const appointmentSchema = z.object({
  name: required("Full name"),
  email,
  phone: required("Phone number"),
  service: z.string().trim().min(1, "Select a service")
});

export const contactSchema = z.object({
  name: optionalText,
  email,
  landline: required("Landline"),
  mobile: optionalText
});

export const companyDetailsSchema = z.object({
  companyName: required("Company name"),
  registrationNumber: required("Company registration number"),
  countryOfIncorporation: required("Country of incorporation"),
  registeredAddress: addressSchema
});

export const applicantSchema = z.object({
  title: required("Title"),
  firstName: required("First name"),
  lastName: required("Last name"),
  previousNames: optionalText,
  dateOfBirth: required("Date of birth"),
  countryOfBirth: required("Country of birth"),
  nationality: required("Nationality"),
  maritalStatus: required("Marital status"),
  passportNumber: z.string().trim().min(5, "Enter a valid passport number"),
  contact: contactSchema.extend({ mobile: required("Mobile") }),
  currentAddress: addressSchema,
  livedLessThanThreeYears: yesNo,
  previousAddress: addressSchema.partial().required({ line1: true, town: true, postcode: true, country: true }),
  residentialStatus: required("Residential status"),
  permanentUkRight: yesNo,
  yearsUkResident: numericString("Years as UK resident", { min: 0, max: 120, unit: "years" }),
  employmentStatus: optionalText,
  employerName: optionalText,
  employmentIndustry: optionalText,
  jobTitle: optionalText,
  grossAnnualSalary: optionalNumericString("Gross annual salary / net profit", { min: 0, max: 100_000_000, isCurrency: true }),
  businessName: optionalText,
  yearsTrading: optionalNumericString("Years trading", { min: 0, max: 120, unit: "years" }),
  otherIncome: optionalNumericString("Other income", { min: 0, max: 100_000_000, isCurrency: true }),
  otherIncomeSource: optionalText
});

export const loanApplicationSchema = z.object({
  personalInformation: z.object({
    firstName: optionalText,
    lastName: optionalText,
    email: optionalEmail,
    phone: optionalText
  }).superRefine((personal, ctx) => {
    if (!personal.email.trim() && !personal.phone.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Enter an email address or phone number",
        path: ["email"]
      });
    }
  }),
  securityInformation: z.object({
    transactionType: z.string().trim().refine((val) => val === "" || val === "Purchase" || val === "Refinance", {
      message: "Please select whether this enquiry relates to a Purchase or Refinance"
    }).optional().default(""),
    address: z.object({
      line1: optionalText,
      line2: optionalText,
      line3: optionalText,
      town: optionalText,
      county: optionalText,
      postcode: optionalText,
      country: optionalText
    }),
    estimatedValue: optionalNumericString("Estimated property value", { min: 0, max: 500_000_000, isCurrency: true }),
    loanAmountRequired: optionalNumericString("Loan amount required", { min: 0, max: 100_000_000, isCurrency: true }),
    propertyUse: optionalText,
    repaymentMethod: optionalText,
    currentMortgageBalance: optionalNumericString("Current mortgage balance", { min: 0, max: 500_000_000, isCurrency: true }),
    purchasePrice: optionalNumericString("Purchase price", { min: 0, max: 500_000_000, isCurrency: true }),
    notes: optionalText
  }),
  declaration: z.object({
    confirmation: z.boolean().optional().default(false),
    submittedBy: optionalText
  })
});

export type LoanApplicationInput = z.infer<typeof loanApplicationSchema>;
