import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';

const Profile = () => {
  const { token, logout, getUserProfile, userProfile, loading, error } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirigir si no hay token
    } else {
      getUserProfile(); // Obtener el perfil del usuario al cargar el componente
    }
  }, [token, navigate]); // Asegúrate de que las dependencias sean correctas

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirigir a la página de login después de cerrar sesión
  };

  if (loading) {
    return <Spinner animation="border" />; // Muestra un spinner mientras se carga el perfil
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>; // Muestra un mensaje de error si ocurre
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mt-4">Perfil de Usuario</h1>
      <p className="text-center">Email: {userProfile?.email}</p>
      <div className="text-center">
        <Button onClick={handleLogout} variant="danger">Cerrar sesión</Button>
      </div>
    </Container>
  );
};

export default Profile;


