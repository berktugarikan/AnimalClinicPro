//import axios from "axios";
import { useEffect, useState,useMemo } from "react";
import { Alert } from "@/shared/components/Alert";
import { Spinner } from "@/shared/components/Spinner";
import { Input } from "@/shared/components/Input";
import { LoginA } from "./api";
import { useNavigate } from "react-router-dom";


export function Login() {

	
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [apiProgress,setApiProgress]=useState();
	const [errors,setErrors]= useState({});
	const [generalError,setGeneralError]=useState();
  const navigate = useNavigate();


	useEffect( () => {
		setErrors(function(lastErrors){
			return{
				...lastErrors,
				email: undefined
			}
		});
	}, [email])

  useEffect( () => {
		setErrors(function(lastErrors){
			return{
				...lastErrors,
				password: undefined
			}
		});
	}, [password])

  const onLoginSuccess = (user) => {
    console.log("Login success!", user);
    navigate("/vetmainpage");
  };

  const onLoginFailure = () => {
    console.log("Login failure!");
    navigate("/");
  };


	const onSubmit = async (event) => {
		event.preventDefault();
		setGeneralError();
		setApiProgress(true);

		try{
      await LoginA({email, password})
      onLoginSuccess(response.data.user)
      navigate("/vetmainpage")


	} catch (axiosError){
		if( axiosError.response?.data && 
		axiosError.response.data.status === 400)
		{setErrors(axiosError.response.data.validationErrors);
		}else {
		setGeneralError('Unexpected error occured. Please try again');
    onLoginFailure();
		}
	} finally {
		setApiProgress(false)
	}

	};

	
	return (
		<div className="container">
		<div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
		< form className= "card" onSubmit={onSubmit}>
				<div className="text-center card-header">
						<h1 style={{ color:'#6c9286'} }>Login</h1>
					</div>
					<div className="card-body"> 
					<Input id="email" label="E-mail:" error={errors.email}
					onChange={(event) => setEmail(event.target.value)}/>
					<Input id="password" label="Password:" error={errors.password}
					onChange={(event) => setPassword(event.target.value)}/>
		{generalError &&(
			<Alert styleType="danger">{generalError}</Alert>
			)}
		<div className="text-center">
				<button
				className="btn btn-primary"
					disabled={apiProgress || !email || !password}>
						{apiProgress && (
							<Spinner sm={true} />
						)}
				
						Login
						</button>
						</div>
					</div>
			</form >
			</div>
		</div>
  );
}
