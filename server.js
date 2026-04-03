const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// 🔥 SERVIR HTML Y PDFs
app.use(express.static(path.join(__dirname)));

// conectar a la base de datos
const db = new sqlite3.Database("certificados.db");

// endpoint para buscar por codigo
app.get("/certificado", (req, res) => {
    const codigo = req.query.codigo;

    db.get("SELECT * FROM certificados WHERE codigo = ?", [codigo], (err, row) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (!row) {
            return res.json({ error: "Certificado no encontrado" });
        }

        res.json(row);
    });
});

// 🔥 SOLO UN listen (correcto para Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});