import * as firebase from 'firebase';
import 'firebase/auth';
import { User } from '../types/Entities';
import { APIProvider } from '../services/APIProvider';
import { AuthResponseMessages } from '../types/AuthResponseMessages';

export class AuthService {
  static currentUser: User = {} as User;
  static subscribers: Function[] = [];

  static init() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user != null) {
        this.currentUser = await APIProvider.getUser(user.email);
        this.currentUser.isAdmin = true;
      } else {
        this.currentUser = null;
      }

      this.subscribers.map((item) => {
        item();
      });
    });
  }

  static subscribe(callback: Function) {
    this.subscribers.push(callback);
  }

  static async signUp(
    name: string,
    email: string,
    password: string
  ) {
    const user: User = { id: 0, name, email, isAdmin: false };
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await APIProvider.addUser(user);
    } catch (e) {
      throw new Error(AuthResponseMessages[e.code]);
    }
    return user;
  }

  static async signIn(email: string, password: string) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw new Error(AuthResponseMessages[e.code]);
    }
  }

  static async signOut() {
    await firebase.auth().signOut();
  }
}
