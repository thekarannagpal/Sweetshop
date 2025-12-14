import { ShoppingCart } from 'lucide-react';

interface Sweet {
    _id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

interface SweetCardProps {
    sweet: Sweet;
    onPurchase: (id: string) => void;
    isLoading?: boolean;
}

const SweetCard = ({ sweet, onPurchase, isLoading }: SweetCardProps) => {
    const isOut = sweet.quantity === 0;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
                {/* Placeholder for image - using generate_image later if needed, mostly text for now or abstract svg */}
                <span className="text-4xl">🍬</span>
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{sweet.name}</h3>
                    <span className="bg-pink-50 text-pink-600 text-xs px-2 py-1 rounded-full font-medium">
                        {sweet.category}
                    </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-gray-900">${sweet.price}</span>
                    <span
                        className={`text-sm font-medium ${isOut ? 'text-red-500' : 'text-green-500'
                            }`}
                    >
                        {isOut ? 'Out of Stock' : `${sweet.quantity} left`}
                    </span>
                </div>
                <button
                    onClick={() => onPurchase(sweet._id)}
                    disabled={isOut || isLoading}
                    className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg font-medium transition-all ${isOut
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]'
                        }`}
                >
                    <ShoppingCart className="h-4 w-4" />
                    <span>{isOut ? 'Sold Out' : 'Purchase'}</span>
                </button>
            </div>
        </div>
    );
};

export default SweetCard;
