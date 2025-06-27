// src/pages/Profile.jsx
import { Container, Button } from 'react-bootstrap';
import Footer from '../components/Footer'; 

const Profile = () => {
  const email = "usuario@example.com";

  const handleLogout = () => {
    alert("Cerrando sesión...");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Container className="flex-grow-1 py-5"> {/* flex-grow-1 para que ocupe toda la pantalla*/}
        <h1 className="text-center">Perfil de Usuario</h1>
        <p className="text-center">Email: {email}</p>
        <div className="text-center">
          <Button onClick={handleLogout} variant="danger">Cerrar sesión</Button>
        </div>
      </Container>
      
    </div>
  );
};

export default Profile;

