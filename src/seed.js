require("dotenv").config();

const bcrypt = require("bcryptjs");
const { connectMongo } = require("./mongo");
const User = require("./models/User");

async function seedAdmin() {
  const email = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || "");
  const name = "Admin";

  if (!email || !password) throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env");

  await connectMongo(process.env.MONGODB_URI);

  const existing = await User.findOne({ email });
  if (existing) {
    existing.isAdmin = true;
    if (!existing.passwordHash) existing.passwordHash = await bcrypt.hash(password, 10);
    await existing.save();
    console.log("Admin account already exists. Marked as admin:", email);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ name, email, passwordHash, isAdmin: true });
  console.log("Seeded admin account:", email);
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

