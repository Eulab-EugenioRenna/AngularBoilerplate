import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getNewAvatarImage(name = 'Name', surname = 'Surname') {
    const url = `https://avatar.iran.liara.run/username?username=[${name}+${surname}]`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((blob) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }),
      map((promise) => promise.then((base64) => base64)),
      catchError((error) => {
        console.error('Error to get avatar image:', error);
        return of('');
      })
    );
  }
}
