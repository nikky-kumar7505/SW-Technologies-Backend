const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    serviceRequired: { type: String, required: true, trim: true, maxlength: 120 },
    budget: { type: String, required: true, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quote", QuoteSchema);

