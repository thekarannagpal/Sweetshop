import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, LogOut, User as UserIcon } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <nav className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                            <ShoppingBag className="h-8 w-8 text-pink-500" />
                            <span className="ml-2 text-xl font-bold text-gray-900">SweetShop</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <>
                                    <div className="flex items-center text-gray-700">
                                        <UserIcon className="h-5 w-5 mr-1" />
                                        <span className="font-medium">{user.username}</span>
                                        {user.isAdmin && (
                                            <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-purple-100 text-purple-600 rounded-full">
                                                Admin
                                            </span>
                                        )}
                                    </div>
                                    {user.isAdmin && (
                                        <Link
                                            to="/admin"
                                            className="text-sm font-medium text-gray-500 hover:text-gray-900"
                                        >
                                            Admin Panel
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-100 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </>
                            ) : (
                                <div className="space-x-4">
                                    <Link
                                        to="/login"
                                        className="text-gray-500 hover:text-gray-900 font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors font-medium shadow-sm hover:shadow-md"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
