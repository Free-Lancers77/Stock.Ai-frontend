import { Routes, Route, Navigate } from "react-router-dom";
import OverviewPage from "../pages/OverviewPage";
import Product from "../pages/Product";
import SideBar from "../common/SideBar";

const DashBaord = () => {
  return (
    <div className='flex h-full bg-gray-900 text-gray-100 overflow-hidden'>
      {/* Background Overlay */}
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>
      
      <SideBar />
      
      {/* Main Content Area with Routes */}
      <div className="flex-1 flex">
        <Routes>
          {/* Default route to render OverviewPage when on the dashboard */}
          <Route path="/" element={<Navigate to="/overview" />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/products" element={<Product />} />
          {/* Add additional routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default DashBaord;
