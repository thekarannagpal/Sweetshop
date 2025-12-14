"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restockSweet = exports.purchaseSweet = exports.deleteSweet = exports.updateSweet = exports.createSweet = exports.getSweetById = exports.getSweets = void 0;
const Sweet_1 = __importDefault(require("../models/Sweet"));
// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Public
const getSweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};
    const sweets = yield Sweet_1.default.find(Object.assign({}, keyword));
    res.json(sweets);
});
exports.getSweets = getSweets;
// @desc    Get sweet by ID
// @route   GET /api/sweets/:id
// @access  Public
const getSweetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sweet = yield Sweet_1.default.findById(req.params.id);
    if (sweet) {
        res.json(sweet);
    }
    else {
        res.status(404).json({ message: 'Sweet not found' });
    }
});
exports.getSweetById = getSweetById;
// @desc    Create a sweet
// @route   POST /api/sweets
// @access  Private/Admin
const createSweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, price, quantity } = req.body;
    const sweet = new Sweet_1.default({
        name,
        category,
        price,
        quantity,
    });
    const createdSweet = yield sweet.save();
    res.status(201).json(createdSweet);
});
exports.createSweet = createSweet;
// @desc    Update a sweet
// @route   PUT /api/sweets/:id
// @access  Private/Admin
const updateSweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, price, quantity } = req.body;
    const sweet = yield Sweet_1.default.findById(req.params.id);
    if (sweet) {
        sweet.name = name || sweet.name;
        sweet.category = category || sweet.category;
        sweet.price = price || sweet.price;
        sweet.quantity = quantity !== undefined ? quantity : sweet.quantity;
        const updatedSweet = yield sweet.save();
        res.json(updatedSweet);
    }
    else {
        res.status(404).json({ message: 'Sweet not found' });
    }
});
exports.updateSweet = updateSweet;
// @desc    Delete a sweet
// @route   DELETE /api/sweets/:id
// @access  Private/Admin
const deleteSweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sweet = yield Sweet_1.default.findById(req.params.id);
    if (sweet) {
        yield sweet.deleteOne();
        res.json({ message: 'Sweet removed' });
    }
    else {
        res.status(404).json({ message: 'Sweet not found' });
    }
});
exports.deleteSweet = deleteSweet;
// @desc    Purchase a sweet
// @route   POST /api/sweets/:id/purchase
// @access  Private
const purchaseSweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sweet = yield Sweet_1.default.findById(req.params.id);
    if (sweet) {
        if (sweet.quantity > 0) {
            sweet.quantity = sweet.quantity - 1;
            const updatedSweet = yield sweet.save();
            res.json(updatedSweet);
        }
        else {
            res.status(400).json({ message: 'Sweet out of stock' });
        }
    }
    else {
        res.status(404).json({ message: 'Sweet not found' });
    }
});
exports.purchaseSweet = purchaseSweet;
// @desc    Restock a sweet
// @route   POST /api/sweets/:id/restock
// @access  Private/Admin
const restockSweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity } = req.body; // Quantity to ADD
    const sweet = yield Sweet_1.default.findById(req.params.id);
    if (sweet) {
        sweet.quantity = sweet.quantity + (quantity || 1); // Default to adding 1 if not specified
        const updatedSweet = yield sweet.save();
        res.json(updatedSweet);
    }
    else {
        res.status(404).json({ message: 'Sweet not found' });
    }
});
exports.restockSweet = restockSweet;
