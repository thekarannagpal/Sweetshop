"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sweetController_1 = require("../controllers/sweetController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const adminMiddleware_1 = require("../middleware/adminMiddleware");
const router = express_1.default.Router();
router.route('/').get(sweetController_1.getSweets).post(authMiddleware_1.protect, adminMiddleware_1.admin, sweetController_1.createSweet);
router
    .route('/:id')
    .get(sweetController_1.getSweetById)
    .put(authMiddleware_1.protect, adminMiddleware_1.admin, sweetController_1.updateSweet)
    .delete(authMiddleware_1.protect, adminMiddleware_1.admin, sweetController_1.deleteSweet);
router.route('/:id/purchase').post(authMiddleware_1.protect, sweetController_1.purchaseSweet);
router.route('/:id/restock').post(authMiddleware_1.protect, adminMiddleware_1.admin, sweetController_1.restockSweet);
exports.default = router;
