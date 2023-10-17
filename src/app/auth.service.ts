import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private emailKey = 'auth_email'; // Clave para almacenar el correo electrónico
  private apiUrl = 'http://localhost:4001';//'http://192.168.1.9:4001'
  constructor(private http: HttpClient) { }


//   registrarUsuario(usuario: any) {
//     return this.http.post(`${this.apiUrl}/registro`, usuario);
//   }



  login(correo_electronico: string, password: string) {
    const userData = {
      correo_electronico: correo_electronico,
      password: password
    };
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token);
          this.saveEmail(correo_electronico);
        }
      })
    );
  }


  private saveEmail(email: string) {
    localStorage.setItem(this.emailKey, email);
  }

  getCorreoElectronico(): string | null {
    return localStorage.getItem(this.emailKey);
  }


  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
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

}