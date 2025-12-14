import express from 'express';
import {
    getSweets,
    getSweetById,
    createSweet,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet,
} from '../controllers/sweetController';
import { protect } from '../middleware/authMiddleware';
import { admin } from '../middleware/adminMiddleware';

const router = express.Router();

router.route('/').get(getSweets).post(protect, admin, createSweet);

router
    .route('/:id')
    .get(getSweetById)
    .put(protect, admin, updateSweet)
    .delete(protect, admin, deleteSweet);

router.route('/:id/purchase').post(protect, purchaseSweet);
router.route('/:id/restock').post(protect, admin, restockSweet);

export default router;
