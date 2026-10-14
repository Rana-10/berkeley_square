import type { Address, LoanApplication } from "@/types/loan";

export const emptyAddress: Address = {
  line1: "",
  line2: "",
  line3: "",
  town: "",
  county: "",
  postcode: "",
  country: "United Kingdom"
};

export const defaultApplication: LoanApplication = {
  personalInformation: {
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  },
  securityInformation: {
    transactionType: "",
    address: emptyAddress,
    estimatedValue: "",
    loanAmountRequired: "",
    propertyUse: "",
    repaymentMethod: "",
    currentMortgageBalance: "",
    purchasePrice: "",
    notes: ""
  },
  declaration: {
    confirmation: false,
    submittedBy: ""
  }
};
