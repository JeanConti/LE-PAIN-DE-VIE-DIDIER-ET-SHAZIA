const express = require('express');
const path = require('path');
const helmet = require('helmet');
const axios = require('axios');

const app = express();
const port = 3800;

// Helmet => Sécurité
app.use(helmet({ contentSecurityPolicy: false }));

// Moteur de templates => EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Récupération des données du formulaire de contact
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("pages/index", {
    nomBoulangerie: "Le Pain de Vie"
  });
});

app.get("/produits", async (req, res) => {
  try {
    const produits = await axios.get("http://localhost:3000/api/produits");
    res.render("pages/produits", { produits: produits.data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
});

// Page À propos
app.get("/about", (req, res) => {
  res.render("pages/about", {
    nomBoulangerie: "Le Pain de Vie"
  });
});

// Page Contact (GET)
app.get("/contact", (req, res) => {
  res.render("pages/contact", {
    nomBoulangerie: "Le Pain de Vie"
  });
});

// Page Brioche
app.get("/brioche", (req, res) => {
  res.render("pages/brioche", {
    nomBoulangerie: "Le Pain de Vie"
  });
});

// Page Pain
app.get("/pain", (req, res) => {
  res.render("pages/pain", {
    nomBoulangerie: "Le Pain de Vie"
  });
});

// Page Pizza
app.get("/pizza", (req, res) => {
  res.render("pages/pizza", {
    nomBoulangerie: "Le Pain de Vie"
  });
});

// Page Viennoiserie
app.get("/viennoiserie", (req, res) => {
  res.render("pages/viennoiserie", {
    nomBoulangerie: "Le Pain de Vie"
  });
});

// Page Galerie
app.get("/galerie", (req, res) => {
  res.render("pages/galerie", {
    nomBoulangerie: "Le Pain de Vie"
  });
});

// POST contact
app.post("/contact", async (req, res) => {
  const { nom, email, object, message } = req.body;
  
  console.log(nom, object, email, message);
  
  try {
    // Envoi des données à l'API NestJS
    await axios.post("http://localhost:3000/api/contact", {
      nom, email, object, message
    });
    
    // Réponse après l'envoi du formulaire
    res.send("Merci pour votre message");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending message");
  }
});

app.listen(port, () => {
  console.log(`Frontend sur http://localhost:${port}`);
});