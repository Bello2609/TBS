import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>🚫 Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <button onClick={handleRedirect}>Go to Login</button>
    </div>
  );
};

export default Unauthorized;
