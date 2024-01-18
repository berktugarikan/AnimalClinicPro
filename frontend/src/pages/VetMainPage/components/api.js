import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080', // API'nizin temel URL'sini buraya ekleyin
});

export function loadUsers(page = 0) {
  return http.get('/api/users', { params: { page, size: 3 } });
}
/*
export function loadVaccineSchedules() {
  return http.get('/api/vaccineSchedules'); // API'nizin doğru endpoint'ini kullanın
}
*/