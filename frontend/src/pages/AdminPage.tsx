import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plus, Trash2, RefreshCw, X } from 'lucide-react';

interface Sweet {
    _id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

const AdminPage = () => {
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const { user } = useAuth();
    const [showAddModal, setShowAddModal] = useState(false);
    const [newSweet, setNewSweet] = useState({ name: '', category: '', price: '', quantity: '' });

    useEffect(() => {
        fetchSweets();
    }, []);

    const fetchSweets = async () => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        try {
            const { data } = await axios.get(`${API_URL}/api/sweets`);
            setSweets(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`${API_URL}/api/sweets/${id}`, {
                headers: { Authorization: `Bearer ${user?.token}` },
            });
            fetchSweets();
        } catch (error) {
            alert('Delete failed');
        }
    };

    const handleRestock = async (id: string) => {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        const qty = prompt('Enter quantity to add:', '10');
        if (!qty) return;
        try {
            await axios.post(
                `${API_URL}/api/sweets/${id}/restock`,
                { quantity: parseInt(qty) },
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );
            fetchSweets();
        } catch (error) {
            alert('Restock failed');
        }
    };

    const handleAddSweet = async (e: React.FormEvent) => {
        e.preventDefault();
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
        try {
            await axios.post(
                `${API_URL}/api/sweets`,
                {
                    ...newSweet,
                    price: parseFloat(newSweet.price),
                    quantity: parseInt(newSweet.quantity),
                },
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                }
            );
            setShowAddModal(false);
            setNewSweet({ name: '', category: '', price: '', quantity: '' });
            fetchSweets();
        } catch (error) {
            alert('Failed to add sweet');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    <span>Add New Sweet</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sweets.map((sweet) => (
                            <tr key={sweet._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {sweet.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {sweet.category}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ${sweet.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {sweet.quantity}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                    <button
                                        onClick={() => handleRestock(sweet._id)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                        title="Restock"
                                    >
                                        <RefreshCw className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(sweet._id)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Add New Sweet</h2>
                        <form onSubmit={handleAddSweet} className="space-y-4">
                            <input
                                placeholder="Name"
                                className="w-full p-2 border rounded"
                                value={newSweet.name}
                                onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Category"
                                className="w-full p-2 border rounded"
                                value={newSweet.category}
                                onChange={(e) => setNewSweet({ ...newSweet, category: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                className="w-full p-2 border rounded"
                                value={newSweet.price}
                                onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                className="w-full p-2 border rounded"
                                value={newSweet.quantity}
                                onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })}
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                            >
                                Add Sweet
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
