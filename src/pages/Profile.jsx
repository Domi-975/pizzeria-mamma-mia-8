// src/pages/Profile.jsx
import { Container, Button } from 'react-bootstrap';
import Footer from '../components/Footer'; 

const Profile = () => {
  const email = "usuario@example.com";

  const handleLogout = () => {
    
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", padding: "50px", flexDirection: "column" }}>
      <Container className="flex-grow-1 py-5"> 
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

