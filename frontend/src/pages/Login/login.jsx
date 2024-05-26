import { useEffect, useState } from "react";
import { Alert } from "@/shared/components/Alert";
import { Spinner } from "@/shared/components/Spinner";
import { Input } from "@/shared/components/Input";
import { login } from "./api";  // api.js dosyasından import edildi
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setErrors((lastErrors) => ({
      ...lastErrors,
      email: undefined,
    }));
  }, [email]);

  useEffect(() => {
    setErrors((lastErrors) => ({
      ...lastErrors,
      password: undefined,
    }));
  }, [password]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setGeneralError(null);
    setApiProgress(true);

    try {
      await login(email, password);
      const role = localStorage.getItem("role");

      if (role === "ROLE_VETERINARIAN") {
        navigate("/vetmainpage");
      } else if (role === "ROLE_CUSTOMER") {
        navigate("/vetmainpage");
      } else if(role === "ROLE_ADMIN"){
        navigate("/admin")
      }
      else {
        setGeneralError('Unexpected role. Please contact support.');
      }
    } catch (error) {
      if (error.response?.data && error.response.data.status === 400) {
        setErrors(error.response.data.validationErrors);
      } else {
        setGeneralError('Unexpected error occurred. Please try again.');
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1 style={{ color: '#6c9286' }}>Login</h1>
          </div>
          <div className="card-body">
            <Input
              id="email"
              name="email"
              label="Username:"
              error={errors.email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              id="password"
              name="password"
              label="Password:"
              error={errors.password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            {generalError && <Alert styleType="danger">{generalError}</Alert>}
            <div className="text-center">
              <button
                type='submit'
                className="btn btn-primary"
                disabled={apiProgress || !email || !password}
              >
                {apiProgress && <Spinner sm={true} />}
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
