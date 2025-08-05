import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'; 
import { Container, Button, Spinner, Alert } from 'react-bootstrap';

const Profile = () => {
  const { logout, token } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirigir a la página de login si no hay token
    if (!token) {
      navigate('/login');
    } else {
      fetchUserProfile(); // Llama a la función para obtener el perfil del usuario
    }
  }, [token, navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching user profile');
      }

      const data = await response.json();
      setEmail(data.email); // Establece el email del usuario
    } catch (error) {
      setError(error.message); // Maneja el error
    } finally {
      setLoading(false); // Cambia el estado de carga
    }
  };

  const handleLogout = () => {
    logout(); // Llama al método logout del contexto
    navigate('/login'); // Redirige a la página de login después de cerrar sesión
  };

  if (loading) {
    return <Spinner animation="border" />; // Muestra un spinner mientras se carga el perfil
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>; // Muestra un mensaje de error si ocurre
  }

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

