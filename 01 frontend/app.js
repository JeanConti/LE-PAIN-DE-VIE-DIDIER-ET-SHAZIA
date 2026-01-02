const express = require('express');
const path = require('path');

const app = express();
const port = 3800;

// Server app
app.use(express.static("public"));


// Moteur de templates => EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("pages/home", {
    nomBoulangerie: "Le Pain de Vie"
  });
});

app.get("/produits", async (req, res) => {
  const produits = await express.get("http://localhost:3000/api/produits");
  res.render("pages/produits", { produits: produits.data });
});




app.listen(port, () => {
  console.log(`Frontend sur http://localhost:${port}`);
});