import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import SweetCard from '../components/SweetCard';
import { Search } from 'lucide-react';

interface Sweet {
    _id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

const HomePage = () => {
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();
    const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);

    useEffect(() => {
        fetchSweets();
    }, [searchTerm]);

    const fetchSweets = async () => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        try {
            const { data } = await axios.get(`${API_URL}/api/sweets?keyword=${searchTerm}`);
            setSweets(data);
        } catch (error) {
            console.error('Error fetching sweets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (id: string) => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        if (!user) {
            alert('Please login to purchase');
            return;
        }
        setPurchaseLoading(id);
        try {
            await axios.post(
                `${API_URL}/api/sweets/${id}/purchase`,
                {},
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            fetchSweets(); // Refresh list to update quantity
            alert('Purchase successful!');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Purchase failed');
        } finally {
            setPurchaseLoading(null);
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome to SweetShop 🍭
                </h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for sweets..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading sweets...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sweets.map((sweet) => (
                        <SweetCard
                            key={sweet._id}
                            sweet={sweet}
                            onPurchase={handlePurchase}
                            isLoading={purchaseLoading === sweet._id}
                        />
                    ))}
                    {sweets.length === 0 && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No sweets found matching your search.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
