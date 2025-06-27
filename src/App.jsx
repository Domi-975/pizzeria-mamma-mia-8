   import { Routes, Route } from "react-router-dom";
   import Footer from "./components/Footer";
   import Navbar from "./components/Navbar";
   import Pizza from "./pages/Pizza"; // Importación (a pages/)
   import Cart from "./pages/Cart";   // Importación (a pages/)
   import Home from "./pages/Home";   // Importación (a pages/)
   import Login from "./pages/Login";  
   import Register from "./pages/Register";
   import NotFound from "./pages/NotFound";
   import Profile from "./pages/Profile";

   const App = () => {
     return (
       <>
         <Navbar />   {/* Navbar se muestra en todas las páginas */}
         <div className="main-content">
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/register" element={<Register />} />
             <Route path="/login" element={<Login />} />
             <Route path="/cart" element={<Cart />} />
             <Route path="/pizza/001" element={<Pizza />} />
             <Route path="/profile" element={<Profile />} />
             <Route path="*" element={<NotFound />} /> {/* Ruta 404 */}
           </Routes>
         </div>
         <Footer /> {/* se muestra en todas las páginas */}
       </>
     );
   };

   export default App;
   

