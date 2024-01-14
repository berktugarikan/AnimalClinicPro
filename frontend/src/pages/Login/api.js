//import http from "@/lib/http"; 

export function LoginA(credentials){
    return http.post("/api/v1/auth",credentials)
}