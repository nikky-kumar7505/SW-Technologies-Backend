const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function isEmail(v) {
  return typeof v === "string" && emailRegex.test(v.trim());
}

function phoneDigitsBetween(v, min = 10, max = 14) {
  if (typeof v !== "string") return false;
  const digits = v.replace(/[^\d]/g, "");
  return digits.length >= min && digits.length <= max;
}

function validateContact(body) {
  const errors = {};
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const subject = String(body?.subject ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || name.length < 2) errors.name = "Name is required (min 2 characters).";
  if (!email || !isEmail(email)) errors.email = "Valid email is required.";
  if (!phone || !phoneDigitsBetween(phone)) errors.phone = "Valid phone is required (10–14 digits).";
  if (!subject || subject.length < 3) errors.subject = "Subject is required (min 3 characters).";
  if (!message || message.length < 10) errors.message = "Message is required (min 10 characters).";

  return { ok: Object.keys(errors).length === 0, errors, values: { name, email, phone, subject, message } };
}

function validateNewsletter(body) {
  const errors = {};
  const email = String(body?.email ?? "").trim();
  if (!email || !isEmail(email)) errors.email = "Valid email is required.";
  return { ok: Object.keys(errors).length === 0, errors, values: { email: email.toLowerCase() } };
}

function validateQuote(body) {
  const errors = {};
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const serviceRequired = String(body?.serviceRequired ?? "").trim();
  const budget = String(body?.budget ?? "").trim();
  const message = String(body?.message ?? "").trim();

  if (!name || name.length < 2) errors.name = "Name is required (min 2 characters).";
  if (!email || !isEmail(email)) errors.email = "Valid email is required.";
  if (!phone || !phoneDigitsBetween(phone)) errors.phone = "Valid phone is required (10–14 digits).";
  if (!serviceRequired) errors.serviceRequired = "Service Required is required.";
  if (!budget) errors.budget = "Budget is required.";
  if (!message || message.length < 10) errors.message = "Message is required (min 10 characters).";

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    values: { name, email, phone, serviceRequired, budget, message }
  };
}

function validateRegister(body) {
  const errors = {};
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "");

  if (!name || name.length < 2) errors.name = "Name is required (min 2 characters).";
  if (!email || !isEmail(email)) errors.email = "Valid email is required.";
  if (!password || password.length < 6) errors.password = "Password must be at least 6 characters.";

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    values: { name, email: email.toLowerCase(), password }
  };
}

function validateLogin(body) {
  const errors = {};
  const email = String(body?.email ?? "").trim();
  const password = String(body?.password ?? "");

  if (!email || !isEmail(email)) errors.email = "Valid email is required.";
  if (!password) errors.password = "Password is required.";

  return { ok: Object.keys(errors).length === 0, errors, values: { email: email.toLowerCase(), password } };
}

module.exports = {
  validateContact,
  validateNewsletter,
  validateQuote,
  validateRegister,
  validateLogin
};

