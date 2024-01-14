/*import http from "@/lib/http";

export function loadUsers(page=0){
    return http.get("/api/v1/users",{params:{ page, size:3}});
}*/


import axios from 'axios';

const http = axios.create({
  baseURL: 'http://your-api-base-url.com', // API'nizin temel URL'sini buraya ekleyin
  
});

export function loadUsers(page = 0) {
  return http.get('/api/v1/users', { params: { page, size: 3 } });
}

export function loadVaccineSchedules() {
  return http.get('/api/v1/vaccineSchedules'); // API'nizin doğru endpoint'ini kullanın
}
