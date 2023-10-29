require("dotenv");
const express = require("express");
const cors = require("cors");
const { forRoutes } = require("../middleware");
const { JewelryByFilters, jewelryId, allJewels } = require("../utils/pg");

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(forRoutes);

app.get("/joyas", (req, res) => {
  allJewels(req.query)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error));
});

app.get("/joyas/filtros", (req, res) => {
  JewelryByFilters(req.query)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error));
});

app.get("/joyas/joya/:id", (req, res) => {
  jewelryId(req.params.id)
    .then((result) => res.status(result?.code ? 500 : 200).json(result))
    .catch((error) => res.status(500).json(error));
});

app.all("*", (_, res) =>
  res.status(404).json({ code: 404, message: "Esta ruta no existe" })
);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
