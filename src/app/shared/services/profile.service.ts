import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getAvatarImageBase64(name = 'Name', surname = 'Surname') {
    const url = `https://avatar.iran.liara.run/username?username=${name}+${surname}`;
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

  getAvatarImage(name = 'Name', surname = 'Surname') {
    const url = `https://avatar.iran.liara.run/username?username=${name}+${surname}`;
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((blob) => {
        // Crea un nuovo Blob con il tipo MIME corretto
        return new Blob([blob], { type: 'image/png' });
      }),
      catchError((error) => {
        console.error('Error getting avatar file:', error);
        return of(new Blob()); // Restituisce un blob vuoto in caso di errore
      })
    );
  }

  async urlToBase64(url: string): Promise<string> {
    try {
      const response = await fetch(url, {
        mode: 'cors', // Abilita CORS
        credentials: 'same-origin', // Gestisce i cookie per stesso dominio
        headers: {
          'Access-Control-Allow-Origin': '*', // Permette richieste da qualsiasi origine
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }

      const blob = await response.blob();

      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Errore nella conversione da URL a base64:', error);
      if (error instanceof TypeError && error.message.includes('CORS')) {
        console.error('Errore CORS: Verifica le policy del server di origine');
      }
      return '';
    }
  }

  // Converte URL in File per upload
  async urlToFile(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  }

  // Converte File in base64
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Converte Blob in base64
  blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  // Converte Blob in File
  blobToFile(blob: Blob, fileName: string): File {
    try {
      // Crea un nuovo File dal Blob mantenendo il tipo MIME
      return new File([blob], fileName, {
        type: blob.type,
        lastModified: Date.now(),
      });
    } catch (error) {
      console.error('Errore nella conversione da Blob a File:', error);
      // Ritorna un File vuoto in caso di errore
      return new File([], fileName);
    }
  }

  // Versione asincrona che gestisce eventuali operazioni asincrone future
  async blobToFileAsync(blob: Blob, fileName: string): Promise<File> {
    try {
      return new File([blob], fileName, {
        type: blob.type,
        lastModified: Date.now(),
      });
    } catch (error) {
      console.error('Errore nella conversione da Blob a File:', error);
      return new File([], fileName);
    }
  }
}
