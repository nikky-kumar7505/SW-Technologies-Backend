require("dotenv").config();

const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const { connectMongo } = require("./mongo");
const { signToken, authRequired, adminRequired } = require("./auth");
const {
  validateContact,
  validateNewsletter,
  validateQuote,
  validateRegister,
  validateLogin
} = require("./validators");

const Contact = require("./models/Contact");
const NewsletterSubscription = require("./models/NewsletterSubscription");
const Quote = require("./models/Quote");
const User = require("./models/User");

const app = express();


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.options("*", cors());
app.use(express.json({ limit: "200kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// 1) Contact form
app.post("/api/contact", async (req, res) => {
  const { ok, errors, values } = validateContact(req.body);
  if (!ok) return res.status(400).json({ message: "Validation failed", errors });
  await Contact.create(values);
  return res.json({ message: "Thanks! We received your message." });
});

// 4) Newsletter subscription
app.post("/api/newsletter/subscribe", async (req, res) => {
  const { ok, errors, values } = validateNewsletter(req.body);
  if (!ok) return res.status(400).json({ message: "Validation failed", errors });

  const existing = await NewsletterSubscription.findOne({ email: values.email }).lean();
  if (existing) return res.status(400).json({ message: "You are already subscribed" });

  await NewsletterSubscription.create(values);
  return res.json({ message: "Subscribed successfully" });
});

// 5) Quote
app.post("/api/quote", async (req, res) => {
  const { ok, errors, values } = validateQuote(req.body);
  if (!ok) return res.status(400).json({ message: "Validation failed", errors });
  await Quote.create(values);
  return res.json({ message: "Thanks! Your quote request has been submitted." });
});

// 2) Auth
app.post("/api/auth/register", async (req, res) => {
  const { ok, errors, values } = validateRegister(req.body);
  if (!ok) return res.status(400).json({ message: "Validation failed", errors });

  const already = await User.findOne({ email: values.email }).lean();
  if (already) return res.status(400).json({ message: "Email is already registered" });

  const passwordHash = await bcrypt.hash(values.password, 10);
  const user = await User.create({ name: values.name, email: values.email, passwordHash, isAdmin: false });

  const token = signToken(user);
  return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

app.post("/api/auth/login", async (req, res) => {
  const { ok, errors, values } = validateLogin(req.body);
  if (!ok) return res.status(400).json({ message: "Validation failed", errors });

  const user = await User.findOne({ email: values.email });
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const okPw = await bcrypt.compare(values.password, user.passwordHash);
  if (!okPw) return res.status(400).json({ message: "Invalid email or password" });

  const token = signToken(user);
  return res.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
});

app.get("/api/auth/profile", authRequired, async (req, res) => {
  const user = await User.findById(req.auth.sub).select("_id name email isAdmin createdAt").lean();
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  return res.json({ user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, createdAt: user.createdAt } });
});

// 3) Admin
app.get("/api/admin/contacts", adminRequired, async (_req, res) => {
  const items = await Contact.find().sort({ createdAt: -1 }).lean();
  return res.json({ items });
});

app.delete("/api/admin/contacts/:id", adminRequired, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  return res.json({ message: "Deleted" });
});

app.get("/api/admin/users", adminRequired, async (_req, res) => {
  const items = await User.find().select("_id name email isAdmin createdAt").sort({ createdAt: -1 }).lean();
  return res.json({ items });
});

app.get("/api/admin/quotes", adminRequired, async (_req, res) => {
  const items = await Quote.find().sort({ createdAt: -1 }).lean();
  return res.json({ items });
});

// Root: always respond (works on Render when Frontend folder is not deployed)
app.get("/", (_req, res) => {
  res.type("text/plain").send("sw backend is running");
});

// Serve frontend only if that folder exists (repo layout: assignment/Frontend next to assignment/Backend)
const frontendDir = path.resolve(__dirname, "..", "..", "Frontend");
const indexPath = path.join(frontendDir, "index.html");
const frontendExists = fs.existsSync(indexPath);

if (frontendExists) {
  app.use(express.static(frontendDir));
  // SPA fallback for client routes (not /api, not exact /)
  app.get(/^\/(?!api\/).+/, (_req, res) => res.sendFile(indexPath));
} else {
  console.warn(`[server] Frontend not found at ${frontendDir} — API only`);
}

async function start() {
  const port = Number(process.env.PORT || 5001);
  await connectMongo(process.env.MONGODB_URI);
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}

start().catch((e) => {
  console.error(e);
  process.exit(1);
});

