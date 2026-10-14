export type Address = {
  line1: string;
  line2: string;
  line3: string;
  town: string;
  county: string;
  postcode: string;
  country: string;
};

export type LoanApplication = {
  personalInformation: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  securityInformation: {
    transactionType: "Purchase" | "Refinance" | "";
    address: Address;
    estimatedValue: string;
    loanAmountRequired: string;
    propertyUse: string;
    repaymentMethod?: string;
    currentMortgageBalance: string;
    purchasePrice: string;
    notes: string;
  };
  declaration: {
    confirmation: boolean;
    submittedBy: string;
  };
};
