"use client";

import { useMemo, useState } from "react";
import {
  ShieldCheck,
  HeartPulse,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* =========================================================
   BENEFITS MODEL
========================================================= */

const livingBenefitPercentages = {
  terminal: 0.75,
  chronic: 0.5,
  critical: 0.25,
};

const livingBenefitQualifications = {
  terminal: [
    "Presence of an illness or condition where life expectancy does not exceed 12 months.",
  ],
  chronic: [
    "Unable to perform at least two activities of daily living for at least 90 days.",
    "Or the presence of a severe cognitive impairment.",
    "Activities of daily living include dressing, toileting, eating, transferring, bathing, and continence.",
  ],
  critical: [
    "Invasive life-threatening cancer",
    "Major burns",
    "Stroke",
    "Coma",
    "Major heart attack",
    "Aplastic anemia",
    "End stage renal failure",
    "Benign brain tumor",
    "Major organ transplant",
    "Aortic aneurysm",
    "ALS, also known as Amyotrophic Lateral Sclerosis",
    "Heart valve replacement",
    "Blindness due to diabetes",
    "Coronary artery bypass graft surgery",
    "Paralysis of two or more limbs",
  ],
};

/* =========================================================
   HELPERS
========================================================= */

function parseMoney(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;

  const cleaned = String(value).replace(/[^0-9.-]/g, "");
  const parsed = Number(cleaned);

  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value) {
  const number = Number(value) || 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(number);
}

function formatPercent(value) {
  return `${Math.round((Number(value) || 0) * 100)}%`;
}

function isLifeProduct(product) {
  return ["Indexed Universal Life", "Term Life", "Whole Life"].includes(product);
}

function isDisabilityProduct(product) {
  return product === "Disability Income";
}

function isAnnuityProduct(product) {
  return ["Fixed Indexed Annuity", "Income Annuity"].includes(product);
}

function getDefaultDeathBenefit(product) {
  if (product === "Indexed Universal Life") return 1000000;
  if (product === "Term Life") return 500000;
  if (product === "Whole Life") return 250000;

  return 1000000;
}

function getDefaultBenefitPeriodYears(value) {
  const raw = String(value || "").toLowerCase();

  if (raw.includes("to age 65") || raw.includes("age 65")) return 39;
  if (raw.includes("to age 67") || raw.includes("age 67")) return 41;
  if (raw.includes("10")) return 10;
  if (raw.includes("5")) return 5;
  if (raw.includes("2")) return 2;

  const parsed = parseMoney(raw);
  return parsed > 0 ? parsed : 5;
}

function inputClass() {
  return "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100";
}

function labelClass() {
  return "mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500";
}

/* =========================================================
   BENEFITS SECTION COMPONENT
========================================================= */

export default function BenefitsSection({ selectedProduct, details = {} }) {
  const [showQualifications, setShowQualifications] = useState(false);

  const [benefitInputs, setBenefitInputs] = useState({
    deathBenefit:
      parseMoney(details["Death Benefit"]) ||
      parseMoney(details["Specified Amount"]) ||
      getDefaultDeathBenefit(selectedProduct),
    monthlyBenefit: parseMoney(details["Monthly Benefit"]) || 5000,
    benefitPeriodYears:
      getDefaultBenefitPeriodYears(details["Benefit Period"]) || 5,
    eliminationPeriodDays: parseMoney(details["Elimination Period"]) || 90,
  });

  function updateBenefitInput(key, value) {
    setBenefitInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function syncBenefitsFromIllustrationDetails() {
    if (isLifeProduct(selectedProduct)) {
      setBenefitInputs((prev) => ({
        ...prev,
        deathBenefit:
          parseMoney(details["Death Benefit"]) ||
          parseMoney(details["Specified Amount"]) ||
          prev.deathBenefit ||
          getDefaultDeathBenefit(selectedProduct),
      }));
    }

    if (isDisabilityProduct(selectedProduct)) {
      setBenefitInputs((prev) => ({
        ...prev,
        monthlyBenefit:
          parseMoney(details["Monthly Benefit"]) || prev.monthlyBenefit || 5000,
        benefitPeriodYears:
          getDefaultBenefitPeriodYears(details["Benefit Period"]) ||
          prev.benefitPeriodYears ||
          5,
        eliminationPeriodDays:
          parseMoney(details["Elimination Period"]) ||
          prev.eliminationPeriodDays ||
          90,
      }));
    }
  }

  const livingBenefitAmounts = useMemo(() => {
    const deathBenefit = parseMoney(benefitInputs.deathBenefit);

    return {
      deathBenefit,
      terminal: deathBenefit * livingBenefitPercentages.terminal,
      chronic: deathBenefit * livingBenefitPercentages.chronic,
      critical: deathBenefit * livingBenefitPercentages.critical,
      remainingAfterTerminal: Math.max(
        deathBenefit * 0.1,
        deathBenefit - deathBenefit * livingBenefitPercentages.terminal
      ),
      remainingAfterChronic: Math.max(
        deathBenefit * 0.1,
        deathBenefit - deathBenefit * livingBenefitPercentages.chronic
      ),
      remainingAfterCritical: Math.max(
        deathBenefit * 0.1,
        deathBenefit - deathBenefit * livingBenefitPercentages.critical
      ),
    };
  }, [benefitInputs.deathBenefit]);

  const disabilityBenefitAmounts = useMemo(() => {
    const monthlyBenefit = parseMoney(benefitInputs.monthlyBenefit);
    const years = Number(benefitInputs.benefitPeriodYears) || 0;
    const months = years * 12;

    return {
      monthlyBenefit,
      annualBenefit: monthlyBenefit * 12,
      months,
      years,
      totalBenefit: monthlyBenefit * months,
    };
  }, [benefitInputs.monthlyBenefit, benefitInputs.benefitPeriodYears]);

  if (isLifeProduct(selectedProduct)) {
    return (
      <section className="mt-5 rounded-3xl border bg-gray-50 p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-gray-950">
              <HeartPulse size={20} /> Benefits
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Living benefits and death benefit values based on the current
              death benefit amount.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="no-print"
            onClick={syncBenefitsFromIllustrationDetails}
          >
            Use Entered Death Benefit
          </Button>
        </div>

        <div className="no-print mb-4 rounded-2xl border bg-white p-4">
          <label className={labelClass()}>
            Client Benefits Calculator: Change Death Benefit
          </label>
          <input
            className={inputClass()}
            value={benefitInputs.deathBenefit}
            onChange={(e) => updateBenefitInput("deathBenefit", e.target.value)}
            placeholder="Example: 1000000"
          />
          <p className="mt-2 text-xs text-gray-500">
            Change this amount to show how terminal, chronic, and critical
            illness benefit amounts may change.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Death Benefit
            </p>
            <p className="mt-2 text-2xl font-black text-gray-950">
              {formatMoney(livingBenefitAmounts.deathBenefit)}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              This is the death benefit amount used for the calculator.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Terminal Illness
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {formatPercent(livingBenefitPercentages.terminal)} of death
              benefit
            </p>
            <p className="mt-2 text-2xl font-black text-gray-950">
              {formatMoney(livingBenefitAmounts.terminal)}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Estimated remaining death benefit:{" "}
              {formatMoney(livingBenefitAmounts.remainingAfterTerminal)}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Chronic Illness
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {formatPercent(livingBenefitPercentages.chronic)} of death benefit
            </p>
            <p className="mt-2 text-2xl font-black text-gray-950">
              {formatMoney(livingBenefitAmounts.chronic)}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Estimated remaining death benefit:{" "}
              {formatMoney(livingBenefitAmounts.remainingAfterChronic)}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Critical Illness
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {formatPercent(livingBenefitPercentages.critical)} of death
              benefit
            </p>
            <p className="mt-2 text-2xl font-black text-gray-950">
              {formatMoney(livingBenefitAmounts.critical)}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Estimated remaining death benefit:{" "}
              {formatMoney(livingBenefitAmounts.remainingAfterCritical)}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border bg-white p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-black text-gray-950">
                Living Benefit Qualifications
              </h4>
              <p className="text-sm text-gray-600">
                View qualifying categories for terminal, chronic, and critical
                illness.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              className="no-print"
              onClick={() => setShowQualifications(!showQualifications)}
            >
              Qualifications
              <ChevronDown
                className={`ml-2 h-4 w-4 transition ${
                  showQualifications ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>

          {showQualifications && (
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl bg-gray-50 p-4">
                <h5 className="mb-2 font-black text-gray-950">
                  Terminal Illness
                </h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  {livingBenefitQualifications.terminal.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <h5 className="mb-2 font-black text-gray-950">
                  Chronic Illness
                </h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  {livingBenefitQualifications.chronic.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <h5 className="mb-2 font-black text-gray-950">
                  Critical Illness
                </h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  {livingBenefitQualifications.critical.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          Living benefits are accelerated death benefits. A claim reduces the
          policy death benefit and may affect policy values. Actual benefit
          availability, qualifications, reductions, charges, tax treatment,
          payment limits, and remaining death benefit must be confirmed by the
          official carrier illustration and contract.
        </p>
      </section>
    );
  }

  if (isDisabilityProduct(selectedProduct)) {
    return (
      <section className="mt-5 rounded-3xl border bg-gray-50 p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-gray-950">
              <DollarSign size={20} /> Benefits
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Estimate monthly, annual, and total disability income payments
              over the selected benefit period.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="no-print"
            onClick={syncBenefitsFromIllustrationDetails}
          >
            Use Entered DI Details
          </Button>
        </div>

        <div className="no-print mb-4 grid gap-3">
          <div>
            <label className={labelClass()}>Monthly Benefit</label>
            <input
              className={inputClass()}
              value={benefitInputs.monthlyBenefit}
              onChange={(e) =>
                updateBenefitInput("monthlyBenefit", e.target.value)
              }
              placeholder="Example: 5000"
            />
          </div>

          <div>
            <label className={labelClass()}>Benefit Period Years</label>
            <input
              className={inputClass()}
              value={benefitInputs.benefitPeriodYears}
              onChange={(e) =>
                updateBenefitInput("benefitPeriodYears", e.target.value)
              }
              placeholder="Example: 5"
            />
          </div>

          <div>
            <label className={labelClass()}>Elimination Period Days</label>
            <input
              className={inputClass()}
              value={benefitInputs.eliminationPeriodDays}
              onChange={(e) =>
                updateBenefitInput("eliminationPeriodDays", e.target.value)
              }
              placeholder="Example: 90"
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Monthly Payment
            </p>
            <p className="mt-2 text-2xl font-black text-gray-950">
              {formatMoney(disabilityBenefitAmounts.monthlyBenefit)}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Potential monthly income after the elimination period.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Annual Benefit
            </p>
            <p className="mt-2 text-2xl font-black text-gray-950">
              {formatMoney(disabilityBenefitAmounts.annualBenefit)}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              Monthly benefit multiplied by 12 months.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Total Over Benefit Period
            </p>
            <p className="mt-2 text-2xl font-black text-gray-950">
              {formatMoney(disabilityBenefitAmounts.totalBenefit)}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              {disabilityBenefitAmounts.months} months over{" "}
              {disabilityBenefitAmounts.years} years.
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border bg-white p-4 text-sm text-gray-700">
          <h4 className="mb-2 font-black text-gray-950">What this means</h4>
          <p>
            If the client qualified for disability benefits after a{" "}
            {benefitInputs.eliminationPeriodDays || 0}-day elimination period,
            this example shows how the selected monthly benefit could support
            income replacement over the chosen benefit period.
          </p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          Disability income benefits are subject to carrier underwriting, policy
          definitions, elimination period, benefit period, riders, exclusions,
          and claim approval. Actual payments must be confirmed by the policy
          contract.
        </p>
      </section>
    );
  }

  if (isAnnuityProduct(selectedProduct)) {
    return (
      <section className="mt-5 rounded-3xl border bg-gray-50 p-5">
        <h3 className="flex items-center gap-2 text-lg font-black text-gray-950">
          <ShieldCheck size={20} /> Benefits
        </h3>

        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Principal Protection
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Designed to protect principal from direct market losses, subject
              to contract terms.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Tax Deferral
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Interest can accumulate tax-deferred until withdrawals are taken.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Income Potential
            </p>
            <p className="mt-2 text-sm text-gray-700">
              May be structured to create future retirement income based on
              carrier terms.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Beneficiary Value
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Remaining contract value may pass to beneficiaries according to the
              annuity contract.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return null;
}