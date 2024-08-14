"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const cors_1 = __importDefault(require("cors"));
const swaggerConfig_1 = require("./configs/swaggerConfig");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Configuração do Swagger
(0, swaggerConfig_1.setupSwagger)(app);
app.use('/', routes_1.default);
app.use((0, cors_1.default)());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
