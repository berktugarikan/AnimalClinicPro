// Login.jsx
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

  const onLoginSuccess = () => {
    navigate("/vetmainpage");
  };

  const onLoginFailure = () => {
    setGeneralError('Invalid email or password. Please try again.');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setGeneralError(null);
    setApiProgress(true);

    try {
      const user = await login(email, password);
      onLoginSuccess();
    } catch (error) {
      if (error.response?.data && error.response.data.status === 400) {
        setErrors(error.response.data.validationErrors);
      } else {
        setGeneralError('Unexpected error occurred. Please try again');
        onLoginFailure();
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
              label="E-mail:"
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
