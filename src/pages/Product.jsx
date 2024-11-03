import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import { AlertTriangle, DollarSign, Package, TrendingUp, PlusCircle, XCircle } from "lucide-react";
import ProductTable from "../components/ProductTable";
import AddProduct from "./AddProduct";

const Product = () => {
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);

    const toggleAddProduct = () => {
        setIsAddProductOpen((prev) => !prev);
    };

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title='Products' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name='Total Products' icon={Package} value={1234} color='#6366F1' />
                    <StatCard name='Top Selling' icon={TrendingUp} value={89} color='#10B981' />
                    <StatCard name='Low Stock' icon={AlertTriangle} value={23} color='#F59E0B' />
                    <StatCard name='Total Revenue' icon={DollarSign} value={"$543,210"} color='#EF4444' />
                </motion.div>

                {/* "+" BUTTON */}
                <div className='flex justify-end mb-6'>
                    <button
                        onClick={toggleAddProduct}
                        className='flex items-center text-blue-500 hover:text-blue-700 focus:outline-none'
                        aria-expanded={isAddProductOpen}
                        aria-controls="add-product-form"
                    >
                        <PlusCircle size={24} className='mr-2' />
                        <span className='text-lg font-semibold'>Add Product</span>
                    </button>
                </div>

                {/* CONDITIONAL RENDERING FOR AddProduct */}
                {isAddProductOpen && (
                    <>
                        {/* Background Overlay */}
                        <div
                            className="fixed inset-0 bg-black opacity-30 z-40"
                            onClick={toggleAddProduct}
                        ></div>

                        {/* AddProduct Modal */}
                        <motion.div
                            id="add-product-form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="fixed inset-0 z-50 flex items-center justify-center"
                        >
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-auto relative">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold">Add New Product</h2>
                                    <button
                                        onClick={toggleAddProduct}
                                        className="text-gray-500 hover:text-gray-700"
                                        aria-label="Close Add Product form"
                                    >
                                        <XCircle size={24} />
                                    </button>
                                </div>
                                <AddProduct />
                            </div>
                        </motion.div>
                    </>
                )}

                {/* PRODUCT TABLE */}
                <ProductTable />
            </main>
        </div>
    );
};

export default Product;
