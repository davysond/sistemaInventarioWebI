"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const swaggerConfig_1 = require("./configs/swaggerConfig");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configura o Swagger
(0, swaggerConfig_1.setupSwagger)(app);
// Monta as rotas na raiz ('/')
app.use('/', routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
