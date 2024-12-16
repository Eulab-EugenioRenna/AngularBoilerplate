import { Injectable } from '@angular/core';
import PocketBase, { OnStoreChangeFunc } from 'pocketbase';
import { ProfileService } from './profile.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PocketbaseService {
  constructor(private imageUtils: ProfileService) {}

  pb = new PocketBase(environment.pocketbaseUrl);
  AUTH_COLLECTION = 'users';

  get user() {
    return this.pb.authStore.record?.id;
  }

  get session() {
    return this.pb.authStore.record;
  }

  async register(email: string, password: string) {
    const username = email.split('@');

    const avatar = await new Promise<File>((resolve) => {
      this.imageUtils
        .getAvatarImage(username[0], username[1])
        .subscribe((blob) => {
          const file = this.imageUtils.blobToFile(blob, 'avatar.png');
          resolve(file);
        });
    });

    return await this.pb.collection(this.AUTH_COLLECTION).create({
      email,
      password,
      passwordConfirm: password,
      username: username[0],
      avatar: avatar,
    });
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

  async getUserById(id: string) {
    const user = await this.pb.collection(this.AUTH_COLLECTION).getOne(id);
    return user;
  }

  async requestVerification(email: string) {
    return await this.pb
      .collection(this.AUTH_COLLECTION)
      .requestVerification(email);
  }

  getAvatarImage() {
    return this.pb.files.getURL(
      { ...this.pb.authStore.record },
      this.pb.authStore.record?.['avatar']
    );
  }

  getValidatedUser() {
    return this.pb.authStore.isValid;
  }

  authChanges(callback: OnStoreChangeFunc) {
    return this.pb.authStore.onChange(callback);
  }

  async verifyEmail(verificationId: string) {
    return await this.pb
      .collection(this.AUTH_COLLECTION)
      .confirmVerification(verificationId);
  }

  cancelAllRequests() {
    return this.pb.cancelAllRequests();
  }

  getCurrentUser() {
    const avatar = this.getAvatarImage();
    const currentUser = {
      collectionId: this.pb.authStore.record?.['collectionId'] ?? '',
      collectionName: this.pb.authStore.record?.['collectionName'] ?? '',
      verified: this.pb.authStore.record?.['verified'] ?? false,
      avatar: avatar ?? '',
      created: this.pb.authStore.record?.['created'] ?? new Date(),
      email: this.pb.authStore.record?.['email'] ?? '',
      emailVisibility: this.pb.authStore.record?.['emailVisibility'] ?? false,
      id: this.pb.authStore.record?.id ?? '',
      name: this.pb.authStore.record?.['name'] ?? '',
      updated: this.pb.authStore.record?.['updated'] ?? new Date(),
      username: this.pb.authStore.record?.['username'] ?? '',
    };

    return currentUser;
  }
}
