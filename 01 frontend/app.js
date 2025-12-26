const express = require('express');
const path = require('path');

const app = express();
const port = 3800;

app.use(express.static("public"));


// moteur de templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("pages/home", {
    nomBoulangerie: "Le Pain de Vie"
  });
});

app.listen(port, () => {
  console.log(`Frontend sur http://localhost:${port}`);
});