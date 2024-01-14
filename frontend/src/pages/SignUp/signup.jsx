import axios from "axios";
import { useEffect, useState,useMemo } from "react";
import { SignUpA } from "./api";
import { Input } from "@/shared/components/Input";
import { Alert } from "@/shared/components/Alert";
import { Spinner } from "@/shared/components/Spinner";



export function SignUp() {

	const [firstname,setFirstName]=useState();
	const [lastname,setLastName]=useState();
	const [username, setUserName] = useState();
	const [email, setEmail] = useState();
	const [phone,setPhone]= useState();
	const [password, setPassword] = useState();
	const [passwordRepeat, setPasswordRepeat] = useState();
	const [apiProgress,setApiProgress]=useState();
	const [successMessage, setSuccessMessage]=useState();
	const [errors,setErrors]= useState({});
	const [generalError,setGeneralError]=useState();

	useEffect( () => {
		setErrors(function(lastErrors){
			return{
				...lastErrors,
				username: undefined
			}
		});
	}, [username])

	useEffect( () => {
		setErrors(function(lastErrors){
			return{
				...lastErrors,
				email: undefined
			}
		});
	}, [email])


	const onSubmit = async (event) => {
		event.preventDefault();
		setSuccessMessage();
		setGeneralError();
		setApiProgress(true);

		try{
		const response =await SignUpA({
			firstname,
			lastname,
			username,
			email,
			phone,
			password,
		})
		setSuccessMessage (response.data.message);
		window.location.href = '/login';
	} catch (axiosError){
		if( axiosError.response?.data && 
			axiosError.response.data.status === 400)
		{setErrors(axiosError.response.data.validationErrors);
		}else {
			setGeneralError('Unexpected error occured. Please try again');
		}
	} finally {
		setApiProgress(false)
	}

	};

	const passwordRepeatError =useMemo(() => {
	if( password && password !== passwordRepeat){
		console.log('always running')
		return'Password mismatch'
	}
	return '';
},[password,passwordRepeat]);
	
	return (
		<div className="container">
		<div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
		< form className= "card" onSubmit={onSubmit}>
				<div className="text-center card-header">
						<h1 style={{ color:'#6c9286'} }>SignUp</h1>
					</div>
					<div className="card-body">
					<Input id="firstname" label="FirstName:" error={errors.firstname}
					onChange={(event) => setFirstName(event.target.value)}/> 
					<Input id="lastname" label="LastName:" error={errors.lastname}
					onChange={(event) => setLastName(event.target.value)}/>
					<Input id="username" label="UserName:" error={errors.username}
					onChange={(event) => setUserName(event.target.value)}/>
					<Input id="email" label="E-mail:" error={errors.email}
					onChange={(event) => setEmail(event.target.value)}/>
					<Input id="password" label="Password:" error={errors.password}
					onChange={(event) => setPassword(event.target.value)}/>
					<Input id="passwordRepeat" label="Password Repeat:" error={passwordRepeatError}
					onChange={(event) => setPasswordRepeat(event.target.value)}/>
		
		{successMessage && (
			<Alert>{successMessage}</Alert>
			)}
		{generalError &&(
			<Alert styleType="danger">{generalError}</Alert>
			)}
		<div className="text-center">
				<button
				className="btn btn-primary"
					disabled={apiProgress || !firstname || !lastname ||!username || !email || !phone || !password || password !== passwordRepeat}>
						{apiProgress && (
							<Spinner sm={true} />
						)}
				
						SignUp
						</button>
						</div>
					</div>
			</form >
			</div>
		</div>
  );
}
