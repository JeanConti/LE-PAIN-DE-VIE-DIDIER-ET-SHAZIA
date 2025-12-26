# LE PAIN DE VIE DIDIER ET SHAZIA

boulangerie/
│
├── frontend/
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   │
│   ├── views/           # EJS
│   │   ├── layouts/
│   │   │   └── main.ejs
│   │   ├── partials/
│   │   │   ├── navbar.ejs
│   │   │   └── footer.ejs
│   │   ├── pages/
│   │   │   ├── index.ejs
│   │   │   ├── produits.ejs
│   │   │   └── contact.ejs
│   │
│   ├── app.js           # Express pour servir EJS
│   └── routes.js
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── produits/
│   │   ├── commandes/
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   └── prisma/ ou orm/
│
├── docker-compose.yml (optionnel)
└── README.md
