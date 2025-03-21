import { ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../common/Header";
import StatCard from "../common/StatCard";
import SalesOverviewChart from "../overview/SalesOverviewChart";
import C from "../overview/C";
import { ProductAuthStore } from "../store/ProductStore";
import { useEffect } from "react";

const OverviewPage = () => {
  const {overview,isLoading,error,totalCash,numOfProducts}= ProductAuthStore();

  // Fetch overview data when component mounts
  useEffect(() => {
    overview(); // Call overview directly
  }, [overview]); // Ensure overview is stable and only call on mount

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Overview" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Sales"
            icon={Zap}
            value={`$${totalCash}`}
            color="#6366F1"
            loading={isLoading}
          />
          <StatCard
            name="New Users"
            icon={Users}
            value="1,234" // Static for now
            color="#8B5CF6"
          />
          <StatCard
            name="Total Products"
            icon={ShoppingBag}
            value={numOfProducts}
            color="#EC4899"
            loading={isLoading}
          />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <C />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
