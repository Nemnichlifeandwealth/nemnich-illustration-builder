"use client";

/* =========================================================
   SECTION 1: IMPORTS
========================================================= */

import BenefitsSection from "@/components/BenefitsSection";
import { supabase } from "@/lib/supabaseClient";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Lock,
  Plus,
  Trash2,
  Eye,
  Settings,
  ShieldCheck,
  BarChart3,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  carriers,
  defaultBrand,
  defaultCustomization,
  productTemplates,
  comparisonRows,
  fieldDefinitions,
  inputClass,
  labelClass,
  smallButtonClass,
  deepMergeCustomization,
} from "@/lib/illustrationConfig";

/* =========================================================
   SECTION 10: MAIN COMPONENT
========================================================= */

export default function NemnichIllustrationBuilder() {
  const advisorPassword = process.env.NEXT_PUBLIC_ADVISOR_PASSWORD || "advisor";

  /* =========================================================
     SECTION 10A: LOGIN + PORTAL STATE
  ========================================================= */

  const [portalMode, setPortalMode] = useState("advisor");
  const [advisorAuthenticated, setAdvisorAuthenticated] = useState(false);
  const [clientAuthenticated, setClientAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [clientLogin, setClientLogin] = useState({
    lastName: "",
    dateOfBirth: "",
    accessCode: "",
  });

  /* =========================================================
     SECTION 10B: BRANDING + CUSTOMIZATION STATE
  ========================================================= */

  const [dbMessage, setDbMessage] = useState("");
  const [brand, setBrand] = useState(defaultBrand);
  const [customization, setCustomization] = useState(defaultCustomization);
  const [activeTab, setActiveTab] = useState("builder");
  const [expandedDefinitionField, setExpandedDefinitionField] = useState(null);

  const [openCustomizationSections, setOpenCustomizationSections] = useState({
    globalFont: true,
    loginPage: false,
    previewHeader: false,
    clientGoal: false,
    strategyPurpose: false,
    mainPolicyPoints: false,
    policyDetails: false,
    comparison: false,
    disclosure: false,
    footer: false,
  });

  /* =========================================================
     SECTION 10C: PRODUCT + ILLUSTRATION STATE
  ========================================================= */

  const [selectedProduct, setSelectedProduct] = useState(
    "Fixed Indexed Annuity"
  );
  const [selectedCarrier, setSelectedCarrier] = useState("Ameritas");
  const [compareMode, setCompareMode] = useState(false);
  const [comparisonProducts, setComparisonProducts] = useState([
    "Fixed Indexed Annuity",
    "Indexed Universal Life",
  ]);

  const [illustrationName, setIllustrationName] = useState(
    "Retirement Income Strategy"
  );
  const [illustrationCategory, setIllustrationCategory] = useState("Annuity");

  const [client, setClient] = useState({
    name: "Joyce Example",
    age: "82",
    state: "Florida",
    goal: "Protect proceeds from a home sale and create a dependable retirement income stream.",
    preparedDate: new Date().toLocaleDateString(),
  });

  const [clientProfile, setClientProfile] = useState({
    firstName: "Joyce",
    lastName: "Example",
    dateOfBirth: "",
    email: "",
    phone: "",
    accessCode: "123456",
    status: "prospect",
  });

  const [savedClients, setSavedClients] = useState([]);
  const [savedIllustrations, setSavedIllustrations] = useState([]);
  const [activeClientId, setActiveClientId] = useState("");
  const [activeIllustrationId, setActiveIllustrationId] = useState("");
  const [activeIllustrationPublished, setActiveIllustrationPublished] =
    useState(false);

  const [clientPortalRecord, setClientPortalRecord] = useState(null);
  const [clientPortalIllustrations, setClientPortalIllustrations] = useState([]);

  const [details, setDetails] = useState({
    "Initial Premium": "$150,000",
    "Additional Premium": "",
    Bonus: "Carrier-specific / if available",
    "Surrender Period": "7–10 years",
    "Index Strategy": "S&P 500 linked strategy",
    "Participation Rate": "Manual entry from official illustration",
    "Cap Rate": "Manual entry from official illustration",
    Floor: "0% floor, subject to product terms",
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
      Liquidity: "Limited by surrender schedule",
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
      Liquidity: "Based on cash value and policy structure",
      "Medical Underwriting": "Yes",
      "Best Fit": "Protection plus long-term accumulation",
      "Main Consideration": "Policy charges and funding design",
    },
  });

  /* =========================================================
     SECTION 10D: DERIVED VALUES
  ========================================================= */

  const loginTheme = customization.login;
  const template = productTemplates[selectedProduct];
  const selectedCarrierData = carriers[selectedCarrier];
  const currentFields = useMemo(() => template.fields, [template]);

  /* =========================================================
     SECTION 11: LOCALSTORAGE LOAD
  ========================================================= */

  useEffect(() => {
    try {
      const savedBrand = window.localStorage.getItem("nlw-brand-settings");
      if (savedBrand) {
        setBrand({ ...defaultBrand, ...JSON.parse(savedBrand) });
      }

      const savedCustomization = window.localStorage.getItem(
        "nlw-customization-settings"
      );
      if (savedCustomization) {
        setCustomization(deepMergeCustomization(JSON.parse(savedCustomization)));
      }
    } catch (error) {
      console.error("Unable to load saved settings:", error);
    }
  }, []);

  /* =========================================================
     SECTION 12: LOCALSTORAGE SAVE
  ========================================================= */

  useEffect(() => {
    try {
      window.localStorage.setItem("nlw-brand-settings", JSON.stringify(brand));
    } catch (error) {
      console.error("Unable to save brand settings:", error);
    }
  }, [brand]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "nlw-customization-settings",
        JSON.stringify(customization)
      );
    } catch (error) {
      console.error("Unable to save customization settings:", error);
    }
  }, [customization]);

  /* =========================================================
     SECTION 13: LOAD CLIENTS AFTER ADVISOR LOGIN
  ========================================================= */

  useEffect(() => {
    if (advisorAuthenticated) {
      loadSavedClients();
    }
  }, [advisorAuthenticated]);

  /* =========================================================
     SECTION 14: BRAND + CUSTOMIZATION FUNCTIONS
  ========================================================= */

  function updateBrand(key, value) {
    setBrand((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateCustomization(section, key, value) {
    if (section === "root") {
      setCustomization((prev) => ({
        ...prev,
        [key]: value,
      }));
      return;
    }

    setCustomization((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  }

  function resetCustomizationSettings() {
    setCustomization(defaultCustomization);
  }

  function toggleCustomizationSection(sectionKey) {
    setOpenCustomizationSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  }

  function openAllCustomizationSections() {
    setOpenCustomizationSections({
      globalFont: true,
      loginPage: true,
      previewHeader: true,
      clientGoal: true,
      strategyPurpose: true,
      mainPolicyPoints: true,
      policyDetails: true,
      comparison: true,
      disclosure: true,
      footer: true,
    });
  }

  function closeAllCustomizationSections() {
    setOpenCustomizationSections({
      globalFont: false,
      loginPage: false,
      previewHeader: false,
      clientGoal: false,
      strategyPurpose: false,
      mainPolicyPoints: false,
      policyDetails: false,
      comparison: false,
      disclosure: false,
      footer: false,
    });
  }

  function handleLogoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateBrand("logoImage", reader.result);
    reader.readAsDataURL(file);
  }

  function resetBrandSettings() {
    setBrand(defaultBrand);
  }

  /* =========================================================
     SECTION 15: BUILDER FUNCTIONS
  ========================================================= */

  function handleProductChange(product) {
    setSelectedProduct(product);

    if (product === "Disability Income") {
      setIllustrationCategory("Disability Income");
    } else if (
      product === "Term Life" ||
      product === "Whole Life" ||
      product === "Indexed Universal Life"
    ) {
      setIllustrationCategory("Life Insurance");
    } else if (
      product === "Fixed Indexed Annuity" ||
      product === "Income Annuity"
    ) {
      setIllustrationCategory("Annuity");
    }

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

  function toggleDefinition(field) {
    setExpandedDefinitionField((currentField) =>
      currentField === field ? null : field
    );
  }

  function getDefinition(field) {
    return (
      fieldDefinitions[field] ||
      "Definition not added yet. This term can be added to the fieldDefinitions object inside the code."
    );
  }

  function applyIllustrationToBuilder(illustration) {
    if (!illustration) return;

    setActiveIllustrationId(illustration.id);
    setActiveIllustrationPublished(Boolean(illustration.is_published));
    setIllustrationName(
      illustration.illustration_name ||
        `${illustration.product_type || "Product"} Illustration`
    );
    setIllustrationCategory(illustration.illustration_category || "Other");
    setSelectedProduct(illustration.product_type || "Fixed Indexed Annuity");
    setSelectedCarrier(illustration.carrier || "Ameritas");
    setCompareMode(Boolean(illustration.compare_mode));
    setComparisonProducts(
      Array.isArray(illustration.comparison_products) &&
        illustration.comparison_products.length
        ? illustration.comparison_products
        : ["Fixed Indexed Annuity", "Indexed Universal Life"]
    );
    setDetails(illustration.details || {});
    setCustomPoints(
      Array.isArray(illustration.custom_points)
        ? illustration.custom_points
        : []
    );
    setComparisonData(illustration.comparison_data || {});
    setClient((prev) => ({
      ...prev,
      goal: illustration.client_goal || prev.goal,
    }));
  }

  /* =========================================================
     SECTION 16: SUPABASE FUNCTIONS
  ========================================================= */

  async function testSupabaseConnection() {
    setDbMessage("Testing Supabase connection...");

    const { data, error } = await supabase.from("clients").select("*").limit(3);

    if (error) {
      setDbMessage(`Supabase error: ${error.message}`);
      alert(`Supabase error: ${error.message}`);
      return;
    }

    setDbMessage(`Supabase connected. Found ${data.length} saved client(s).`);
  }

  async function loadSavedClients() {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setDbMessage(`Could not load clients: ${error.message}`);
      return;
    }

    setSavedClients(data || []);
  }

  async function loadIllustrationsForClient(clientId) {
    if (!clientId) return;

    const { data, error } = await supabase
      .from("illustrations")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) {
      setDbMessage(`Could not load illustrations: ${error.message}`);
      return;
    }

    setSavedIllustrations(data || []);
  }

  async function saveClientProfile() {
    try {
      setDbMessage("Saving client profile...");

      const payload = {
        first_name: clientProfile.firstName,
        last_name: clientProfile.lastName,
        date_of_birth: clientProfile.dateOfBirth || null,
        email: clientProfile.email,
        phone: clientProfile.phone,
        access_code: clientProfile.accessCode,
        status: clientProfile.status || "prospect",
      };

      if (!payload.last_name || !payload.access_code) {
        const message = "Last name and access code are required.";
        setDbMessage(message);
        alert(message);
        return null;
      }

      if (activeClientId) {
        const { data, error } = await supabase
          .from("clients")
          .update(payload)
          .eq("id", activeClientId)
          .select("*")
          .single();

        if (error) {
          const message = `Could not update client: ${error.message}`;
          setDbMessage(message);
          alert(message);
          return null;
        }

        setDbMessage("Client profile updated.");
        await loadSavedClients();
        return data.id;
      }

      const { data, error } = await supabase
        .from("clients")
        .insert(payload)
        .select("*")
        .single();

      if (error) {
        const message = `Could not save client: ${error.message}`;
        setDbMessage(message);
        alert(message);
        return null;
      }

      setActiveClientId(data.id);
      setClient((prev) => ({
        ...prev,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      }));

      setDbMessage("Client profile saved.");
      await loadSavedClients();
      return data.id;
    } catch (error) {
      const message = `Unexpected client save error: ${error.message}`;
      console.error("Unexpected client save error:", error);
      setDbMessage(message);
      alert(message);
      return null;
    }
  }

  async function selectAdvisorClient(savedClient) {
    setActiveClientId(savedClient.id);
    setActiveIllustrationId("");
    setActiveIllustrationPublished(false);

    setClientProfile({
      firstName: savedClient.first_name || "",
      lastName: savedClient.last_name || "",
      dateOfBirth: savedClient.date_of_birth || "",
      email: savedClient.email || "",
      phone: savedClient.phone || "",
      accessCode: savedClient.access_code || "",
      status: savedClient.status || "prospect",
    });

    setClient((prev) => ({
      ...prev,
      name: `${savedClient.first_name || ""} ${savedClient.last_name || ""}`.trim(),
    }));

    await loadIllustrationsForClient(savedClient.id);
    setDbMessage(
      `Loaded ${savedClient.first_name || ""} ${savedClient.last_name || ""}.`
    );
  }

  async function saveIllustrationToClient() {
    try {
      setDbMessage("Saving illustration...");

      let clientId = activeClientId;

      if (!clientId) {
        setDbMessage("No active client selected. Saving client profile first...");
        clientId = await saveClientProfile();
      }

      if (!clientId) {
        const message =
          "Could not save illustration because no client profile is selected or saved.";
        setDbMessage(message);
        alert(message);
        return;
      }

      const payload = {
        client_id: clientId,
        illustration_name:
          illustrationName || `${selectedProduct} Illustration`,
        illustration_category: illustrationCategory,
        product_type: selectedProduct,
        carrier: selectedCarrier,
        client_goal: client.goal || "",
        details: details || {},
        custom_points: customPoints || [],
        comparison_data: comparisonData || {},
        comparison_products: comparisonProducts || [],
        compare_mode: Boolean(compareMode),
        updated_at: new Date().toISOString(),
      };

      console.log("Saving illustration payload:", payload);

      if (activeIllustrationId) {
        const { data, error } = await supabase
          .from("illustrations")
          .update(payload)
          .eq("id", activeIllustrationId)
          .select("*")
          .single();

        if (error) {
          console.error("Illustration update error:", error);
          const message = `Could not update illustration: ${error.message}`;
          setDbMessage(message);
          alert(message);
          return;
        }

        setActiveClientId(clientId);
        setActiveIllustrationId(data.id);
        setActiveIllustrationPublished(Boolean(data.is_published));

        applyIllustrationToBuilder(data);
        await loadIllustrationsForClient(clientId);

        setDbMessage("Illustration updated and saved to client.");
        alert("Illustration updated and saved to client.");
        return;
      }

      const { data, error } = await supabase
        .from("illustrations")
        .insert(payload)
        .select("*")
        .single();

      if (error) {
        console.error("Illustration insert error:", error);
        const message = `Could not save illustration: ${error.message}`;
        setDbMessage(message);
        alert(message);
        return;
      }

      setActiveClientId(clientId);
      setActiveIllustrationId(data.id);
      setActiveIllustrationPublished(Boolean(data.is_published));

      applyIllustrationToBuilder(data);
      await loadIllustrationsForClient(clientId);

      setDbMessage("Illustration saved to client.");
      alert("Illustration saved to client.");
    } catch (error) {
      console.error("Unexpected save illustration error:", error);
      const message = `Unexpected save error: ${error.message}`;
      setDbMessage(message);
      alert(message);
    }
  }

  async function setPublishedStatus(status) {
    try {
      if (!activeIllustrationId) {
        const message =
          "No illustration is saved yet. Click Save Illustration to Client first, then publish.";
        setDbMessage(message);
        alert(message);
        return;
      }

      setDbMessage(
        status ? "Publishing illustration..." : "Unpublishing illustration..."
      );

      const { data, error } = await supabase
        .from("illustrations")
        .update({
          is_published: Boolean(status),
          updated_at: new Date().toISOString(),
        })
        .eq("id", activeIllustrationId)
        .select("*")
        .single();

      if (error) {
        console.error("Publish status error:", error);
        const message = `Could not update publish status: ${error.message}`;
        setDbMessage(message);
        alert(message);
        return;
      }

      setActiveIllustrationPublished(Boolean(data.is_published));

      if (data.client_id) {
        await loadIllustrationsForClient(data.client_id);
      }

      const message = status
        ? "Illustration published to client portal."
        : "Illustration unpublished.";

      setDbMessage(message);
      alert(message);
    } catch (error) {
      console.error("Unexpected publish error:", error);
      const message = `Unexpected publish error: ${error.message}`;
      setDbMessage(message);
      alert(message);
    }
  }

  async function handleClientPortalLogin() {
    setDbMessage("Checking client login...");

    if (!clientLogin.lastName || !clientLogin.dateOfBirth || !clientLogin.accessCode) {
      setDbMessage("Enter last name, date of birth, and access code.");
      return;
    }

    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .select("*")
      .ilike("last_name", clientLogin.lastName.trim())
      .eq("date_of_birth", clientLogin.dateOfBirth)
      .eq("access_code", clientLogin.accessCode.trim())
      .maybeSingle();

    if (clientError) {
      setDbMessage(`Client login error: ${clientError.message}`);
      return;
    }

    if (!clientData) {
      setDbMessage("No matching client portal record found.");
      return;
    }

    const { data: illustrationData, error: illustrationError } = await supabase
      .from("illustrations")
      .select("*")
      .eq("client_id", clientData.id)
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (illustrationError) {
      setDbMessage(
        `Could not load client illustrations: ${illustrationError.message}`
      );
      return;
    }

    setClientPortalRecord(clientData);
    setClientPortalIllustrations(illustrationData || []);
    setClientAuthenticated(true);
    setAdvisorAuthenticated(false);

    if (illustrationData?.[0]) {
      setClient((prev) => ({
        ...prev,
        name: `${clientData.first_name || ""} ${clientData.last_name || ""}`.trim(),
        goal: illustrationData[0].client_goal || prev.goal,
      }));
      applyIllustrationToBuilder(illustrationData[0]);
    }

    setDbMessage("");
  }

  function logout() {
    setAdvisorAuthenticated(false);
    setClientAuthenticated(false);
    setPassword("");
    setClientPortalRecord(null);
    setClientPortalIllustrations([]);
    setActiveClientId("");
    setActiveIllustrationId("");
    setActiveIllustrationPublished(false);
    setIllustrationName("Retirement Income Strategy");
    setIllustrationCategory("Annuity");
  }

  /* =========================================================
     SECTION 17: CUSTOMIZATION FORM CONTROLS
  ========================================================= */

  function ColorControl({ section, field, label }) {
    return (
      <div className="rounded-2xl border bg-gray-50 p-3">
        <label className={labelClass()}>{label}</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            className="h-11 w-14 cursor-pointer rounded-xl border bg-white p-1"
            value={customization[section][field]}
            onChange={(e) => updateCustomization(section, field, e.target.value)}
          />
          <input
            className={inputClass()}
            value={customization[section][field]}
            onChange={(e) => updateCustomization(section, field, e.target.value)}
          />
        </div>
      </div>
    );
  }

  function TextControl({ section, field, label, placeholder }) {
    const value =
      section === "root"
        ? customization[field]
        : customization[section][field];

    return (
      <div className="rounded-2xl border bg-gray-50 p-3">
        <label className={labelClass()}>{label}</label>
        <input
          className={inputClass()}
          value={value}
          placeholder={placeholder || ""}
          onChange={(e) => updateCustomization(section, field, e.target.value)}
        />
      </div>
    );
  }

  function CustomizationSection({ sectionKey, title, children }) {
    const isOpen = openCustomizationSections[sectionKey];

    return (
      <div className="mb-4 overflow-hidden rounded-2xl border bg-white">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-gray-50"
          onClick={() => toggleCustomizationSection(sectionKey)}
        >
          <div>
            <h3 className="font-black text-gray-950">{title}</h3>
            <p className="text-xs text-gray-500">
              {isOpen
                ? "Click to close this section"
                : "Click to customize this section"}
            </p>
          </div>

          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg font-black transition-all duration-300 ${
              isOpen
                ? "rotate-45 bg-gray-950 text-white"
                : "rotate-0 bg-white text-gray-950"
            }`}
          >
            +
          </span>
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="grid gap-3 border-t bg-gray-50 p-4 sm:grid-cols-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     SECTION 18: CUSTOMIZATION TAB
  ========================================================= */

  function CustomizationTab() {
    return (
      <Card className="rounded-3xl shadow-sm">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Customization</h2>
              <p className="text-sm text-gray-500">
                Customize login page, fonts, section colors, text colors, font
                sizes, logos, and roundness.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={openAllCustomizationSections}>
                Open All
              </Button>

              <Button variant="outline" onClick={closeAllCustomizationSections}>
                Close All
              </Button>

              <Button variant="outline" onClick={resetCustomizationSettings}>
                Reset
              </Button>
            </div>
          </div>

          <CustomizationSection sectionKey="globalFont" title="Global Font">
            <div className="rounded-2xl border bg-gray-50 p-3 sm:col-span-2">
              <label className={labelClass()}>Font Family</label>
              <select
                className={inputClass()}
                value={customization.fontFamily}
                onChange={(e) =>
                  setCustomization((prev) => ({
                    ...prev,
                    fontFamily: e.target.value,
                  }))
                }
              >
                <option value="Inter, Arial, sans-serif">Inter / Arial</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Times New Roman', serif">Times New Roman</option>
                <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                <option value="'Courier New', monospace">Courier New</option>
              </select>
            </div>
          </CustomizationSection>

          <CustomizationSection sectionKey="loginPage" title="Login Page">
            <ColorControl section="login" field="background" label="Background" />
            <ColorControl section="login" field="cardBackground" label="Card Background" />
            <ColorControl section="login" field="titleColor" label="Title Text" />
            <ColorControl section="login" field="subtitleColor" label="Subtitle Text" />
            <ColorControl section="login" field="labelColor" label="Label Text" />
            <ColorControl section="login" field="helpTextColor" label="Help Text" />
            <ColorControl section="login" field="buttonBackground" label="Button Background" />
            <ColorControl section="login" field="buttonText" label="Button Text" />
            <ColorControl section="login" field="tabActiveBackground" label="Active Tab Background" />
            <ColorControl section="login" field="tabActiveText" label="Active Tab Text" />
            <ColorControl section="login" field="tabInactiveText" label="Inactive Tab Text" />
            <TextControl section="login" field="logoPath" label="Login Logo Path" placeholder="/nlw-logo.png" />
            <TextControl section="login" field="logoRoundness" label="Logo Roundness" placeholder="16px" />
            <TextControl section="login" field="cardRoundness" label="Card Roundness" placeholder="24px" />
            <TextControl section="login" field="inputRoundness" label="Input Roundness" placeholder="12px" />
            <TextControl section="login" field="buttonRoundness" label="Button Roundness" placeholder="12px" />
          </CustomizationSection>

          <CustomizationSection sectionKey="previewHeader" title="Preview Header">
            <ColorControl section="previewHeader" field="background" label="Header Background" />
            <ColorControl section="previewHeader" field="titleColor" label="Title Text" />
            <ColorControl section="previewHeader" field="subtitleColor" label="Subtitle Text" />
            <ColorControl section="previewHeader" field="badgeBackground" label="Badge Background" />
            <ColorControl section="previewHeader" field="badgeTextColor" label="Badge Text" />
            <ColorControl section="previewHeader" field="carrierBoxBackground" label="Carrier Box Background" />
            <ColorControl section="previewHeader" field="carrierTextColor" label="Carrier Text" />
            <TextControl section="previewHeader" field="titleSize" label="Title Font Size" placeholder="36px" />
            <TextControl section="previewHeader" field="subtitleSize" label="Subtitle Font Size" placeholder="14px" />
            <TextControl section="previewHeader" field="logoRoundness" label="Business Logo Roundness" placeholder="16px" />
            <TextControl section="previewHeader" field="carrierLogoRoundness" label="Carrier Logo Roundness" placeholder="8px" />
          </CustomizationSection>

          <CustomizationSection sectionKey="clientGoal" title="Client Goal">
            <ColorControl section="clientGoal" field="background" label="Background" />
            <ColorControl section="clientGoal" field="titleColor" label="Title Text" />
            <ColorControl section="clientGoal" field="textColor" label="Body Text" />
            <TextControl section="clientGoal" field="titleSize" label="Title Size" placeholder="14px" />
            <TextControl section="clientGoal" field="textSize" label="Text Size" placeholder="18px" />
            <TextControl section="clientGoal" field="roundness" label="Roundness" placeholder="24px" />
          </CustomizationSection>

          <CustomizationSection sectionKey="strategyPurpose" title="Strategy Purpose">
            <ColorControl section="strategyPurpose" field="background" label="Background" />
            <ColorControl section="strategyPurpose" field="titleColor" label="Title Text" />
            <ColorControl section="strategyPurpose" field="textColor" label="Body Text" />
            <TextControl section="strategyPurpose" field="titleSize" label="Title Size" placeholder="14px" />
            <TextControl section="strategyPurpose" field="textSize" label="Text Size" placeholder="14px" />
            <TextControl section="strategyPurpose" field="roundness" label="Roundness" placeholder="24px" />
          </CustomizationSection>

          <CustomizationSection sectionKey="mainPolicyPoints" title="Main Policy Points">
            <ColorControl section="mainPolicyPoints" field="background" label="Background" />
            <ColorControl section="mainPolicyPoints" field="titleColor" label="Title Text" />
            <ColorControl section="mainPolicyPoints" field="textColor" label="Body Text" />
            <ColorControl section="mainPolicyPoints" field="bulletColor" label="Bullet Color" />
            <TextControl section="mainPolicyPoints" field="titleSize" label="Title Size" placeholder="20px" />
            <TextControl section="mainPolicyPoints" field="textSize" label="Text Size" placeholder="14px" />
            <TextControl section="mainPolicyPoints" field="roundness" label="Roundness" placeholder="24px" />
          </CustomizationSection>

          <CustomizationSection sectionKey="policyDetails" title="Policy Details">
            <ColorControl section="policyDetails" field="background" label="Background" />
            <ColorControl section="policyDetails" field="titleColor" label="Title Text" />
            <ColorControl section="policyDetails" field="labelColor" label="Label Text" />
            <ColorControl section="policyDetails" field="valueColor" label="Value Text" />
            <ColorControl section="policyDetails" field="rowBackground" label="Row Background" />
            <TextControl section="policyDetails" field="titleSize" label="Title Size" placeholder="20px" />
            <TextControl section="policyDetails" field="textSize" label="Text Size" placeholder="14px" />
            <TextControl section="policyDetails" field="roundness" label="Roundness" placeholder="24px" />
            <TextControl section="policyDetails" field="rowRoundness" label="Row Roundness" placeholder="12px" />
          </CustomizationSection>

          <CustomizationSection sectionKey="comparison" title="Comparison">
            <ColorControl section="comparison" field="background" label="Background" />
            <ColorControl section="comparison" field="titleColor" label="Title Text" />
            <ColorControl section="comparison" field="tableHeaderBackground" label="Table Header Background" />
            <ColorControl section="comparison" field="textColor" label="Text Color" />
            <TextControl section="comparison" field="titleSize" label="Title Size" placeholder="20px" />
            <TextControl section="comparison" field="textSize" label="Text Size" placeholder="14px" />
            <TextControl section="comparison" field="roundness" label="Roundness" placeholder="24px" />
          </CustomizationSection>

          <CustomizationSection sectionKey="disclosure" title="Disclosure">
            <ColorControl section="disclosure" field="background" label="Background" />
            <ColorControl section="disclosure" field="borderColor" label="Border Color" />
            <ColorControl section="disclosure" field="titleColor" label="Title Text" />
            <ColorControl section="disclosure" field="textColor" label="Body Text" />
            <TextControl section="disclosure" field="titleSize" label="Title Size" placeholder="14px" />
            <TextControl section="disclosure" field="textSize" label="Text Size" placeholder="14px" />
            <TextControl section="disclosure" field="roundness" label="Roundness" placeholder="24px" />
          </CustomizationSection>

          <CustomizationSection sectionKey="footer" title="Footer">
            <ColorControl section="footer" field="textColor" label="Footer Text" />
            <ColorControl section="footer" field="strongTextColor" label="Strong Text" />
            <TextControl section="footer" field="textSize" label="Footer Font Size" placeholder="14px" />
          </CustomizationSection>
        </CardContent>
      </Card>
    );
  }

  /* =========================================================
     SECTION 19: BRANDING TAB
  ========================================================= */

  function BrandingTab() {
    return (
      <Card className="rounded-3xl shadow-sm">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Branding Settings</h2>
              <p className="text-sm text-gray-500">
                Customize the colors and logo used in the client preview and PDF.
              </p>
            </div>
            <Button variant="outline" onClick={resetBrandSettings}>
              Reset
            </Button>
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
                <Button
                  variant="outline"
                  onClick={() => updateBrand("logoImage", "")}
                >
                  Remove Logo
                </Button>
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
                <input
                  className={inputClass()}
                  value={brand[key]}
                  onChange={(e) => updateBrand(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  /* =========================================================
     SECTION 20: BUILDER TAB
  ========================================================= */

  function BuilderTab() {
    return (
      <>
        <Card className="rounded-3xl shadow-sm">
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">Supabase Tools</h2>
                <p className="text-sm text-gray-500">
                  Test connection, save clients, and publish summaries.
                </p>
              </div>
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              <Button variant="outline" onClick={testSupabaseConnection}>
                Test Supabase
              </Button>
              <Button variant="outline" onClick={loadSavedClients}>
                Refresh Clients
              </Button>
            </div>

            {dbMessage && (
              <div className="rounded-2xl bg-gray-50 p-3 text-sm font-medium text-gray-700">
                {dbMessage}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm">
          <CardContent className="p-5">
            <h2 className="mb-4 text-lg font-bold">Client Profile</h2>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClass()}>First Name</label>
                <input
                  className={inputClass()}
                  value={clientProfile.firstName}
                  onChange={(e) =>
                    setClientProfile({
                      ...clientProfile,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className={labelClass()}>Last Name</label>
                <input
                  className={inputClass()}
                  value={clientProfile.lastName}
                  onChange={(e) =>
                    setClientProfile({
                      ...clientProfile,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className={labelClass()}>Date of Birth</label>
                <input
                  type="date"
                  className={inputClass()}
                  value={clientProfile.dateOfBirth}
                  onChange={(e) =>
                    setClientProfile({
                      ...clientProfile,
                      dateOfBirth: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className={labelClass()}>Access Code</label>
                <input
                  className={inputClass()}
                  value={clientProfile.accessCode}
                  onChange={(e) =>
                    setClientProfile({
                      ...clientProfile,
                      accessCode: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className={labelClass()}>Email</label>
                <input
                  className={inputClass()}
                  value={clientProfile.email}
                  onChange={(e) =>
                    setClientProfile({
                      ...clientProfile,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className={labelClass()}>Phone</label>
                <input
                  className={inputClass()}
                  value={clientProfile.phone}
                  onChange={(e) =>
                    setClientProfile({
                      ...clientProfile,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={saveClientProfile}>Save Client Profile</Button>

              <Button
                variant="outline"
                onClick={() => {
                  setActiveClientId("");
                  setActiveIllustrationId("");
                  setActiveIllustrationPublished(false);
                  setSavedIllustrations([]);
                  setIllustrationName("Retirement Income Strategy");
                  setIllustrationCategory("Annuity");
                  setClientProfile({
                    firstName: "",
                    lastName: "",
                    dateOfBirth: "",
                    email: "",
                    phone: "",
                    accessCode: "123456",
                    status: "prospect",
                  });
                }}
              >
                New Client
              </Button>
            </div>

            {savedClients.length > 0 && (
              <div className="mt-5">
                <label className={labelClass()}>Saved Clients</label>
                <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
                  {savedClients.map((savedClient) => (
                    <button
                      key={savedClient.id}
                      className={`w-full rounded-xl border px-3 py-2 text-left text-sm ${
                        activeClientId === savedClient.id
                          ? "border-gray-950 bg-gray-100"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => selectAdvisorClient(savedClient)}
                    >
                      <span className="font-bold">
                        {savedClient.first_name} {savedClient.last_name}
                      </span>
                      <span className="block text-xs text-gray-500">
                        DOB: {savedClient.date_of_birth || "—"} • Code:{" "}
                        {savedClient.access_code || "—"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl shadow-sm">
          <CardContent className="p-5">
            <h2 className="mb-4 text-lg font-bold">Client Info</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.keys(client).map((key) => (
                <div
                  key={key}
                  className={key === "goal" ? "sm:col-span-2" : ""}
                >
                  <label className={labelClass()}>{key}</label>
                  {key === "goal" ? (
                    <textarea
                      className={inputClass()}
                      rows={3}
                      value={client[key]}
                      onChange={(e) =>
                        setClient({ ...client, [key]: e.target.value })
                      }
                    />
                  ) : (
                    <input
                      className={inputClass()}
                      value={client[key]}
                      onChange={(e) =>
                        setClient({ ...client, [key]: e.target.value })
                      }
                    />
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
                <input
                  type="checkbox"
                  checked={compareMode}
                  onChange={(e) => setCompareMode(e.target.checked)}
                />{" "}
                Comparison
              </label>
            </div>

            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClass()}>Illustration Name</label>
                <input
                  className={inputClass()}
                  value={illustrationName}
                  onChange={(e) => setIllustrationName(e.target.value)}
                  placeholder="Example: Retirement Income Strategy"
                />
              </div>

              <div>
                <label className={labelClass()}>Illustration Category</label>
                <select
                  className={inputClass()}
                  value={illustrationCategory}
                  onChange={(e) => setIllustrationCategory(e.target.value)}
                >
                  <option>Annuity</option>
                  <option>Life Insurance</option>
                  <option>Disability Income</option>
                  <option>Comparison</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <label className={labelClass()}>Carrier</label>
            <select
              className={`${inputClass()} mb-4`}
              value={selectedCarrier}
              onChange={(e) => setSelectedCarrier(e.target.value)}
            >
              {Object.keys(carriers).map((carrier) => (
                <option key={carrier} value={carrier}>
                  {carrier}
                </option>
              ))}
            </select>

            {selectedCarrierData && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl border bg-gray-50 p-3">
                <img
                  src={selectedCarrierData.logo}
                  alt={`${selectedCarrierData.name} logo`}
                  className="max-h-16 max-w-[220px] object-contain"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Selected Carrier
                  </p>
                  <p className="text-sm font-bold text-gray-950">
                    {selectedCarrierData.name}
                  </p>
                </div>
              </div>
            )}

            <label className={labelClass()}>Product Presented</label>
            <select
              className={inputClass()}
              value={selectedProduct}
              onChange={(e) => handleProductChange(e.target.value)}
            >
              {Object.keys(productTemplates).map((product) => (
                <option key={product}>{product}</option>
              ))}
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
                  <input
                    className={inputClass()}
                    value={details[field] || ""}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        [field]: e.target.value,
                      })
                    }
                    placeholder="Enter from official carrier illustration"
                  />
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
                <div
                  key={index}
                  className="flex gap-2 rounded-xl bg-gray-50 p-2 text-sm"
                >
                  <span className="flex-1">{point}</span>
                  <button
                    onClick={() =>
                      setCustomPoints(
                        customPoints.filter((_, i) => i !== index)
                      )
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                className={inputClass()}
                value={newPoint}
                onChange={(e) => setNewPoint(e.target.value)}
                placeholder="Add custom point"
              />
              <Button onClick={addCustomPoint}>
                <Plus size={16} />
              </Button>
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
                    <label className={labelClass()}>
                      Compare Product {index + 1}
                    </label>
                    <select
                      className={inputClass()}
                      value={comparisonProducts[index]}
                      onChange={(e) => {
                        const next = [...comparisonProducts];
                        next[index] = e.target.value;
                        setComparisonProducts(next);
                      }}
                    >
                      {Object.keys(productTemplates).map((product) => (
                        <option key={product}>{product}</option>
                      ))}
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
                          <input
                            className={inputClass()}
                            value={(comparisonData[product] || {})[row] || ""}
                            onChange={(e) =>
                              updateComparison(product, row, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="rounded-3xl shadow-sm">
          <CardContent className="p-5">
            <h2 className="mb-4 text-lg font-bold">
              Illustration Save / Publish
            </h2>

            <div className="mb-4 rounded-2xl bg-gray-50 p-3 text-sm">
              <p>
                <strong>Active client:</strong>{" "}
                {activeClientId
                  ? `${clientProfile.firstName} ${clientProfile.lastName}`
                  : "None selected"}
              </p>
              <p>
                <strong>Active illustration:</strong>{" "}
                {activeIllustrationId
                  ? `${illustrationName || selectedProduct} (${illustrationCategory})`
                  : "None saved yet"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {activeIllustrationPublished
                  ? "Published to client"
                  : "Draft / unpublished"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={saveIllustrationToClient}>
                Save Illustration to Client
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setActiveIllustrationId("");
                  setActiveIllustrationPublished(false);
                  setIllustrationName("");
                  setIllustrationCategory("Annuity");
                  setDbMessage("Ready to create a new illustration for this client.");
                }}
              >
                New Illustration for This Client
              </Button>

              <Button variant="outline" onClick={() => setPublishedStatus(true)}>
                Publish
              </Button>

              <Button variant="outline" onClick={() => setPublishedStatus(false)}>
                Unpublish
              </Button>
            </div>

            {dbMessage && (
              <div className="mt-4 rounded-2xl bg-gray-50 p-3 text-sm font-medium text-gray-700">
                {dbMessage}
              </div>
            )}

            {savedIllustrations.length > 0 && (
              <div className="mt-5">
                <label className={labelClass()}>
                  Saved Illustrations for Client
                </label>
                <div className="space-y-2">
                  {savedIllustrations.map((illustration) => (
                    <button
                      key={illustration.id}
                      className={`w-full rounded-xl border px-3 py-2 text-left text-sm ${
                        activeIllustrationId === illustration.id
                          ? "border-gray-950 bg-gray-100"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => applyIllustrationToBuilder(illustration)}
                    >
                      <span className="font-bold">
                        {illustration.illustration_name ||
                          `${illustration.product_type} Illustration`}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {illustration.illustration_category || "Other"} •{" "}
                        {illustration.product_type} •{" "}
                        {illustration.is_published ? "Published" : "Draft"} •{" "}
                        {new Date(illustration.created_at).toLocaleDateString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </>
    );
  }

  /* =========================================================
     SECTION 21: LOGIN PAGE
  ========================================================= */

  if (!advisorAuthenticated && !clientAuthenticated) {
    return (
      <div
        className="min-h-screen p-6 text-white"
        style={{
          backgroundColor: loginTheme.background,
          fontFamily: customization.fontFamily,
        }}
      >
        <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <Card
              className="border-gray-800 shadow-2xl backdrop-blur"
              style={{
                backgroundColor: loginTheme.cardBackground,
                borderRadius: loginTheme.cardRoundness,
              }}
            >
              <CardContent className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className="flex h-16 w-16 items-center justify-center p-2"
                    style={{ borderRadius: loginTheme.logoRoundness }}
                  >
                    <img
                      src={loginTheme.logoPath}
                      alt="Nemnich Life & Wealth logo"
                      className="max-h-full max-w-full object-contain"
                      style={{ borderRadius: loginTheme.logoRoundness }}
                    />
                  </div>
                  <div>
                    <h1
                      className="text-2xl font-bold"
                      style={{ color: loginTheme.titleColor }}
                    >
                      Nemnich Life and Wealth
                    </h1>
                    <p
                      className="text-sm"
                      style={{ color: loginTheme.subtitleColor }}
                    >
                      Advisor and client access
                    </p>
                  </div>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-white/5 p-2">
                  <button
                    className="rounded-xl px-3 py-2 text-sm font-bold"
                    style={{
                      background:
                        portalMode === "advisor"
                          ? loginTheme.tabActiveBackground
                          : "transparent",
                      color:
                        portalMode === "advisor"
                          ? loginTheme.tabActiveText
                          : loginTheme.tabInactiveText,
                    }}
                    onClick={() => setPortalMode("advisor")}
                  >
                    Advisor
                  </button>
                  <button
                    className="rounded-xl px-3 py-2 text-sm font-bold"
                    style={{
                      background:
                        portalMode === "client"
                          ? loginTheme.tabActiveBackground
                          : "transparent",
                      color:
                        portalMode === "client"
                          ? loginTheme.tabActiveText
                          : loginTheme.tabInactiveText,
                    }}
                    onClick={() => setPortalMode("client")}
                  >
                    Client
                  </button>
                </div>

                {portalMode === "advisor" ? (
                  <>
                    <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                      <div
                        className="mb-2 flex items-center gap-2 font-semibold"
                        style={{ color: loginTheme.titleColor }}
                      >
                        <Lock size={16} /> Advisor Access
                      </div>
                      <p style={{ color: loginTheme.helpTextColor }}>
                        Enter your private advisor password to access the builder.
                      </p>
                    </div>

                    <label
                      className="mb-2 block text-sm font-semibold"
                      style={{ color: loginTheme.labelColor }}
                    >
                      Advisor Password
                    </label>
                    <input
                      className="w-full border border-white/10 bg-white px-4 py-3 text-gray-950 outline-none"
                      style={{ borderRadius: loginTheme.inputRoundness }}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && password === advisorPassword) {
                          setAdvisorAuthenticated(true);
                        }
                      }}
                    />

                    <Button
                      className="mt-4 w-full py-6 text-base font-bold"
                      style={{
                        backgroundColor: loginTheme.buttonBackground,
                        color: loginTheme.buttonText,
                        borderRadius: loginTheme.buttonRoundness,
                      }}
                      onClick={() =>
                        setAdvisorAuthenticated(password === advisorPassword)
                      }
                    >
                      Enter Advisor Builder
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
                      <div
                        className="mb-2 flex items-center gap-2 font-semibold"
                        style={{ color: loginTheme.titleColor }}
                      >
                        <UserCheck size={16} /> Client Portal Access
                      </div>
                      <p style={{ color: loginTheme.helpTextColor }}>
                        Use the last name, date of birth, and access code created
                        by the advisor.
                      </p>
                    </div>

                    <label
                      className="mb-2 block text-sm font-semibold"
                      style={{ color: loginTheme.labelColor }}
                    >
                      Last Name
                    </label>
                    <input
                      className="mb-3 w-full border border-white/10 bg-white px-4 py-3 text-gray-950 outline-none"
                      style={{ borderRadius: loginTheme.inputRoundness }}
                      value={clientLogin.lastName}
                      onChange={(e) =>
                        setClientLogin({
                          ...clientLogin,
                          lastName: e.target.value,
                        })
                      }
                      placeholder="Example"
                    />

                    <label
                      className="mb-2 block text-sm font-semibold"
                      style={{ color: loginTheme.labelColor }}
                    >
                      Date of Birth
                    </label>
                    <input
                      className="mb-3 w-full border border-white/10 bg-white px-4 py-3 text-gray-950 outline-none"
                      style={{ borderRadius: loginTheme.inputRoundness }}
                      type="date"
                      value={clientLogin.dateOfBirth}
                      onChange={(e) =>
                        setClientLogin({
                          ...clientLogin,
                          dateOfBirth: e.target.value,
                        })
                      }
                    />

                    <label
                      className="mb-2 block text-sm font-semibold"
                      style={{ color: loginTheme.labelColor }}
                    >
                      Access Code
                    </label>
                    <input
                      className="w-full border border-white/10 bg-white px-4 py-3 text-gray-950 outline-none"
                      style={{ borderRadius: loginTheme.inputRoundness }}
                      value={clientLogin.accessCode}
                      onChange={(e) =>
                        setClientLogin({
                          ...clientLogin,
                          accessCode: e.target.value,
                        })
                      }
                      placeholder="123456"
                    />

                    <Button
                      className="mt-4 w-full py-6 text-base font-bold"
                      style={{
                        backgroundColor: loginTheme.buttonBackground,
                        color: loginTheme.buttonText,
                        borderRadius: loginTheme.buttonRoundness,
                      }}
                      onClick={handleClientPortalLogin}
                    >
                      Enter Client Portal
                    </Button>
                  </>
                )}

                {dbMessage && (
                  <p className="mt-4 rounded-xl bg-white/10 p-3 text-sm text-white">
                    {dbMessage}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  /* =========================================================
     SECTION 22: ADVISOR / CLIENT PORTAL MAIN VIEW
  ========================================================= */

  return (
    <div
      className="min-h-screen text-gray-950"
      style={{
        backgroundColor: brand.pageBackgroundColor,
        fontFamily: customization.fontFamily,
      }}
    >
      <style>{`
        @page {
          size: letter;
          margin: 0.5in;
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

          .main-policy-list {
            max-height: none !important;
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

      {/* =====================================================
          SECTION 23: TOP NAVIGATION
      ===================================================== */}

      <div className="no-print border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            {brand.logoImage ? (
              <img
                src={brand.logoImage}
                alt={`${brand.businessName} logo`}
                className="h-11 w-11 bg-white object-contain p-1"
                style={{ borderRadius: customization.previewHeader.logoRoundness }}
              />
            ) : (
              <div
                className="flex h-11 w-11 items-center justify-center text-sm font-black text-white"
                style={{
                  background: brand.primaryColor,
                  borderRadius: customization.previewHeader.logoRoundness,
                }}
              >
                {brand.logoText}
              </div>
            )}

            <div>
              <h1 className="text-lg font-bold">
                {clientAuthenticated
                  ? `${brand.businessName} Client Portal`
                  : `${brand.businessName} Illustration Builder`}
              </h1>
              <p className="text-xs text-gray-500">
                {clientAuthenticated
                  ? "Published client planning summary"
                  : "Manual-entry advisor sales summary generator"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {advisorAuthenticated && (
              <>
                <Button
                  variant={activeTab === "builder" ? "default" : "outline"}
                  onClick={() => setActiveTab("builder")}
                >
                  <FileText size={16} className="mr-2" /> Builder
                </Button>

                <Button
                  variant={activeTab === "branding" ? "default" : "outline"}
                  onClick={() => setActiveTab("branding")}
                >
                  <Settings size={16} className="mr-2" /> Branding
                </Button>

                <Button
                  variant={activeTab === "customization" ? "default" : "outline"}
                  onClick={() => setActiveTab("customization")}
                >
                  <Settings size={16} className="mr-2" /> Customization
                </Button>
              </>
            )}

            <Button onClick={printPage}>
              <Download size={16} className="mr-2" /> Print / Save PDF
            </Button>

            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* =====================================================
          SECTION 24: MAIN GRID LAYOUT
      ===================================================== */}

      <div
        className={`mx-auto grid max-w-7xl gap-6 p-5 ${
          clientAuthenticated ? "lg:grid-cols-1" : "lg:grid-cols-[420px_1fr]"
        }`}
      >
        {advisorAuthenticated && (
          <div className="no-print space-y-4">
            {activeTab === "branding"
              ? BrandingTab()
              : activeTab === "customization"
              ? CustomizationTab()
              : BuilderTab()}
          </div>
        )}

        {/* =====================================================
            SECTION 25: CLIENT PORTAL STATUS PANEL
        ===================================================== */}

        {clientAuthenticated && (
          <div className="no-print mx-auto mb-2 w-full max-w-4xl rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-lg font-bold">Client Portal</h2>
            <p className="text-sm text-gray-600">
              Logged in as{" "}
              <strong>
                {clientPortalRecord?.first_name} {clientPortalRecord?.last_name}
              </strong>
              . Only published illustrations are shown.
            </p>

            {clientPortalIllustrations.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {clientPortalIllustrations.map((illustration) => (
                  <button
                    key={illustration.id}
                    className={`rounded-2xl border p-4 text-left transition hover:border-gray-950 hover:bg-gray-50 ${
                      activeIllustrationId === illustration.id
                        ? "border-gray-950 bg-gray-100"
                        : "bg-white"
                    }`}
                    onClick={() => applyIllustrationToBuilder(illustration)}
                  >
                    <span className="block text-sm font-black text-gray-950">
                      {illustration.illustration_name ||
                        `${illustration.product_type} Illustration`}
                    </span>
                    <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {illustration.illustration_category || "Other"}
                    </span>
                    <span className="mt-2 block text-sm text-gray-600">
                      {illustration.product_type} • {illustration.carrier || "Carrier"}
                    </span>
                    <span className="mt-3 inline-flex rounded-full bg-gray-950 px-3 py-1 text-xs font-bold text-white">
                      View Illustration
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =====================================================
            SECTION 26: CLIENT ILLUSTRATION PREVIEW / PRINT AREA
        ===================================================== */}

        <div className="print-area mx-auto w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl">
          {/* =====================================================
              SECTION 26A: PREVIEW HEADER
          ===================================================== */}

          <div
            className="p-8 text-white print-section"
            style={{ background: customization.previewHeader.background }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <div
                  className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                  style={{
                    background: customization.previewHeader.badgeBackground,
                    color: customization.previewHeader.badgeTextColor,
                  }}
                >
                  <Eye size={14} /> Client Planning Summary
                </div>

                <h1
                  className="font-black tracking-tight"
                  style={{
                    color: customization.previewHeader.titleColor,
                    fontSize: customization.previewHeader.titleSize,
                  }}
                >
                  {illustrationName || selectedProduct}
                </h1>

                <p
                  className="mt-2 max-w-2xl"
                  style={{
                    color: customization.previewHeader.subtitleColor,
                    fontSize: customization.previewHeader.subtitleSize,
                  }}
                >
                  Prepared for {client.name} • Age {client.age} • {client.state}{" "}
                  • {client.preparedDate}
                </p>

                <p
                  className="mt-1 max-w-2xl text-xs font-semibold uppercase tracking-wide"
                  style={{
                    color: customization.previewHeader.subtitleColor,
                  }}
                >
                  {illustrationCategory} • {selectedProduct}
                </p>

                {selectedCarrierData && (
                  <div
                    className="mt-4 inline-flex items-center gap-3 px-4 py-2"
                    style={{
                      background:
                        customization.previewHeader.carrierBoxBackground,
                      borderRadius:
                        customization.previewHeader.carrierLogoRoundness,
                    }}
                  >
                    <span
                      className="flex items-center text-xs font-semibold uppercase tracking-wide"
                      style={{
                        color: customization.previewHeader.carrierTextColor,
                      }}
                    >
                      Carrier
                    </span>

                    <div className="flex h-12 items-center">
                      <img
                        src={selectedCarrierData.logo}
                        alt={`${selectedCarrierData.name} logo`}
                        className="max-h-12 max-w-[220px] object-contain"
                        style={{
                          borderRadius:
                            customization.previewHeader.carrierLogoRoundness,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="text-right">
                {brand.logoImage ? (
                  <img
                    src={brand.logoImage}
                    alt={`${brand.businessName} logo`}
                    className="ml-auto max-h-24 max-w-[220px] object-contain p-3"
                    style={{
                      borderRadius: customization.previewHeader.logoRoundness,
                    }}
                  />
                ) : (
                  <div
                    className="ml-auto flex h-16 w-16 items-center justify-center bg-white text-xl font-black"
                    style={{
                      color: brand.primaryColor,
                      borderRadius: customization.previewHeader.logoRoundness,
                    }}
                  >
                    {brand.logoText}
                  </div>
                )}
                <p className="mt-3 text-sm font-bold">{brand.businessName}</p>
                <p className="text-xs text-white/70">{brand.tagline}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* =====================================================
                SECTION 26B: CLIENT GOAL + STRATEGY PURPOSE
            ===================================================== */}

            <div className="print-section mb-6 grid gap-4 md:grid-cols-3">
              <div
                className="border p-5 md:col-span-2"
                style={{
                  background: customization.clientGoal.background,
                  borderRadius: customization.clientGoal.roundness,
                }}
              >
                <div
                  className="mb-2 flex items-center gap-2 font-bold"
                  style={{
                    color: customization.clientGoal.titleColor,
                    fontSize: customization.clientGoal.titleSize,
                  }}
                >
                  <ShieldCheck size={18} /> Client Goal
                </div>
                <p
                  className="font-semibold leading-snug"
                  style={{
                    color: customization.clientGoal.textColor,
                    fontSize: customization.clientGoal.textSize,
                  }}
                >
                  {client.goal}
                </p>
              </div>

              <div
                className="border p-5"
                style={{
                  background: customization.strategyPurpose.background,
                  borderRadius: customization.strategyPurpose.roundness,
                }}
              >
                <div
                  className="mb-2 font-bold"
                  style={{
                    color: customization.strategyPurpose.titleColor,
                    fontSize: customization.strategyPurpose.titleSize,
                  }}
                >
                  Strategy Purpose
                </div>
                <p
                  className="leading-relaxed"
                  style={{
                    color: customization.strategyPurpose.textColor,
                    fontSize: customization.strategyPurpose.textSize,
                  }}
                >
                  {template.goal}
                </p>
              </div>
            </div>

            {/* =====================================================
                SECTION 26C: MAIN POLICY POINTS + POLICY DETAILS
            ===================================================== */}

            <div className="print-section mb-6 grid items-start gap-5 md:grid-cols-2">
              <section
                className="h-fit border p-5"
                style={{
                  background: customization.mainPolicyPoints.background,
                  borderRadius: customization.mainPolicyPoints.roundness,
                }}
              >
                <h2
                  className="mb-4 flex items-center gap-2 font-black"
                  style={{
                    color: customization.mainPolicyPoints.titleColor,
                    fontSize: customization.mainPolicyPoints.titleSize,
                  }}
                >
                  <ShieldCheck size={20} /> Main Policy Points
                </h2>

                <ul
                  className="main-policy-list max-h-[420px] space-y-3 overflow-y-auto pr-2"
                  style={{
                    color: customization.mainPolicyPoints.textColor,
                    fontSize: customization.mainPolicyPoints.textSize,
                  }}
                >
                  {template.mainPoints.map((point, index) => (
                    <li key={index} className="flex gap-3">
                      <span
                        className="mt-1 h-2 w-2 shrink-0 rounded-full"
                        style={{
                          background:
                            customization.mainPolicyPoints.bulletColor,
                        }}
                      />
                      <span>{point}</span>
                    </li>
                  ))}

                  {customPoints.map((point, index) => (
                    <li key={`custom-${index}`} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gray-800" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
		<BenefitsSection
 		 selectedProduct={selectedProduct}
 		 details={details}
		/>
              </section>

              <section
                className="h-fit border p-5"
                style={{
                  background: customization.policyDetails.background,
                  borderRadius: customization.policyDetails.roundness,
                }}
              >
                <h2
                  className="mb-4 flex items-center gap-2 font-black"
                  style={{
                    color: customization.policyDetails.titleColor,
                    fontSize: customization.policyDetails.titleSize,
                  }}
                >
                  <FileText size={20} /> Policy Details
                </h2>

                <div className="space-y-2">
                  {currentFields.map((field) => {
                    const isExpanded = expandedDefinitionField === field;

                    return (
                      <div
                        key={field}
                        className="overflow-hidden border transition-all duration-300"
                        style={{
                          background: customization.policyDetails.rowBackground,
                          borderRadius: customization.policyDetails.rowRoundness,
                          fontSize: customization.policyDetails.textSize,
                          borderColor: isExpanded
                            ? customization.policyDetails.labelColor
                            : "#E5E7EB",
                        }}
                      >
                        <button
                          type="button"
                          className="grid w-full grid-cols-[1fr_1.2fr_auto] items-center gap-3 px-3 py-3 text-left transition hover:bg-black/5"
                          onClick={() => toggleDefinition(field)}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-black"
                              style={{
                                color: customization.policyDetails.labelColor,
                                borderColor: customization.policyDetails.labelColor,
                              }}
                            >
                              ?
                            </span>

                            <span
                              className="font-bold underline decoration-dotted underline-offset-4"
                              style={{
                                color: customization.policyDetails.labelColor,
                              }}
                            >
                              {field}
                            </span>
                          </div>

                          <div
                            className="font-bold"
                            style={{
                              color: customization.policyDetails.valueColor,
                            }}
                          >
                            {details[field] || "—"}
                          </div>

                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-lg font-black transition-transform duration-300 ${
                              isExpanded ? "rotate-45" : "rotate-0"
                            }`}
                            style={{
                              color: customization.policyDetails.labelColor,
                              borderColor: customization.policyDetails.labelColor,
                            }}
                          >
                            +
                          </span>
                        </button>

                        <div
                          className={`grid transition-all duration-300 ease-in-out ${
                            isExpanded
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="border-t px-4 py-3 text-sm leading-relaxed text-gray-700">
                              <div className="mb-1 text-xs font-black uppercase tracking-wide text-gray-500">
                                What this means
                              </div>
                              {getDefinition(field)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* =====================================================
                SECTION 26D: PRODUCT COMPARISON
            ===================================================== */}

            {compareMode && (
              <section
                className="print-section mb-6 border p-5"
                style={{
                  background: customization.comparison.background,
                  borderRadius: customization.comparison.roundness,
                  color: customization.comparison.textColor,
                  fontSize: customization.comparison.textSize,
                }}
              >
                <h2
                  className="mb-4 flex items-center gap-2 font-black"
                  style={{
                    color: customization.comparison.titleColor,
                    fontSize: customization.comparison.titleSize,
                  }}
                >
                  <BarChart3 size={20} /> Product Comparison
                </h2>
                <div className="overflow-hidden rounded-2xl border">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr
                        className="text-left"
                        style={{
                          background:
                            customization.comparison.tableHeaderBackground,
                        }}
                      >
                        <th className="p-3 font-black">Feature</th>
                        {comparisonProducts.map((product) => (
                          <th key={product} className="p-3 font-black">
                            {product}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => (
                        <tr key={row} className="border-t">
                          <td className="p-3 font-semibold">{row}</td>
                          {comparisonProducts.map((product) => (
                            <td key={`${product}-${row}`} className="p-3">
                              {(comparisonData[product] || {})[row] || "—"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* =====================================================
                SECTION 26E: IMPORTANT DISCLOSURE
            ===================================================== */}

            <section
              className="print-section border p-5 leading-relaxed"
              style={{
                background: customization.disclosure.background,
                borderColor: customization.disclosure.borderColor,
                borderRadius: customization.disclosure.roundness,
                color: customization.disclosure.textColor,
                fontSize: customization.disclosure.textSize,
              }}
            >
              <h2
                className="mb-2 font-black"
                style={{
                  color: customization.disclosure.titleColor,
                  fontSize: customization.disclosure.titleSize,
                }}
              >
                Important Disclosure
              </h2>
              <p>
                This summary is a conceptual planning tool for educational
                discussion only. It is not an official carrier illustration,
                policy contract, offer, guarantee, or tax/legal advice. Final
                values, guarantees, fees, riders, surrender charges, income
                amounts, underwriting approval, product availability, and policy
                benefits must be confirmed using the official carrier
                illustration and contract documents. Clients should consult
                their tax or legal professional regarding their specific
                situation.
              </p>
            </section>

            {/* =====================================================
                SECTION 26F: FOOTER
            ===================================================== */}

            <div
              className="mt-8 flex items-end justify-between border-t pt-5"
              style={{
                color: customization.footer.textColor,
                fontSize: customization.footer.textSize,
              }}
            >
              <div>
                <p
                  className="font-bold"
                  style={{ color: customization.footer.strongTextColor }}
                >
                  Prepared by {brand.advisorName}
                </p>
                <p>
                  {brand.email}
                  {brand.phone ? ` • ${brand.phone}` : ""}
                </p>
                <p>{brand.website}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">{brand.businessName}</p>
                <p className="text-xs">Carrier: {selectedCarrier}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}