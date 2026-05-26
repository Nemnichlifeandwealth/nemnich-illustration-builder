"use client";

import { useMemo, useState } from "react";

const products = {
  "Fixed Indexed Annuity": {
    goal: "Protected, tax-deferred growth with future income potential.",
    points: [
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
    points: [
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
    points: [
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
    points: [
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
    points: [
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
};

const comparisonRows = [
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

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  const [brand, setBrand] = useState({
    businessName: "Nemnich Life & Wealth",
    advisorName: "Charles Nemnich",
    email: "charlienemnich4@gmail.com",
    phone: "",
    tagline: "Protected Growth • Retirement Income • Life Insurance",
    logoText: "NLW",
  });

  const [client, setClient] = useState({
    name: "Joyce Example",
    age: "82",
    state: "Florida",
    goal: "Protect proceeds from a home sale and create a dependable retirement income stream.",
    date: new Date().toLocaleDateString(),
  });

  const [selectedProduct, setSelectedProduct] = useState("Fixed Indexed Annuity");
  const [details, setDetails] = useState({});
  const [compareMode, setCompareMode] = useState(false);

  const product = products[selectedProduct];

  const fields = useMemo(() => product.fields, [product]);

  function updateDetail(field, value) {
    setDetails((old) => ({
      ...old,
      [field]: value,
    }));
  }

  function printPdf() {
    window.print();
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
          <div className="mb-6">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white font-black">
              NLW
            </div>
            <h1 className="text-2xl font-black text-slate-950">
              Advisor Illustration Builder
            </h1>
            <p className="text-sm text-slate-500">
              Private demo for Nemnich Life & Wealth
            </p>
          </div>

          <div className="mb-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900">
            Demo password: <strong>advisor</strong>
          </div>

          <label className="block text-sm font-bold mb-2">Password</label>
          <input
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-slate-300"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && password === "advisor") {
                setLoggedIn(true);
              }
            }}
            placeholder="Enter password"
          />

          <button
            className="mt-4 w-full rounded-xl bg-slate-950 px-4 py-3 font-bold text-white"
            onClick={() => setLoggedIn(password === "advisor")}
          >
            Enter Builder
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
     <style>{`
  @page {
    size: letter;
    margin: 0.35in;
  }

  @media print {
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    html,
    body {
      background: white !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .no-print {
      display: none !important;
    }

    .print-card {
      box-shadow: none !important;
      border-radius: 0 !important;
      width: 100% !important;
      max-width: 100% !important;
      overflow: visible !important;
    }

    .print-section {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    .print-table {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    table,
    tr,
    td,
    th {
      break-inside: avoid !important;
      page-break-inside: avoid !important;
    }

    .print-header {
      break-after: avoid !important;
      page-break-after: avoid !important;
    }

    .print-new-page {
      break-before: page !important;
      page-break-before: always !important;
    }
  }
`}</style>

      <header className="no-print border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div>
            <h1 className="font-black text-xl">Illustration Builder</h1>
            <p className="text-sm text-slate-500">
              Manual-entry sales summary generator
            </p>
          </div>

          <button
            onClick={printPdf}
            className="rounded-xl bg-slate-950 px-4 py-3 font-bold text-white"
          >
            Print / Save PDF
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 p-5 lg:grid-cols-[420px_1fr]">
        <section className="no-print space-y-4">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-black">Client Info</h2>

            {Object.keys(client).map((key) => (
              <div key={key} className="mb-3">
                <label className="mb-1 block text-xs font-bold uppercase text-slate-500">
                  {key}
                </label>

                {key === "goal" ? (
                  <textarea
                    className="w-full rounded-xl border p-3 text-sm"
                    rows={3}
                    value={client[key]}
                    onChange={(e) =>
                      setClient({ ...client, [key]: e.target.value })
                    }
                  />
                ) : (
                  <input
                    className="w-full rounded-xl border p-3 text-sm"
                    value={client[key]}
                    onChange={(e) =>
                      setClient({ ...client, [key]: e.target.value })
                    }
                  />
                )}
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-black">Product</h2>

            <label className="mb-1 block text-xs font-bold uppercase text-slate-500">
              Product Presented
            </label>

            <select
              className="w-full rounded-xl border p-3 text-sm"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {Object.keys(products).map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>

            <label className="mt-4 flex items-center gap-2 text-sm font-bold">
              <input
                type="checkbox"
                checked={compareMode}
                onChange={(e) => setCompareMode(e.target.checked)}
              />
              Show comparison template
            </label>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-black">Manual Entry Details</h2>

            {fields.map((field) => (
              <div key={field} className="mb-3">
                <label className="mb-1 block text-xs font-bold uppercase text-slate-500">
                  {field}
                </label>
                <input
                  className="w-full rounded-xl border p-3 text-sm"
                  value={details[field] || ""}
                  onChange={(e) => updateDetail(field, e.target.value)}
                  placeholder="Enter from official carrier illustration"
                />
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-black">Branding</h2>

            {Object.keys(brand).map((key) => (
              <div key={key} className="mb-3">
                <label className="mb-1 block text-xs font-bold uppercase text-slate-500">
                  {key}
                </label>
                <input
                  className="w-full rounded-xl border p-3 text-sm"
                  value={brand[key]}
                  onChange={(e) =>
                    setBrand({ ...brand, [key]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        </section>

        <section className="print-card overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="bg-slate-950 p-8 text-white">
            <div className="flex justify-between gap-6">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-amber-300">
                  Client Planning Summary
                </p>
                <h1 className="text-4xl font-black">{selectedProduct}</h1>
                <p className="mt-2 text-sm text-slate-300">
                  Prepared for {client.name} • Age {client.age} • {client.state} •{" "}
                  {client.date}
                </p>
              </div>

              <div className="text-right">
                <div className="ml-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-xl font-black text-slate-950">
                  {brand.logoText}
                </div>
                <p className="mt-3 font-bold">{brand.businessName}</p>
                <p className="text-xs text-slate-300">{brand.tagline}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border bg-slate-50 p-5 md:col-span-2">
                <p className="mb-2 text-sm font-black text-amber-700">
                  Client Goal
                </p>
                <p className="text-lg font-bold leading-snug">{client.goal}</p>
              </div>

              <div className="rounded-3xl border bg-slate-50 p-5">
                <p className="mb-2 text-sm font-black text-amber-700">
                  Strategy Purpose
                </p>
                <p className="text-sm leading-relaxed">{product.goal}</p>
              </div>
            </div>

            <div className="mb-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border p-5">
                <h2 className="mb-4 text-xl font-black">Main Policy Points</h2>
                <ul className="space-y-3 text-sm">
                  {product.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border p-5">
                <h2 className="mb-4 text-xl font-black">
                  Entered Illustration Details
                </h2>

                <div className="space-y-2">
                  {fields.map((field) => (
                    <div
                      key={field}
                      className="grid grid-cols-[1fr_1.2fr] gap-3 rounded-xl bg-slate-50 px-3 py-2 text-sm"
                    >
                      <div className="font-bold text-slate-500">{field}</div>
                      <div className="font-black">{details[field] || "—"}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {compareMode && (
              <div className="mb-6 rounded-3xl border p-5">
                <h2 className="mb-4 text-xl font-black">
                  Product Comparison Template
                </h2>

                <div className="overflow-hidden rounded-2xl border">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-100 text-left">
                        <th className="p-3">Feature</th>
                        <th className="p-3">{selectedProduct}</th>
                        <th className="p-3">Comparable Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => (
                        <tr key={row} className="border-t">
                          <td className="p-3 font-bold text-slate-600">{row}</td>
                          <td className="p-3">Manual entry</td>
                          <td className="p-3">Manual entry</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
              <h2 className="mb-2 font-black">Important Disclosure</h2>
              <p>
                This summary is a conceptual planning tool for educational
                discussion only. It is not an official carrier illustration,
                policy contract, offer, guarantee, or tax/legal advice. Final
                values, guarantees, fees, riders, surrender charges, income
                amounts, underwriting approval, product availability, and policy
                benefits must be confirmed using the official carrier illustration
                and contract documents. Clients should consult their tax or legal
                professional regarding their specific situation.
              </p>
            </div>

            <div className="mt-8 flex justify-between border-t pt-5 text-sm text-slate-500">
              <div>
                <p className="font-black text-slate-950">
                  Prepared by {brand.advisorName}
                </p>
                <p>
                  {brand.email}
                  {brand.phone ? ` • ${brand.phone}` : ""}
                </p>
              </div>

              <div className="text-right font-bold">{brand.businessName}</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}