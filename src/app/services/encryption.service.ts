import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DefaultResponse } from '../shared/models/http.model';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
public baseUrl: string = `${environment.URL_API}/`;
  constructor( private http: HttpClient) { }

    async encryptName(name: string) {
        try {
            let response = await firstValueFrom(this.http.post<DefaultResponse>(this.baseUrl + 'encrypt-name', { name }));
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async decryptName(encryptedName: string) {
        try {
            let response = await firstValueFrom(this.http.post<DefaultResponse>(this.baseUrl + 'decrypt-name', { encryptedName }));
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}
