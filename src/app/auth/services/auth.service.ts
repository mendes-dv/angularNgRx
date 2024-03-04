import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../components/types/registerRequest.interface';
import { map, Observable } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { AuthResponseInterface } from '../components/types/authResponse.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) {
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(response => response.user));
  }
}
