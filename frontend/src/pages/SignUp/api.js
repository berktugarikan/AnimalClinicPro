//import axios from "axios";
export function SignUpA(body){
   return axios.post('http://localhost:8080/api/v1/users',body);
   
}

//API Call???
//Şehir isimlerini almak için Google Maps Places API kullanabilirsiniz.
//API, şehir ve bölge isimlerini arama önerileri olarak sunar.

/*const apiKey = 'API_ANAHTARINIZ';
const input = 'İstanbul';
const requestURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}&language=tr`;

fetch(requestURL)
 .then(response => response.json())
 .then(data => console.log(data.predictions))
 .catch(error => console.log('Error:', error));*/