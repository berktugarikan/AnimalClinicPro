//import axios from "axios";
import { useEffect, useState,useMemo } from "react";
import { SignUpA } from "./api";
import { Input } from "./components/input";
import { Alert } from "@/shared/components/Alert";
import { Spinner } from "@/shared/components/Spinner";



export function SignUp() {

	const [username, setUserName] = useState();
	const [email, setEmail] = useState();
	const [phone,setPhone]= useState();
	const [password, setPassword] = useState();
	const [passwordRepeat, setPasswordRepeat] = useState();
	const [clinicname,setClinicName]=useState();
	const [city,setCity]=useState();
	const [district,setDistrict]=useState();
	const [address,setAddress]=useState();
	const [apiProgress,setApiProgress]=useState();
	const [successMessage, setSuccessMessage]=useState();
	const [errors,setErrors]= useState({});
	const [generalError,setGeneralError]=useState();

	const [cities,setCities] =useState(['İstanbul','İzmir', 'Antalya', 'Muğla']);
	const [districts,setDistricts]=useState([]);

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

	/*useEffect(() => {
		if(city){
			const districtList=getDistrictsForCity(city);
			setDistricts(districtList);
		}else {
			setDistricts([]);
		}
	},[city]
	);*/

	useEffect(() => {
		async function fetchCityData() {
		   const response = await fetch('https://api.example.com/cities');
		   const data = await response.json();
	   
		   setCities(data.cities);
		   setDistricts(data.districts);
		}
	   
		fetchCityData();
	   }, []);



	const getDistrictsForCity = (selectedCity) => {
	
		switch (selectedCity) {
		  case "City1":
			return ["District1-1", "District1-2", "District1-3"];
		  case "City2":
			return ["District2-1", "District2-2", "District2-3"];
		  case "City3":
			return ["District3-1", "District3-2", "District3-3"];
		  default:
			return [];
		}
	  };

	const onSubmit = async (event) => {
		event.preventDefault();
		setSuccessMessage();
		setGeneralError();
		setApiProgress(true);

		try{
		const response =await SignUpA({
			username,
			email,
			phone,
			password,
			clinicname,
			city,
			district,
			address
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
					<Input id="username" label="UserName:" error={errors.username}
					onChange={(event) => setUserName(event.target.value)}/>
					<Input id="email" label="E-mail:" error={errors.email}
					onChange={(event) => setEmail(event.target.value)}/>
					<Input id="password" label="Password:" error={errors.password}
					onChange={(event) => setPassword(event.target.value)}/>
					<Input id="passwordRepeat" label="Password Repeat:" error={passwordRepeatError}
					onChange={(event) => setPasswordRepeat(event.target.value)}/>
		{/* <div className="mb-3">
			<label htmlFor="username" className="form-label">UserName:</label>
					<input id="username"
			className={errors.username ? "form-control is-invalid" :
				"form-control"}
				onChange={(event) => setUserName(event.target.value)}
			/>
			<div className="invalid-feedback">
			{errors.username}
			</div>
	</div> */}
		{/*<div className="mb-3">
					<label htmlFor="email" className="form-label">E-mail:</label>
					<input id="email"
						className="form-control"
				onChange={(event) => setEmail(event.target.value)}
			/>
</div> */}
		{/*<div className="mb-3">
					<label htmlFor="phone" className="form-label">Phone:</label>
					<input id="phone"
						className="form-control"
				onChange={(event) => setPhone(event.target.value)}
			/>
</div>*/}
		{/*<div className="mb-3">
					<label htmlFor="password" className="form-label">Password:</label>
					<input id="password" type="password" className="form-control"
				onChange={(event) => setPassword(event.target.value)}
			/>
</div> */}
		{/*<div className="mb-3">
					<label htmlFor="passwordrepeat" className="form-label">Password Repeat:</label>
					<input id="passwordrepeat" type="password" className="form-control"
				onChange={(event) => setPasswordRepeat(event.target.value)}
			/>
</div>*/}
		{/*<div className="mb-3">
					<label htmlFor="clinicname" className="form-label">Clinic Name:</label>
					<input id="clinicname"
						className="form-control"
				onChange={(event) => setClinicName(event.target.value)}
			/>
</div>*/}
		<div className="mb-3">
					<label htmlFor="city" className="form-label">City:</label>
					<select id="city"
						className="form-control"
						value={city}
				onChange={(event) => setCity(event.target.value)}
				>
					<option value="">Select a city </option>
					{cities.map((city) => (
						<option key={city} value={city}>{city}</option>
					))}
				</select>
			</div>
		<div className="mb-3">
					<label htmlFor="district" className="form-label">District:</label>
					<select id="district" value={district}
						className="form-control"
				onChange={(event) => setDistrict(event.target.value)}
			>
				<option value="">Select a district</option>
				{districts.map((district) => (
					<option key= {district} value={district}>{district}</option>
				))}
				</select>
		</div>
		{/*<div className="mb-3">
					<label htmlFor="address" className="form-label">Address:</label>
					<input id="address"
						className="form-control"
				onChange={(event) => setAddress(event.target.value)}
			/>
				</div>*/}
		{successMessage && (
			<Alert>{successMessage}</Alert>
			)}
		{generalError &&(
			<Alert styleType="danger">{generalError}</Alert>
			)}
		<div className="text-center">
				<button
				className="btn btn-primary"
					disabled={apiProgress || !username || !email || !phone || !password || !clinicname || !city || !district || !address || password !== passwordRepeat}>
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
