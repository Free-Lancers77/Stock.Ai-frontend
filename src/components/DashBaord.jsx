
import  SideBar from "./common/SideBar";
import { Route, Routes } from "react-router-dom";
import OverviewPage from "../pages/OverviewPage";
const DashBaord = () => {
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>/
    <div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>
      <SideBar>
      <Routes>
          <Route path='/overview' element={<OverviewPage />} />
        </Routes>
      </SideBar>

    </div>
  )
}

export default DashBaord