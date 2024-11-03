import { motion } from 'framer-motion';
import Input from "../components/Input";
import { Loader } from "lucide-react"; // Ensure you're using the correct icon
import { useState } from "react";
import { ProductAuthStore } from '../store/ProductStore'; // Adjust the import based on your actual store path

const AddProduct = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [nbOfPieces, setNbOfPieces] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const [successMessage, setSuccessMessage] = useState(""); // State for success messages
    const { add, isLoading } = ProductAuthStore(); // Destructure add and isLoading from the product store

    const handleAddProduct = async (e) => {
        e.preventDefault();
        
        // Simple validation
        if (!id || !name || !price || !quantity || !nbOfPieces) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        // Additional validation for numbers
        if (price <= 0 || quantity <= 0 || nbOfPieces <= 0) {
            setErrorMessage("Price, Quantity, and Number of Pieces must be positive numbers.");
            return;
        }

        setErrorMessage(""); // Reset error message
        setSuccessMessage(""); // Reset success message

        try {
            await add(id, name, price, quantity, nbOfPieces);
            setSuccessMessage("Product added successfully!"); // Set success message

            // Auto-clear the success message after 3 seconds
            setTimeout(() => {
                setSuccessMessage(""); // Clear message after 3 seconds
            }, 3000);
            
            console.log("Product added successfully!");
        } catch (error) {
            console.error("Error adding product:", error);
            setErrorMessage("Error adding product. Please try again."); // Set user-friendly error message
        }

        // Reset form fields after successful submission
        if (!errorMessage) {
            setId("");
            setName("");
            setPrice("");
            setQuantity("");
            setNbOfPieces("");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
                    Add New Product
                </h2>
                <form onSubmit={handleAddProduct}>
                    <Input
                        icon={null}
                        type='number'
                        placeholder='Product ID'
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        disabled={isLoading} // Disable inputs while loading
                    />
                    <Input
                        icon={null}
                        type='text'
                        placeholder='Product Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                    />
                    <Input
                        icon={null}
                        type='number'
                        placeholder='Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        disabled={isLoading}
                    />
                    <Input
                        icon={null}
                        type='number'
                        placeholder='Quantity'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        disabled={isLoading}
                    />
                    <Input
                        icon={null}
                        type='number'
                        placeholder='Number of Pieces'
                        value={nbOfPieces}
                        onChange={(e) => setNbOfPieces(e.target.value)}
                        disabled={isLoading}
                    />
                    <motion.button
                        className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Add Product"}
                    </motion.button>
                    {errorMessage && <p className='text-red-500 font-semibold mt-2'>{errorMessage}</p>} {/* Show error message if exists */}
                    {successMessage && <p className='text-green-500 font-semibold mt-2'>{successMessage}</p>} {/* Show success message if exists */}
                </form>
            </div>
        </motion.div>
    );
};

export default AddProduct;
