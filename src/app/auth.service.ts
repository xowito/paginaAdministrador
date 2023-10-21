import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  private usernameKey = 'auth_username'; // Clave para almacenar el correo electrónico
  private apiUrl = 'http://localhost:4001';//'http://192.168.1.9:4001'
  constructor(private http: HttpClient) { }



  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  registerUser(userData: any){
    return this.http.post(`${this.apiUrl}/registro-admin`, userData);
  }

  login(username: string, password: string): Observable<any> {
    const data = { 
      username:username, 
      password:password };
    return this.http.post(`${this.apiUrl}/login-admin`, data)
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            this.saveToken(response.token);
            this.saveUsername(username) 
            
          }
          
        })
      );
  }
  private saveUsername(username: string) {
    localStorage.setItem(this.usernameKey, username);
  }
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
  

  getProtectedData(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.tokenKey}` // Agrega el token a las cabeceras
    };
    return this.http.get('/api/ruta-protegida', { headers });
  }
  

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(): void {
    this.clearToken();
  }

  getUserProfile(userId: string) {
    return this.http.get(`${this.apiUrl}/usuario/${userId}`);
  }

  obtenerResenas(correoElectronico:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/obtener-resenas/${correoElectronico}`);
  }



  obtenerResena(correoElectronico: string, solicitudId:string): Observable<any> {
    return this.http.get(`${this.apiUrl}/listar-resena/${correoElectronico}/${solicitudId}`);   
    ///listar-resena/:resenaId/:solicitudId

  }

  obtenerResenaAdmin(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener-resenas-admin`);
    ///obtener-resenas-admin
  }

  obtenerResenaEspecifica(resenaId:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/listar-resena-especifica/${resenaId}`)
  }


  modificarReseña(resenaId: number, resenaData: any): Observable<any> {
    const url = `${this.apiUrl}/modificar-resena/${resenaId}`;
    return this.http.put(url, resenaData);
  }

  actualizarEstadoResena(resenaId: number, nuevoEstado: string): Observable<any>{
    const data = { estado:nuevoEstado };
    return this.http.put(`${this.apiUrl}/emitir-reporte/${resenaId}`, data);
  }
  
}

  