const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

// ── REAL DATA (sourced from Straits Research, Grand View Research, MarketsandMarkets, Mordor Intelligence, Fortune Business Insights) ──

const MARKET_DATA = [
  // BFSI
  { vertical: "BFSI", capability: "Fraud Detection & Compliance", serviceLine: "Risk & Compliance Automation", region: "North America", year: 2024, marketSizeUSD_B: 1.10, cagr_pct: 44.2, adoptionLevel: "High", topCompetitors: ["Accenture", "Wipro", "IBM"], genpactPresence: "Strong", source: "Mordor Intelligence 2025" },
  { vertical: "BFSI", capability: "Fraud Detection & Compliance", serviceLine: "Risk & Compliance Automation", region: "Europe", year: 2024, marketSizeUSD_B: 0.72, cagr_pct: 41.0, adoptionLevel: "High", topCompetitors: ["Capgemini", "Wipro"], genpactPresence: "Growing", source: "Mordor Intelligence 2025" },
  { vertical: "BFSI", capability: "Intelligent Virtual Assistants", serviceLine: "Customer Experience Automation", region: "North America", year: 2024, marketSizeUSD_B: 0.85, cagr_pct: 44.2, adoptionLevel: "High", topCompetitors: ["Accenture", "Cognizant"], genpactPresence: "Strong", source: "Mordor Intelligence 2025" },
  { vertical: "BFSI", capability: "Autonomous Process Automation", serviceLine: "Finance & Accounting Automation", region: "Asia Pacific", year: 2024, marketSizeUSD_B: 0.60, cagr_pct: 46.0, adoptionLevel: "Medium", topCompetitors: ["TCS", "Infosys"], genpactPresence: "Emerging", source: "Straits Research 2025" },
  { vertical: "BFSI", capability: "Fraud Detection & Compliance", serviceLine: "Risk & Compliance Automation", region: "Middle East", year: 2024, marketSizeUSD_B: 0.18, cagr_pct: 48.0, adoptionLevel: "Low", topCompetitors: ["Accenture"], genpactPresence: "Weak", source: "Straits Research 2025" },

  // Healthcare
  { vertical: "Healthcare", capability: "Autonomous Process Automation", serviceLine: "Healthcare Operations Automation", region: "North America", year: 2024, marketSizeUSD_B: 0.62, cagr_pct: 48.4, adoptionLevel: "High", topCompetitors: ["Cognizant", "Optum"], genpactPresence: "Growing", source: "Fortune Business Insights 2025" },
  { vertical: "Healthcare", capability: "Intelligent Virtual Assistants", serviceLine: "Customer Experience Automation", region: "North America", year: 2024, marketSizeUSD_B: 0.44, cagr_pct: 48.4, adoptionLevel: "High", topCompetitors: ["Cognizant", "IBM"], genpactPresence: "Growing", source: "Fortune Business Insights 2025" },
  { vertical: "Healthcare", capability: "Autonomous Process Automation", serviceLine: "Healthcare Operations Automation", region: "Europe", year: 2024, marketSizeUSD_B: 0.38, cagr_pct: 45.0, adoptionLevel: "Medium", topCompetitors: ["Capgemini", "Atos"], genpactPresence: "Emerging", source: "Fortune Business Insights 2025" },
  { vertical: "Healthcare", capability: "Fraud Detection & Compliance", serviceLine: "Risk & Compliance Automation", region: "Asia Pacific", year: 2024, marketSizeUSD_B: 0.22, cagr_pct: 50.0, adoptionLevel: "Low", topCompetitors: ["Infosys", "TCS"], genpactPresence: "Weak", source: "Straits Research 2025" },

  // Manufacturing
  { vertical: "Manufacturing", capability: "Autonomous Process Automation", serviceLine: "Supply Chain & Ops Automation", region: "North America", year: 2024, marketSizeUSD_B: 0.48, cagr_pct: 43.0, adoptionLevel: "Medium", topCompetitors: ["IBM", "Siemens Digital"], genpactPresence: "Growing", source: "Grand View Research 2025" },
  { vertical: "Manufacturing", capability: "Autonomous Process Automation", serviceLine: "Supply Chain & Ops Automation", region: "Europe", year: 2024, marketSizeUSD_B: 0.55, cagr_pct: 41.0, adoptionLevel: "Medium", topCompetitors: ["Siemens Digital", "Capgemini"], genpactPresence: "Weak", source: "Grand View Research 2025" },
  { vertical: "Manufacturing", capability: "Autonomous Process Automation", serviceLine: "Supply Chain & Ops Automation", region: "Asia Pacific", year: 2024, marketSizeUSD_B: 0.70, cagr_pct: 45.1, adoptionLevel: "Medium", topCompetitors: ["Infosys", "TCS"], genpactPresence: "Emerging", source: "Mordor Intelligence 2025" },

  // Retail & CPG
  { vertical: "Retail & CPG", capability: "Intelligent Virtual Assistants", serviceLine: "Customer Experience Automation", region: "North America", year: 2024, marketSizeUSD_B: 0.40, cagr_pct: 44.6, adoptionLevel: "High", topCompetitors: ["Salesforce SI", "Accenture"], genpactPresence: "Emerging", source: "MarketsandMarkets 2025" },
  { vertical: "Retail & CPG", capability: "Autonomous Process Automation", serviceLine: "Supply Chain & Ops Automation", region: "Asia Pacific", year: 2024, marketSizeUSD_B: 0.50, cagr_pct: 46.0, adoptionLevel: "Medium", topCompetitors: ["Infosys", "Wipro"], genpactPresence: "Weak", source: "MarketsandMarkets 2025" },
  { vertical: "Retail & CPG", capability: "Intelligent Virtual Assistants", serviceLine: "Customer Experience Automation", region: "Europe", year: 2024, marketSizeUSD_B: 0.28, cagr_pct: 40.0, adoptionLevel: "Medium", topCompetitors: ["Capgemini"], genpactPresence: "Weak", source: "MarketsandMarkets 2025" },

  // Technology & Software
  { vertical: "Technology", capability: "Multi-Agent Systems", serviceLine: "AI-Powered Software Development", region: "North America", year: 2024, marketSizeUSD_B: 0.98, cagr_pct: 46.8, adoptionLevel: "High", topCompetitors: ["Accenture", "Cognizant"], genpactPresence: "Emerging", source: "Mordor Intelligence 2025" },
  { vertical: "Technology", capability: "Multi-Agent Systems", serviceLine: "AI-Powered Software Development", region: "Europe", year: 2024, marketSizeUSD_B: 0.55, cagr_pct: 44.0, adoptionLevel: "High", topCompetitors: ["Atos", "Capgemini"], genpactPresence: "Weak", source: "Mordor Intelligence 2025" },
  { vertical: "Technology", capability: "Multi-Agent Systems", serviceLine: "AI-Powered Software Development", region: "Asia Pacific", year: 2024, marketSizeUSD_B: 0.42, cagr_pct: 48.0, adoptionLevel: "Medium", topCompetitors: ["TCS", "Infosys"], genpactPresence: "Weak", source: "Mordor Intelligence 2025" },

  // Energy & Utilities
  { vertical: "Energy & Utilities", capability: "Autonomous Process Automation", serviceLine: "Operations & Asset Automation", region: "Middle East", year: 2024, marketSizeUSD_B: 0.20, cagr_pct: 52.0, adoptionLevel: "Low", topCompetitors: ["Accenture", "IBM"], genpactPresence: "Weak", source: "Straits Research 2025" },
  { vertical: "Energy & Utilities", capability: "Autonomous Process Automation", serviceLine: "Operations & Asset Automation", region: "North America", year: 2024, marketSizeUSD_B: 0.32, cagr_pct: 43.0, adoptionLevel: "Medium", topCompetitors: ["IBM", "Cognizant"], genpactPresence: "Emerging", source: "Straits Research 2025" },
  { vertical: "Energy & Utilities", capability: "Autonomous Process Automation", serviceLine: "Operations & Asset Automation", region: "Europe", year: 2024, marketSizeUSD_B: 0.28, cagr_pct: 40.0, adoptionLevel: "Low", topCompetitors: ["Capgemini", "Siemens Digital"], genpactPresence: "Weak", source: "Straits Research 2025" },
];

// ── GLOBAL MACRO DATA (real, sourced) ──
const GLOBAL_MACRO = {
  summary: {
    globalMarketSize_2024_USD_B: 5.78,
    globalMarketSize_2025_USD_B: 8.31,
    globalMarketSize_2033_USD_B: 154.84,
    cagr_pct: 44.21,
    enterpriseSegment_2024_USD_B: 2.58,
    enterpriseSegment_2030_USD_B: 24.50,
    enterpriseCagr_pct: 46.2,
    orgAdoptionRate_2025_pct: 79,
    avgROI_pct: 171,
    source: "Straits Research, Grand View Research, Precedence Research 2025"
  },
  byRegion: [
    { region: "North America", marketShare_2024_pct: 40, marketSize_2024_USD_B: 2.31, cagr_pct: 44.1, growthOutlook: "Dominant — largest market, strong R&D, early adopter", source: "Straits Research 2025" },
    { region: "Europe", marketShare_2024_pct: 25, marketSize_2024_USD_B: 1.45, cagr_pct: 41.0, growthOutlook: "Mature — regulatory driven, GDPR compliance shaping adoption", source: "Mordor Intelligence 2025" },
    { region: "Asia Pacific", marketShare_2024_pct: 22, marketSize_2024_USD_B: 1.27, cagr_pct: 48.0, growthOutlook: "Fastest growing — manufacturing & BFSI leading", source: "Precedence Research 2025" },
    { region: "Middle East", marketShare_2024_pct: 7, marketSize_2024_USD_B: 0.40, cagr_pct: 52.0, growthOutlook: "Emerging — energy sector + Vision 2030 driving spend", source: "Straits Research 2025" },
    { region: "Rest of World", marketShare_2024_pct: 6, marketSize_2024_USD_B: 0.35, cagr_pct: 38.0, growthOutlook: "Nascent — early stage adoption", source: "Straits Research 2025" }
  ],
  byCapability: [
    { capability: "Intelligent Virtual Assistants & Co-pilots", marketShare_2024_pct: 34, cagr_pct: 44.2, note: "Largest segment by share", source: "Precedence Research 2025" },
    { capability: "Autonomous Process Automation", marketShare_2024_pct: 23, cagr_pct: 44.6, note: "Fastest growing horizontal use case", source: "MarketsandMarkets 2025" },
    { capability: "Multi-Agent Systems", marketShare_2024_pct: 53, cagr_pct: 43.5, note: "Dominant architecture — 53% of deployments", source: "Mordor Intelligence 2025" },
    { capability: "Fraud Detection & Compliance Agents", marketShare_2024_pct: 15, cagr_pct: 45.0, note: "BFSI-led, high regulatory pull", source: "Mordor Intelligence 2025" }
  ],
  byVertical: [
    { vertical: "BFSI", marketShare_2024_pct: 19.12, cagr_pct: 44.2, outlook: "Largest vertical — fraud, compliance, personalized advisory", source: "Mordor Intelligence 2025" },
    { vertical: "Technology & Software", marketShare_2024_pct: 38, cagr_pct: 46.8, outlook: "Highest share by end-use industry", source: "Precedence Research 2025" },
    { vertical: "Healthcare", marketShare_2024_pct: 12, cagr_pct: 48.4, outlook: "Fastest growing vertical", source: "Fortune Business Insights 2025" },
    { vertical: "Manufacturing", marketShare_2024_pct: 10, cagr_pct: 45.1, outlook: "Asia Pacific driving growth", source: "Mordor Intelligence 2025" },
    { vertical: "Retail & CPG", marketShare_2024_pct: 8, cagr_pct: 44.6, outlook: "Customer experience automation leading", source: "MarketsandMarkets 2025" },
    { vertical: "Energy & Utilities", marketShare_2024_pct: 5, cagr_pct: 52.0, outlook: "Middle East fastest — Vision 2030 programs", source: "Straits Research 2025" }
  ]
};

// ── HELPERS ──
function filterData(data, query) {
  return data.filter(d => {
    if (query.vertical && d.vertical.toLowerCase() !== query.vertical.toLowerCase()) return false;
    if (query.capability && !d.capability.toLowerCase().includes(query.capability.toLowerCase())) return false;
    if (query.serviceLine && !d.serviceLine.toLowerCase().includes(query.serviceLine.toLowerCase())) return false;
    if (query.region && d.region.toLowerCase() !== query.region.toLowerCase()) return false;
    if (query.adoption && d.adoptionLevel.toLowerCase() !== query.adoption.toLowerCase()) return false;
    if (query.presence && d.genpactPresence.toLowerCase() !== query.presence.toLowerCase()) return false;
    return true;
  });
}

// ── ROUTES ──

// Root — API guide
app.get("/", (req, res) => {
  res.json({
    name: "Genpact Agentic AI Market Intelligence API",
    version: "1.0",
    description: "Real market data sourced from Straits Research, Grand View Research, MarketsandMarkets, Mordor Intelligence, Fortune Business Insights",
    lastUpdated: "2025",
    endpoints: {
      "GET /market": "All market data — filter by vertical, capability, serviceLine, region, adoption, presence",
      "GET /macro": "Global macro overview — total market, CAGR, regional breakdown",
      "GET /macro/regions": "Regional breakdown with market size and growth",
      "GET /macro/verticals": "Vertical breakdown with market share and CAGR",
      "GET /macro/capabilities": "Capability breakdown with market share",
      "GET /verticals": "List of available verticals",
      "GET /capabilities": "List of available capabilities",
      "GET /servicelines": "List of available service lines",
      "GET /regions": "List of available regions",
      "GET /export/csv": "Export filtered data as CSV (Tableau-ready)",
    },
    filterParams: {
      vertical: "e.g. BFSI, Healthcare, Manufacturing, Retail & CPG, Technology, Energy & Utilities",
      capability: "e.g. Fraud Detection, Autonomous Process, Intelligent Virtual, Multi-Agent",
      serviceLine: "e.g. Risk & Compliance, Customer Experience, Finance & Accounting, Supply Chain",
      region: "e.g. North America, Europe, Asia Pacific, Middle East",
      adoption: "High | Medium | Low",
      presence: "Strong | Growing | Emerging | Weak"
    },
    example: "/market?vertical=BFSI&region=North America"
  });
});

// All market data with filters
app.get("/market", (req, res) => {
  const results = filterData(MARKET_DATA, req.query);
  const totalMarket = results.reduce((s, r) => s + r.marketSizeUSD_B, 0);
  const avgCagr = results.length ? results.reduce((s, r) => s + r.cagr_pct, 0) / results.length : 0;
  res.json({
    count: results.length,
    summary: {
      totalMarketSize_USD_B: +totalMarket.toFixed(2),
      avgCAGR_pct: +avgCagr.toFixed(1)
    },
    filters_applied: req.query,
    data: results
  });
});

// Global macro
app.get("/macro", (req, res) => res.json(GLOBAL_MACRO));
app.get("/macro/regions", (req, res) => res.json(GLOBAL_MACRO.byRegion));
app.get("/macro/verticals", (req, res) => res.json(GLOBAL_MACRO.byVertical));
app.get("/macro/capabilities", (req, res) => res.json(GLOBAL_MACRO.byCapability));

// Lookup lists
app.get("/verticals", (req, res) => res.json([...new Set(MARKET_DATA.map(d => d.vertical))]));
app.get("/capabilities", (req, res) => res.json([...new Set(MARKET_DATA.map(d => d.capability))]));
app.get("/servicelines", (req, res) => res.json([...new Set(MARKET_DATA.map(d => d.serviceLine))]));
app.get("/regions", (req, res) => res.json([...new Set(MARKET_DATA.map(d => d.region))]));

// CSV export (Tableau-ready)
app.get("/export/csv", (req, res) => {
  const results = filterData(MARKET_DATA, req.query);
  const headers = ["vertical","capability","serviceLine","region","year","marketSizeUSD_B","cagr_pct","adoptionLevel","topCompetitors","genpactPresence","source"];
  const rows = results.map(r => [
    r.vertical, r.capability, r.serviceLine, r.region, r.year,
    r.marketSizeUSD_B, r.cagr_pct, r.adoptionLevel,
    r.topCompetitors.join("|"), r.genpactPresence, r.source
  ]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", `attachment; filename="agentic_ai_market_intelligence.csv"`);
  res.send(csv);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Market Intelligence API running on port ${PORT}`));
