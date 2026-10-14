import assert from "node:assert/strict";
import test from "node:test";
import { loanApplicationSchema } from "./validation";

const baseApplication = {
  personalInformation: {
    firstName: "Amina",
    lastName: "Khan",
    email: "amina@example.com",
    phone: "+44 7930 000000"
  },
  securityInformation: {
    transactionType: "Purchase",
    address: {
      line1: "1 Berkeley Square",
      line2: "",
      line3: "",
      town: "London",
      county: "",
      postcode: "W1J 6BD",
      country: "United Kingdom"
    },
    estimatedValue: "1500000",
    loanAmountRequired: "750000",
    propertyUse: "Residential",
    currentMortgageBalance: "",
    purchasePrice: "1500000",
    notes: ""
  },
  declaration: {
    confirmation: true,
    submittedBy: "Amina Khan"
  }
};

test("accepts a short purchase loan application", () => {
  const result = loanApplicationSchema.safeParse(baseApplication);
  assert.equal(result.success, true);
});

test("accepts optional property details when contact and transaction type are present", () => {
  const result = loanApplicationSchema.safeParse({
    ...baseApplication,
    personalInformation: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "+44 7930 000000"
    },
    securityInformation: {
      ...baseApplication.securityInformation,
      address: {
        line1: "",
        line2: "",
        line3: "",
        town: "",
        county: "",
        postcode: "",
        country: ""
      },
      estimatedValue: "",
      loanAmountRequired: "",
      propertyUse: "",
      purchasePrice: "",
      notes: ""
    },
    declaration: {
      confirmation: false,
      submittedBy: ""
    }
  });

  assert.equal(result.success, true);
});

test("requires either an email address or phone number", () => {
  const result = loanApplicationSchema.safeParse({
    ...baseApplication,
    personalInformation: {
      firstName: "Amina",
      lastName: "Khan",
      email: "",
      phone: ""
    }
  });

  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.error.issues[0]?.message, "Enter an email address or phone number");
  }
});
