const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Toko Kece Backend is running 🚀");
});

app.post("/api/checkout", async (req, res) => {
  const { email, product } = req.body;

  if (!email || !product) {
    return res.status(400).json({ error: "Email dan produk wajib diisi" });
  }

  // 🚨 Simulasi kirim email (pakai Gmail/SMTP)
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Toko Kece" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Link Download Produk Anda",
      text: `Terima kasih sudah membeli ${product}. Download link: https://example.com/${product}`,
    });

    res.json({ message: "Pembayaran sukses, email terkirim ✅" });
  } catch (err) {
    res.status(500).json({ error: "Gagal kirim email", details: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));