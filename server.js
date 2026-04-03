const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());

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

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

const path = require("path");

// servir archivos estáticos (HTML y PDFs)
app.use(express.static(path.join(__dirname)));
