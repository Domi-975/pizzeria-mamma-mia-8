import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { GiCook, GiPizzaCutter } from "react-icons/gi"; 

const NotFound = () => {
  return (
    <Container 
      className="d-flex flex-column justify-content-center align-items-center text-center py-5"
      style={{ 
        minHeight: "calc(100vh - 160px)",
        background: "linear-gradient(to bottom, #FFF8F0, #FFEBD6)",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}
    >
      <div className="mb-4 position-relative">
        <GiPizzaCutter 
          size={80} 
          className="text-danger me-3 spin-icon" 
          style={{
            animation: "spin 2s linear infinite",
            transformOrigin: "center"
          }}
        />
        <GiCook 
          size={90} 
          className="text-warning"
        />
      </div>

      <h1 className="display-4 fw-bold text-dark mb-3">
        ¡Oops! <span className="text-danger">Pizza Perdida</span> 🍕
      </h1>
      
      <p className="fs-5 text-muted mb-4 px-4">
        Parece que esta ruta se escondió como el queso que se escurre de la pizza.<br/>
        Te redirigimos a donde el sabor nunca falla.
      </p>

      <div className="d-grid gap-3 d-md-block">
        <Button 
          as={Link} 
          to="/" 
          variant="danger" 
          size="lg" 
          className="me-md-3 mb-2"
        >
          Volver al Menú Principal
        </Button>
        <Button 
          as={Link} 
          to="/pizza/001" 
          variant="warning" 
          size="lg" 
          className="mb-2"
        >
          Llévame a la Pizza Especial
        </Button>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .spin-icon {
            position: absolute;
            left: -30px;
            top: 10px;
          }
        `}
      </style>
    </Container>
  );
};

export default NotFound;

