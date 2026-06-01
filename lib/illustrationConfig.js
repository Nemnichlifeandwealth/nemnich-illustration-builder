/* =========================================================
   ILLUSTRATION CONFIG: CARRIERS
========================================================= */

export const carriers = {
  Ameritas: {
    name: "Ameritas",
    logo: "/carriers/ameritas-logo.png",
  },
};

/* =========================================================
   ILLUSTRATION CONFIG: DEFAULT BRAND SETTINGS
========================================================= */

export const defaultBrand = {
  businessName: "Nemnich Life & Wealth",
  tagline: "Protected Growth • Retirement Income • Life Insurance",
  advisorName: "Charles Nemnich",
  phone: "314.737.0520",
  email: "charles@nemnichlifeandwealth.com",
  website: "",
  primaryColor: "#111827",
  accentColor: "#C7A95B",
  headerBackgroundColor: "#111827",
  pageBackgroundColor: "#F3F4F6",
  logoText: "NLW",
  logoImage: "",
};

/* =========================================================
   ILLUSTRATION CONFIG: DEFAULT CUSTOMIZATION SETTINGS
========================================================= */

export const defaultCustomization = {
  fontFamily: "Inter, Arial, sans-serif",

  login: {
    background: "#0F172A",
    cardBackground: "rgba(255,255,255,0.08)",
    titleColor: "#FFFFFF",
    subtitleColor: "#D1D5DB",
    labelColor: "#E5E7EB",
    helpTextColor: "#E5E7EB",
    buttonBackground: "#C7A95B",
    buttonText: "#111827",
    tabActiveBackground: "#FFFFFF",
    tabActiveText: "#111827",
    tabInactiveText: "#FFFFFF",
    logoPath: "/nlw-logo.png",
    logoRoundness: "16px",
    cardRoundness: "24px",
    inputRoundness: "12px",
    buttonRoundness: "12px",
  },

  previewHeader: {
    background: "#111827",
    titleColor: "#FFFFFF",
    subtitleColor: "rgba(255,255,255,0.8)",
    badgeBackground: "rgba(255,255,255,0.1)",
    badgeTextColor: "#FFFFFF",
    carrierBoxBackground: "#FFFFFF",
    carrierTextColor: "#111827",
    logoRoundness: "16px",
    carrierLogoRoundness: "8px",
    titleSize: "36px",
    subtitleSize: "14px",
  },

  clientGoal: {
    background: "#F9FAFB",
    titleColor: "#C7A95B",
    textColor: "#111827",
    titleSize: "14px",
    textSize: "18px",
    roundness: "24px",
  },

  strategyPurpose: {
    background: "#F9FAFB",
    titleColor: "#C7A95B",
    textColor: "#111827",
    titleSize: "14px",
    textSize: "14px",
    roundness: "24px",
  },

  mainPolicyPoints: {
    background: "#FFFFFF",
    titleColor: "#111827",
    textColor: "#111827",
    bulletColor: "#C7A95B",
    titleSize: "20px",
    textSize: "14px",
    roundness: "24px",
  },

  policyDetails: {
    background: "#FFFFFF",
    titleColor: "#111827",
    labelColor: "#6B7280",
    valueColor: "#111827",
    rowBackground: "#F9FAFB",
    titleSize: "20px",
    textSize: "14px",
    roundness: "24px",
    rowRoundness: "12px",
  },

  comparison: {
    background: "#FFFFFF",
    titleColor: "#111827",
    tableHeaderBackground: "#F3F4F6",
    textColor: "#111827",
    titleSize: "20px",
    textSize: "14px",
    roundness: "24px",
  },

  disclosure: {
    background: "#FFFBEB",
    borderColor: "#FDE68A",
    titleColor: "#78350F",
    textColor: "#78350F",
    titleSize: "14px",
    textSize: "14px",
    roundness: "24px",
  },

  footer: {
    textColor: "#6B7280",
    strongTextColor: "#111827",
    textSize: "14px",
  },
};

/* =========================================================
   ILLUSTRATION CONFIG: PRODUCT TEMPLATES
========================================================= */

export const productTemplates = {
  "Fixed Indexed Annuity": {
    goal: "Protected, tax-deferred growth with future income potential.",
    mainPoints: [
      "Protects principal from direct market losses",
      "Allows tax-deferred accumulation",
      "Can create a predictable retirement income stream",
      "Offers beneficiary options",
      "May include optional income or enhanced benefit riders",
    ],
    fields: [
      "Initial Premium",
      "Additional Premium",
      "Bonus",
      "Surrender Period",
      "Index Strategy",
      "Participation Rate",
      "Cap Rate",
      "Floor",
      "Income Rider",
      "Estimated Income Start Date",
      "Estimated Annual Income",
    ],
  },

  "Income Annuity": {
    goal: "Convert a lump sum into a dependable income stream.",
    mainPoints: [
      "Creates guaranteed income based on carrier terms",
      "Can help reduce longevity risk",
      "Simplifies retirement cash flow planning",
      "May provide beneficiary or period-certain options",
      "Often used when income certainty is more important than liquidity",
    ],
    fields: [
      "Premium Amount",
      "Income Start Date",
      "Payout Option",
      "Monthly Income",
      "Annual Income",
      "Period Certain",
      "Beneficiary Option",
      "Liquidity Feature",
    ],
  },

  "Indexed Universal Life": {
    goal: "Life insurance protection with tax-advantaged cash value potential.",
    mainPoints: [
      "Provides death benefit protection",
      "May include living benefits for qualifying illness or injury",
      "Offers index-linked growth potential",
      "Downside protection through a floor, subject to policy terms",
      "Can be structured for protection, accumulation, or both",
    ],
    fields: [
      "Annual Premium",
      "Death Benefit",
      "Option A or B",
      "Years Funded",
      "Index Strategy",
      "Participation Rate",
      "Cap Rate",
      "Floor",
      "Living Benefits",
      "Projected Cash Value",
      "Projected Income Strategy",
    ],
  },

  "Term Life": {
    goal: "Affordable death benefit protection for a specific period of time.",
    mainPoints: [
      "Provides high coverage for lower initial cost",
      "Useful for mortgage protection and family income replacement",
      "Coverage lasts for a defined term",
      "May include conversion options depending on carrier",
      "Simple and easy to compare",
    ],
    fields: [
      "Monthly Premium",
      "Annual Premium",
      "Death Benefit",
      "Term Length",
      "Conversion Option",
      "Living Benefits",
      "Riders",
    ],
  },

  "Whole Life": {
    goal: "Permanent life insurance with guarantees and cash value accumulation.",
    mainPoints: [
      "Lifetime death benefit protection if premiums are paid",
      "Guaranteed cash value growth based on policy terms",
      "Level premium structure",
      "May pay dividends if issued by a participating carrier",
      "Can support legacy and conservative accumulation goals",
    ],
    fields: [
      "Annual Premium",
      "Death Benefit",
      "Guaranteed Cash Value",
      "Dividend Option",
      "Paid-Up Additions",
      "Living Benefits",
      "Riders",
    ],
  },

  "Disability Income": {
    goal: "Protect income if the client becomes unable to work due to illness or injury.",
    mainPoints: [
      "Replaces a portion of earned income",
      "Helps protect lifestyle and household cash flow",
      "Can be customized by benefit period and elimination period",
      "Important for business owners and high earners",
      "Definitions of disability matter heavily",
    ],
    fields: [
      "Monthly Benefit",
      "Monthly Premium",
      "Elimination Period",
      "Benefit Period",
      "Occupation Class",
      "Own-Occupation Definition",
      "Non-Cancelable",
      "Guaranteed Renewable",
      "Riders",
    ],
  },
};

/* =========================================================
   ILLUSTRATION CONFIG: COMPARISON ROWS
========================================================= */

export const comparisonRows = [
  "Primary Goal",
  "Market Loss Protection",
  "Tax Deferral",
  "Death Benefit",
  "Income Potential",
  "Liquidity",
  "Medical Underwriting",
  "Best Fit",
  "Main Consideration",
];

/* =========================================================
   ILLUSTRATION CONFIG: FIELD DEFINITIONS
========================================================= */

export const fieldDefinitions = {
  "Initial Premium":
    "The amount of money placed into the policy or annuity at the start.",
  "Additional Premium":
    "Extra money that may be added after the initial premium, depending on product rules.",
  Bonus:
    "A credit some products may add to contract value, subject to carrier terms, vesting, and surrender rules.",
  "Surrender Period":
    "The period when withdrawals above allowed amounts may trigger surrender charges.",
  "Index Strategy":
    "The index-linked crediting method used to calculate potential interest.",
  "Participation Rate":
    "The percentage of index gains used in the interest-crediting calculation.",
  "Cap Rate":
    "The maximum interest rate that can be credited for a specific period.",
  Floor:
    "The minimum credited interest rate for the strategy, subject to contract terms.",
  "Income Rider":
    "An optional feature designed to provide a future income benefit, often for an additional cost.",
  "Estimated Income Start Date":
    "The date the client may begin taking income based on illustration assumptions.",
  "Estimated Annual Income":
    "The projected yearly income amount shown in the official carrier illustration.",
  "Premium Amount":
    "The amount used to purchase or fund the product.",
  "Income Start Date":
    "The date income payments are expected to begin.",
  "Payout Option":
    "The selected method of receiving income, such as life-only, joint life, or period certain.",
  "Monthly Income":
    "The estimated monthly income payment shown in the illustration.",
  "Annual Income":
    "The estimated yearly income payment shown in the illustration.",
  "Period Certain":
    "A guaranteed payment period where income continues for a set number of years.",
  "Beneficiary Option":
    "The option determining what may pass to beneficiaries.",
  "Liquidity Feature":
    "A feature that may allow limited access to funds, subject to contract rules.",
  "Annual Premium":
    "The amount paid into the policy each year.",
  "Death Benefit":
    "The amount payable to beneficiaries if the insured passes away, subject to policy terms.",
  "Option A or B":
    "A life insurance death benefit structure. Option A is generally level; Option B generally increases with cash value.",
  "Years Funded":
    "The number of years premiums are planned to be paid into the policy.",
  "Living Benefits":
    "Benefits that may allow access to part of the death benefit while alive after qualifying illness or injury.",
  "Projected Cash Value":
    "The estimated future policy value based on illustration assumptions.",
  "Projected Income Strategy":
    "A possible way to access policy values in the future, often through withdrawals or policy loans.",
  "Monthly Premium":
    "The amount paid each month to keep the policy active.",
  "Term Length":
    "The number of years the term life policy is designed to last.",
  "Conversion Option":
    "A feature that may allow a term policy to be converted into permanent coverage.",
  Riders:
    "Optional policy features that can add benefits or change how the policy works.",
  "Guaranteed Cash Value":
    "The minimum cash value guaranteed by the policy contract.",
  "Dividend Option":
    "How policy dividends may be used, if the policy is eligible and dividends are declared.",
  "Paid-Up Additions":
    "Additional paid-up insurance purchased using dividends or extra premium, depending on the policy.",
  "Monthly Benefit":
    "The monthly disability income benefit payable if the insured qualifies for a claim.",
  "Elimination Period":
    "The waiting period before disability benefits begin.",
  "Benefit Period":
    "The maximum length of time disability benefits may be paid.",
  "Occupation Class":
    "A rating category based on the insured’s job duties and risk level.",
  "Own-Occupation Definition":
    "A disability definition based on whether the insured can perform the duties of their own occupation.",
  "Non-Cancelable":
    "A feature where the carrier generally cannot cancel the policy, increase premiums, or change benefits if premiums are paid.",
  "Guaranteed Renewable":
    "A feature where the carrier generally must keep coverage renewable if premiums are paid, but premiums may be changed by class.",
};

/* =========================================================
   ILLUSTRATION CONFIG: HELPER CLASSES
========================================================= */

export function inputClass() {
  return "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100";
}

export function labelClass() {
  return "mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500";
}

export function smallButtonClass() {
  return "rounded-xl border px-3 py-2 text-xs font-bold hover:bg-gray-50";
}

/* =========================================================
   ILLUSTRATION CONFIG: CUSTOMIZATION MERGE HELPER
========================================================= */

export function deepMergeCustomization(saved) {
  return {
    ...defaultCustomization,
    ...saved,
    login: { ...defaultCustomization.login, ...(saved?.login || {}) },
    previewHeader: {
      ...defaultCustomization.previewHeader,
      ...(saved?.previewHeader || {}),
    },
    clientGoal: {
      ...defaultCustomization.clientGoal,
      ...(saved?.clientGoal || {}),
    },
    strategyPurpose: {
      ...defaultCustomization.strategyPurpose,
      ...(saved?.strategyPurpose || {}),
    },
    mainPolicyPoints: {
      ...defaultCustomization.mainPolicyPoints,
      ...(saved?.mainPolicyPoints || {}),
    },
    policyDetails: {
      ...defaultCustomization.policyDetails,
      ...(saved?.policyDetails || {}),
    },
    comparison: {
      ...defaultCustomization.comparison,
      ...(saved?.comparison || {}),
    },
    disclosure: {
      ...defaultCustomization.disclosure,
      ...(saved?.disclosure || {}),
    },
    footer: {
      ...defaultCustomization.footer,
      ...(saved?.footer || {}),
    },
  };
}