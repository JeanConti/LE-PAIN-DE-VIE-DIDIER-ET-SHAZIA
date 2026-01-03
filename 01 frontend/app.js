const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();
const port = 3800;

// Server app
app.use(express.static("public"));

// Helmet => Sécurité
app.use(helmet({ contentSecurityPolicy: false }));



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

// Récupération des données du formulaire de contact
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// POST 
app.post("/contact", async (req, res) => {
  const { nom, email, object, message } = req.body;
})

console.log(nom, object, email, message);

// Envoi des données à l'API NestJS
await express.post("http://localhost:3000/api/contact", {
  nom, email, object, message
})

// Cookies sécurisés
res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
})

// Réponse après l'envoi du formulaire
res.redirect("Merci pour votre message")


app.listen(port, () => {
  console.log(`Frontend sur http://localhost:${port}`);
});