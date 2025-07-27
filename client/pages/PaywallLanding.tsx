import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaywallLanding() {
  const navigate = useNavigate();

  // Redirect to home since there are no paid plans
  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
}
