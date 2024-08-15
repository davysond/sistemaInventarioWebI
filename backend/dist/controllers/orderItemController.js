"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderItem = exports.addOrderItem = void 0;
const orderItemService = __importStar(require("../services/orderItemService"));
const addOrderItem = async (req, res) => {
    try {
        const orderId = Number(req.params.orderId);
        const { productId, quantity } = req.body;
        if (!orderId || !productId || !quantity) {
            res.status(400).json({ error: 'Order ID, product ID, and quantity are required' });
            return;
        }
        const orderItem = await orderItemService.addOrderItemToExistingOrder(orderId, {
            productId,
            quantity,
        });
        res.status(201).json(orderItem);
    }
    catch (error) {
        console.error('Error adding order item:', error);
        res.status(500).json({ error: 'Error adding order item' });
    }
};
exports.addOrderItem = addOrderItem;
;
const deleteOrderItem = async (req, res) => {
    try {
        const { orderItemId } = req.body;
        if (!orderItemId) {
            res.status(400).json({ error: 'Order item ID is required' });
            return;
        }
        await orderItemService.deleteOrderItem(orderItemId);
        res.status(200).json({ message: 'Order item deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting order item' });
    }
};
exports.deleteOrderItem = deleteOrderItem;
