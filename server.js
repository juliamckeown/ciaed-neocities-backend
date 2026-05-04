console.log("file is running");

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {  
 const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD
      },
port: 587,
secure: false,
tls {
   rejectUnauthorized: false
}
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      replyTo: email,
      to: process.env.EMAIL,
      subject: `New message from ${name}`,
      text: message
    });

    res.json({ success: true, message: "sent 💌" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});

app.get("/test", (req, res) => {
    res.json({
      status: "okay",
      message: "backend is connected",
      time: new Date().toISOString()
    });
});
