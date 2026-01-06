// server.js
const express = require("express");
const bodyParser = require("body-parser");
// const { ascon_aead_decrypt } = require("ascon"); // Use an ASCON npm library
const { ascon128 } = require("ascon-js");


const app = express();
const PORT = 1880;

// -------- ASCON Key (same as ESP32) --------
const asconKey = Buffer.from([
  0x01,0x02,0x03,0x04,
  0x05,0x06,0x07,0x08,
  0x09,0x0A,0x0B,0x0C,
  0x0D,0x0E,0x0F,0x10
]);

// Use raw body parser for binary data
app.use(bodyParser.raw({ type: "application/octet-stream", limit: "1mb" }));

app.post("/sensor", (req, res) => {
  const data = req.body;

  if (data.length < 32) {
    return res.status(400).send("Invalid payload");
  }

  // -------- Extract nonce, tag, ciphertext --------
  const nonce = data.slice(0, 16);
  const tag = data.slice(16, 32);
  const ciphertext = data.slice(32);

  try {
    // -------- Decrypt using ASCON AEAD --------
    const plaintext = ascon_aead_decrypt(ciphertext, tag, null, nonce, asconKey);
    
    console.log("Decrypted data:", plaintext.toString()); // Should be "T=xx.xx,H=yy.yy"
    res.send("Data received and decrypted");
  } catch (err) {
    console.error("Decryption failed:", err);
    res.status(500).send("Decryption error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
