import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";
axios.defaults.withCredentials = true;

export const ProductAuthStore = create((set) => ({
  products: null,
  totalCash: 0,
  numOfProducts: 0,
  isAuthenticated: false,
  error: null,
  isLoading: false,

  // Define the overview function
  overview: async () => {
    set({ isLoading: true, error: null });

    try {
      // Make the request with Authorization header
      const response = await axios.get(`${API_URL}/Overview`);

      // Extract data from response
      const { Total_cash, numb_of_products } = response.data;

      // Directly set the state without conditional checks
      set({
        totalCash: Total_cash,
        numOfProducts: numb_of_products,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error fetching products",
        isLoading: false,
      });
    }
  },
  add: async (id, Name, Price, Quantity, NbOfPieces) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/AddProduct`, {
        id,
        Name,
        Price,
        Quantity,
        NbOfPieces,
      });

      // Add the new product to the products list or initialize if it's the first product
      set((state) => ({
        products: state.products ? [...state.products, response.data] : [response.data],
        isLoading: false,
        error: null,  // Clear any previous error
      }));
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error adding product",
        isLoading: false,
      });
    }
  },
  getAll:async()=>{
    set({ isLoading: true, error: null });
    try{
      const response = await axios.get(`${API_URL}/getAllProducts`);   
      set({ products: response.data, isLoading: false, error: null });
    }
    catch(error){
      console.log(error);
      set({ error: error.response?.data?.message || "Error fetching products", isLoading: false });
      

    }
  }

  
}));
