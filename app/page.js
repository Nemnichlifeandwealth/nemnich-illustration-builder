"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Lock, Plus, Trash2, Eye, Settings, ShieldCheck, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const defaultBrand = {
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

const productTemplates = {
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

function inputClass() {
  return "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100";
}

function labelClass() {
  return "mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500";
}

export default function NemnichIllustrationBuilder() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [brand, setBrand] = useState(defaultBrand);
  const [activeTab, setActiveTab] = useState("builder");
  const [selectedProduct, setSelectedProduct] = useState("Fixed Indexed Annuity");
  const [compareMode, setCompareMode] = useState(false);
  const [comparisonProducts, setComparisonProducts] = useState(["Fixed Indexed Annuity", "Indexed Universal Life"]);
  const [client, setClient] = useState({
    name: "Joyce Example",
    age: "82",
    state: "Florida",
    goal: "Protect proceeds from a home sale and create a dependable retirement income stream.",
    preparedDate: new Date().toLocaleDateString(),
  });
  const [details, setDetails] = useState({
    "Initial Premium": "$150,000",
    "Additional Premium": "",
    "Bonus": "Carrier-specific / if available",
    "Surrender Period": "7–10 years",
    "Index Strategy": "S&P 500 linked strategy",
    "Participation Rate": "Manual entry from official illustration",
    "Cap Rate": "Manual entry from official illustration",
    "Floor": "0% floor, subject to product terms",
    "Income Rider": "Optional",
    "Estimated Income Start Date": "Manual entry",
    "Estimated Annual Income": "Manual entry from official illustration",
  });
  const [customPoints, setCustomPoints] = useState([
    "Funds are positioned for protection first, then growth potential.",
    "The final recommendation should be reviewed against the official carrier illustration.",
  ]);
  const [newPoint, setNewPoint] = useState("");
  const [comparisonData, setComparisonData] = useState({
    "Fixed Indexed Annuity": {
      "Primary Goal": "Protected growth and future income",
      "Market Loss Protection": "Yes",
      "Tax Deferral": "Yes",
      "Death Benefit": "Beneficiary value",
      "Income Potential": "Strong",
      "Liquidity": "Limited by surrender schedule",
      "Medical Underwriting": "Usually no",
      "Best Fit": "Retirement assets needing protection",
      "Main Consideration": "Surrender charges and liquidity limits",
    },
    "Indexed Universal Life": {
      "Primary Goal": "Life protection and accumulation potential",
      "Market Loss Protection": "Yes, subject to policy terms",
      "Tax Deferral": "Yes",
      "Death Benefit": "Yes",
      "Income Potential": "Possible through policy loans",
      "Liquidity": "Based on cash value and policy structure",
      "Medical Underwriting": "Yes",
      "Best Fit": "Protection plus long-term accumulation",
      "Main Consideration": "Policy charges and funding design",
    },
  });

  useEffect(() => {
    try {
      const savedBrand = window.localStorage.getItem("nlw-brand-settings");
      if (savedBrand) {
        setBrand({ ...defaultBrand, ...JSON.parse(savedBrand) });
      }
    } catch (error) {
      console.error("Unable to load saved brand settings:", error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("nlw-brand-settings", JSON.stringify(brand));
    } catch (error) {
      console.error("Unable to save brand settings:", error);
    }
  }, [brand]);

  function updateBrand(key, value) {
    setBrand((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleLogoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      updateBrand("logoImage", reader.result);
    };

    reader.readAsDataURL(file);
  }

  function resetBrandSettings() {
    setBrand(defaultBrand);
  }

  const template = productTemplates[selectedProduct];

  const currentFields = useMemo(() => template.fields, [template]);

  function handleProductChange(product) {
    setSelectedProduct(product);
    const nextDetails = {};
    productTemplates[product].fields.forEach((field) => {
      nextDetails[field] = details[field] || "";
    });
    setDetails(nextDetails);
  }

  function updateComparison(product, row, value) {
    setComparisonData((prev) => ({
      ...prev,
      [product]: {
        ...(prev[product] || {}),
        [row]: value,
      },
    }));
  }

  function addCustomPoint() {
    if (!newPoint.trim()) return;
    setCustomPoints([...customPoints, newPoint.trim()]);
    setNewPoint("");
  }

  function printPage() {
    window.print();
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 p-6 text-white">
        <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <Card className="rounded-3xl border-gray-800 bg-white/10 shadow-2xl backdrop-blur">
              <CardContent className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-gray-950">NLW</div>
                  <div>
                    <h1 className="text-2xl font-bold">Advisor Illustration Builder</h1>
                    <p className="text-sm text-gray-300">Private advisor-only prototype</p>
                  </div>
                </div>
                <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-white"><Lock size={16} /> Advisor Access</div>
                  Use demo password <span className="font-bold text-white">advisor</span> to enter this MVP.
                </div>
                <label className="mb-2 block text-sm font-semibold text-gray-200">Password</label>
                <input className="w-full rounded-xl border border-white/10 bg-white px-4 py-3 text-gray-950 outline-none" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" onKeyDown={(e) => { if (e.key === "Enter" && password === "advisor") setAuthenticated(true); }} />
                <Button className="mt-4 w-full rounded-xl py-6 text-base" onClick={() => setAuthenticated(password === "advisor")}>Enter Builder</Button>
                {password && password !== "advisor" && <p className="mt-3 text-sm text-red-300">Incorrect demo password.</p>}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-950" style={{ backgroundColor: brand.pageBackgroundColor }}>
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
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }

          .no-print {
            display: none !important;
          }

          .print-area {
            box-shadow: none !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            overflow: visible !important;
          }

          .print-section,
          .print-card,
          table,
          tr,
          td,
          th {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      <div className="no-print border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            {brand.logoImage ? (
              <img
                src={brand.logoImage}
                alt={`${brand.businessName} logo`}
                className="h-11 w-11 rounded-2xl bg-white object-contain p-1"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-black text-white" style={{ background: brand.primaryColor }}>{brand.logoText}</div>
            )}
            <div>
              <h1 className="text-lg font-bold">{brand.businessName} Illustration Builder</h1>
              <p className="text-xs text-gray-500">Manual-entry advisor sales summary generator</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant={activeTab === "builder" ? "default" : "outline"} onClick={() => setActiveTab("builder")}><FileText size={16} className="mr-2" /> Builder</Button>
            <Button variant={activeTab === "branding" ? "default" : "outline"} onClick={() => setActiveTab("branding")}><Settings size={16} className="mr-2" /> Branding</Button>
            <Button onClick={printPage}><Download size={16} className="mr-2" /> Print / Save PDF</Button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 p-5 lg:grid-cols-[420px_1fr]">
        <div className="no-print space-y-4">
          {activeTab === "branding" ? (
            <Card className="rounded-3xl shadow-sm">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">Branding Settings</h2>
                    <p className="text-sm text-gray-500">Customize the colors and logo used in the client preview and PDF.</p>
                  </div>
                  <Button variant="outline" onClick={resetBrandSettings}>Reset</Button>
                </div>

                <div className="mb-5 rounded-2xl border bg-gray-50 p-4">
                  <label className={labelClass()}>Logo Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className={inputClass()}
                    onChange={handleLogoUpload}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Upload a PNG, JPG, or SVG logo. It will be saved in this browser.
                  </p>

                  {brand.logoImage && (
                    <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-white p-3">
                      <img
                        src={brand.logoImage}
                        alt={`${brand.businessName} uploaded logo`}
                        className="max-h-20 max-w-[190px] object-contain"
                      />
                      <Button variant="outline" onClick={() => updateBrand("logoImage", "")}>Remove Logo</Button>
                    </div>
                  )}
                </div>

                <div className="mb-5 grid gap-3 sm:grid-cols-2">
                  {[
                    ["primaryColor", "Primary Color"],
                    ["accentColor", "Accent Color"],
                    ["headerBackgroundColor", "Header Background"],
                    ["pageBackgroundColor", "Page Background"],
                  ].map(([key, label]) => (
                    <div key={key} className="rounded-2xl border bg-gray-50 p-3">
                      <label className={labelClass()}>{label}</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          className="h-11 w-14 cursor-pointer rounded-xl border bg-white p-1"
                          value={brand[key]}
                          onChange={(e) => updateBrand(key, e.target.value)}
                        />
                        <input
                          className={inputClass()}
                          value={brand[key]}
                          onChange={(e) => updateBrand(key, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  {[
                    ["businessName", "Business Name"],
                    ["tagline", "Tagline"],
                    ["advisorName", "Advisor Name"],
                    ["phone", "Phone"],
                    ["email", "Email"],
                    ["website", "Website"],
                    ["logoText", "Fallback Logo Text"],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className={labelClass()}>{label}</label>
                      <input className={inputClass()} value={brand[key]} onChange={(e) => updateBrand(key, e.target.value)} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-5">
                  <h2 className="mb-4 text-lg font-bold">Client Info</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {Object.keys(client).map((key) => (
                      <div key={key} className={key === "goal" ? "sm:col-span-2" : ""}>
                        <label className={labelClass()}>{key}</label>
                        {key === "goal" ? (
                          <textarea className={inputClass()} rows={3} value={client[key]} onChange={(e) => setClient({ ...client, [key]: e.target.value })} />
                        ) : (
                          <input className={inputClass()} value={client[key]} onChange={(e) => setClient({ ...client, [key]: e.target.value })} />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold">Product</h2>
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <input type="checkbox" checked={compareMode} onChange={(e) => setCompareMode(e.target.checked)} /> Comparison
                    </label>
                  </div>
                  <label className={labelClass()}>Product Presented</label>
                  <select className={inputClass()} value={selectedProduct} onChange={(e) => handleProductChange(e.target.value)}>
                    {Object.keys(productTemplates).map((product) => <option key={product}>{product}</option>)}
                  </select>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-5">
                  <h2 className="mb-4 text-lg font-bold">Manual Entry Details</h2>
                  <div className="space-y-3">
                    {currentFields.map((field) => (
                      <div key={field}>
                        <label className={labelClass()}>{field}</label>
                        <input className={inputClass()} value={details[field] || ""} onChange={(e) => setDetails({ ...details, [field]: e.target.value })} placeholder="Enter from official carrier illustration" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl shadow-sm">
                <CardContent className="p-5">
                  <h2 className="mb-4 text-lg font-bold">Custom Talking Points</h2>
                  <div className="space-y-2">
                    {customPoints.map((point, index) => (
                      <div key={index} className="flex gap-2 rounded-xl bg-gray-50 p-2 text-sm">
                        <span className="flex-1">{point}</span>
                        <button onClick={() => setCustomPoints(customPoints.filter((_, i) => i !== index))}><Trash2 size={15} /></button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input className={inputClass()} value={newPoint} onChange={(e) => setNewPoint(e.target.value)} placeholder="Add custom point" />
                    <Button onClick={addCustomPoint}><Plus size={16} /></Button>
                  </div>
                </CardContent>
              </Card>

              {compareMode && (
                <Card className="rounded-3xl shadow-sm">
                  <CardContent className="p-5">
                    <h2 className="mb-4 text-lg font-bold">Comparison Template</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[0, 1].map((index) => (
                        <div key={index}>
                          <label className={labelClass()}>Compare Product {index + 1}</label>
                          <select className={inputClass()} value={comparisonProducts[index]} onChange={(e) => {
                            const next = [...comparisonProducts];
                            next[index] = e.target.value;
                            setComparisonProducts(next);
                          }}>
                            {Object.keys(productTemplates).map((product) => <option key={product}>{product}</option>)}
                          </select>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 space-y-4">
                      {comparisonProducts.map((product) => (
                        <div key={product} className="rounded-2xl border p-3">
                          <h3 className="mb-3 font-bold">{product}</h3>
                          <div className="space-y-2">
                            {comparisonRows.map((row) => (
                              <div key={row}>
                                <label className={labelClass()}>{row}</label>
                                <input className={inputClass()} value={(comparisonData[product] || {})[row] || ""} onChange={(e) => updateComparison(product, row, e.target.value)} />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>

        <div className="print-area mx-auto w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="p-8 text-white print-section" style={{ background: brand.headerBackgroundColor }}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  <Eye size={14} /> Client Planning Summary
                </div>
                <h1 className="text-4xl font-black tracking-tight">{selectedProduct}</h1>
                <p className="mt-2 max-w-2xl text-sm text-white/80">Prepared for {client.name} • Age {client.age} • {client.state} • {client.preparedDate}</p>
              </div>
              <div className="text-right">
                {brand.logoImage ? (
                  <img
                    src={brand.logoImage}
                    alt={`${brand.businessName} logo`}
                    className="ml-auto max-h-24 max-w-[220px] rounded-2xl bg-white object-contain p-3"
                  />
                ) : (
                  <div className="ml-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-xl font-black" style={{ color: brand.primaryColor }}>{brand.logoText}</div>
                )}
                <p className="mt-3 text-sm font-bold">{brand.businessName}</p>
                <p className="text-xs text-white/70">{brand.tagline}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="print-section mb-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border bg-gray-50 p-5 md:col-span-2">
                <div className="mb-2 flex items-center gap-2 text-sm font-bold" style={{ color: brand.accentColor }}><ShieldCheck size={18} /> Client Goal</div>
                <p className="text-lg font-semibold leading-snug">{client.goal}</p>
              </div>
              <div className="rounded-3xl border bg-gray-50 p-5">
                <div className="mb-2 text-sm font-bold" style={{ color: brand.accentColor }}>Strategy Purpose</div>
                <p className="text-sm leading-relaxed">{template.goal}</p>
              </div>
            </div>

            <div className="print-section mb-6 grid gap-5 md:grid-cols-2">
              <section className="rounded-3xl border p-5">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><ShieldCheck size={20} /> Main Policy Points</h2>
                <ul className="space-y-3 text-sm">
                  {template.mainPoints.map((point, index) => (
                    <li key={index} className="flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ background: brand.accentColor }} /> <span>{point}</span></li>
                  ))}
                  {customPoints.map((point, index) => (
                    <li key={`custom-${index}`} className="flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gray-800" /> <span>{point}</span></li>
                  ))}
                </ul>
              </section>

              <section className="rounded-3xl border p-5">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><FileText size={20} /> Entered Illustration Details</h2>
                <div className="space-y-2">
                  {currentFields.map((field) => (
                    <div key={field} className="grid grid-cols-[1fr_1.2fr] gap-3 rounded-xl bg-gray-50 px-3 py-2 text-sm">
                      <div className="font-semibold text-gray-500">{field}</div>
                      <div className="font-bold text-gray-950">{details[field] || "—"}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {compareMode && (
              <section className="print-section mb-6 rounded-3xl border p-5">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><BarChart3 size={20} /> Product Comparison</h2>
                <div className="overflow-hidden rounded-2xl border">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-left">
                        <th className="p-3 font-black">Feature</th>
                        {comparisonProducts.map((product) => <th key={product} className="p-3 font-black">{product}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => (
                        <tr key={row} className="border-t">
                          <td className="p-3 font-semibold text-gray-600">{row}</td>
                          {comparisonProducts.map((product) => <td key={`${product}-${row}`} className="p-3">{(comparisonData[product] || {})[row] || "—"}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            <section className="print-section rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
              <h2 className="mb-2 font-black">Important Disclosure</h2>
              <p>
                This summary is a conceptual planning tool for educational discussion only. It is not an official carrier illustration, policy contract, offer, guarantee, or tax/legal advice. Final values, guarantees, fees, riders, surrender charges, income amounts, underwriting approval, product availability, and policy benefits must be confirmed using the official carrier illustration and contract documents. Clients should consult their tax or legal professional regarding their specific situation.
              </p>
            </section>

            <div className="mt-8 flex items-end justify-between border-t pt-5 text-sm text-gray-500">
              <div>
                <p className="font-bold text-gray-950">Prepared by {brand.advisorName}</p>
                <p>{brand.email}{brand.phone ? ` • ${brand.phone}` : ""}</p>
                <p>{brand.website}</p>
              </div>
              <div className="text-right font-semibold">{brand.businessName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}