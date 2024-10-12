import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../src/components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Packages from './components/Packages/Packages';
import CustomerHome from './components/CustomerHome/CustomerHome';

//import Register from './pages/Register';
import Footer from './components/Footer/Footer';

import AgentHome from './components/AgentHome/AgentHome';

import AdminHome from './components/AdminHome/AdminHome';
import Confirmation from './components/Confirmation/Confirmation';
import Payment from './components/Payment/Payment';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AgentBookings from './components/AgentBookings/AgentBookings';
import ApproveUsers from './components/AdminHome/ApproveUsers';
import Notification from './components/AdminHome/Notification';
import CreateReview from './components/CustomerHome/CreateReview';
import ShowReview from './components/AgentHome/ShowReview';
import MyBooking from './components/CustomerHome/MyBooking';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import CustomerPayment from './components/CustomerHome/CustomerPayment';
import AgentPayment from './components/AgentHome/AgentPayment';
import AddPackage from './components/AddPackages';

function App() {
  return (
    <>
    <Layout/>
    <Routes>
    <Route path="/login" element={<Login/>} />
        
        <Route path="/customerhome/:cid" element={<CustomerHome/>}></Route>
        <Route path="/customerhome" element={<CustomerHome/>}></Route>
        <Route path="/packages" element={<Packages/>}></Route>
        <Route path="/agentbookings" element={<AgentBookings/>}></Route>
        
        <Route path="/agenthome" element={<AgentHome/>}></Route>
        
        <Route path="/adminhome" element={<AdminHome/>}></Route>
        <Route path="/" element={<Packages />} />
        <Route path="/confirmation/:id" element={<Confirmation />} />
        {/* <Route path="/confirmation/:id" element={<Confirmation />} /> */}
        <Route path="/payment/:bookingId/:totalAmount" element={<Payment />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/approveuser" element={<ApproveUsers />} />
        <Route path="/notification" element={<Notification/>}></Route>
        <Route path="/createreviews" element={<CreateReview/>}></Route>
        <Route path="/showreviews" element={<ShowReview/>}></Route>
        <Route path="/mybooking" element={<MyBooking/>}></Route>
        <Route path="/forgetpassword" element={<ForgetPassword/>}></Route>
        <Route path="/resetpassword" element={<ResetPassword/>}></Route>
        <Route path="/customerpayment" element={<CustomerPayment/>}></Route>
        <Route path="/agentpayment" element={<AgentPayment/>}></Route>
        <Route path="/addpackages" element={<AddPackage/>}></Route>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
