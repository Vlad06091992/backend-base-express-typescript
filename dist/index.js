"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.port || 3000;
const addresses = [{ title: "Voronovda 11" }, { title: "Karla-Marksa 89" }];
const products = [{ title: "Tomato" }, { title: "Orange" }];
app.get('/', (req, res) => {
    let hw = 'w';
    res.send(hw);
});
app.get('/products/:productTitle', (req, res) => {
    const params = req.params.productTitle;
    res.send(products);
});
app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
