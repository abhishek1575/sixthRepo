import { Route, Routes, Navigate, Router } from 'react-router-dom';
import './App.css';
import Login from './Component/Login/Login';
import Dashboard2 from "./Component/Admin/dashboard/Dashboard2"
import ForgotPassword from './Component/Login/ForgotPassword';
import UserDashboard from './Component/User/UserDashboaard';
import SuperAdminDashboard from './Component/SuperAdmin/SuperAdminDashboard';

function App() {
  return (
    // <div>
    //   <UserDashboard/>
    // </div>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>

      {/* admin path */}
      <Route path='/adashboard' element={<Dashboard2/>}/>

       {/*super admin path */}
      <Route path='/sdashboard' element={<SuperAdminDashboard/>}/>

      <Route path='/udashboard' element={<UserDashboard/>}/>

    </Routes>

   
    // <Routes>
    //   <Route path="/" element={<Login />} />
    //   <Route path="/forgot-password" element={<ForgotPassword />} />
    //   {/* Add other routes here */}
    // </Routes>
 
  );
}

export default App;
