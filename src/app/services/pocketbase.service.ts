import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PocketbaseService {
  pb: PocketBase;
  AUTH_COLLECTION = 'users';
  constructor() {
    this.pb = new PocketBase(environment.pocketbaseUrl);
  }

  get user() {
    return this.pb.authStore.record?.id;
  }

  get session() {
    return this.pb.authStore.record;
  }

  async register(email: string, password: string) {
    return await this.pb
      .collection(this.AUTH_COLLECTION)
      .create({ email, password });
  }

  signOut() {
    return this.pb.authStore.clear();
  }

  async signInPassword(email: string, password: string) {
    return await this.pb
      .collection(this.AUTH_COLLECTION)
      .authWithPassword(email, password);
  }

  async verifyOTP(otpId: string, otp: string) {
    return this.pb.collection(this.AUTH_COLLECTION).authWithOTP(otpId, otp);
  }

  async signInOTP(email: string) {
    return await this.pb.collection(this.AUTH_COLLECTION).requestOTP(email);
  }
}
