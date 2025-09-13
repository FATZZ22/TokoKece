import React, { useState } from "react";
import axios from "axios";

function TokoKece() {
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("kaos-kece");
  const [status, setStatus] = useState("");

  const handleCheckout = async () => {
    try {
      setStatus("Memproses pembayaran...");
      const res = await axios.post(
        "https://toko-kece.vercel.app/", // GANTI dengan URL backend-mu di Render
        { email, product }
      );
      setStatus(res.data.message);
    } catch (err) {
      setStatus("❌ Gagal: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Checkout Produk</h2>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Pilih Produk:</label>
      <select
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        <option value="Akun FF">Kaos Kece</option>
        <option value="Akun ML">Topi Gaya</option>
        <option value="Akun FCM">Jaket Keren</option>
      </select>

      <button onClick={handleCheckout} style={{ width: "100%" }}>
        Bayar Sekarang
      </button>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
}

export default TokoKece;
