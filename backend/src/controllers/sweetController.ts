import { Request, Response } from 'express';
import Sweet from '../models/Sweet';

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Public
export const getSweets = async (req: Request, res: Response) => {
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword as string,
                $options: 'i',
            },
        }
        : {};

    const sweets = await Sweet.find({ ...keyword });
    res.json(sweets);
};

// @desc    Get sweet by ID
// @route   GET /api/sweets/:id
// @access  Public
export const getSweetById = async (req: Request, res: Response) => {
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
        res.json(sweet);
    } else {
        res.status(404).json({ message: 'Sweet not found' });
    }
};

// @desc    Create a sweet
// @route   POST /api/sweets
// @access  Private/Admin
export const createSweet = async (req: Request, res: Response) => {
    const { name, category, price, quantity } = req.body;

    const sweet = new Sweet({
        name,
        category,
        price,
        quantity,
    });

    const createdSweet = await sweet.save();
    res.status(201).json(createdSweet);
};

// @desc    Update a sweet
// @route   PUT /api/sweets/:id
// @access  Private/Admin
export const updateSweet = async (req: Request, res: Response) => {
    const { name, category, price, quantity } = req.body;

    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
        sweet.name = name || sweet.name;
        sweet.category = category || sweet.category;
        sweet.price = price || sweet.price;
        sweet.quantity = quantity !== undefined ? quantity : sweet.quantity;

        const updatedSweet = await sweet.save();
        res.json(updatedSweet);
    } else {
        res.status(404).json({ message: 'Sweet not found' });
    }
};

// @desc    Delete a sweet
// @route   DELETE /api/sweets/:id
// @access  Private/Admin
export const deleteSweet = async (req: Request, res: Response) => {
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
        await sweet.deleteOne();
        res.json({ message: 'Sweet removed' });
    } else {
        res.status(404).json({ message: 'Sweet not found' });
    }
};

// @desc    Purchase a sweet
// @route   POST /api/sweets/:id/purchase
// @access  Private
export const purchaseSweet = async (req: Request, res: Response) => {
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
        if (sweet.quantity > 0) {
            sweet.quantity = sweet.quantity - 1;
            const updatedSweet = await sweet.save();
            res.json(updatedSweet);
        } else {
            res.status(400).json({ message: 'Sweet out of stock' });
        }
    } else {
        res.status(404).json({ message: 'Sweet not found' });
    }
};

// @desc    Restock a sweet
// @route   POST /api/sweets/:id/restock
// @access  Private/Admin
export const restockSweet = async (req: Request, res: Response) => {
    const { quantity } = req.body; // Quantity to ADD
    const sweet = await Sweet.findById(req.params.id);

    if (sweet) {
        sweet.quantity = sweet.quantity + (quantity || 1); // Default to adding 1 if not specified
        const updatedSweet = await sweet.save();
        res.json(updatedSweet);
    } else {
        res.status(404).json({ message: 'Sweet not found' });
    }
};
