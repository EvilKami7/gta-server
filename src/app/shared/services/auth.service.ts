import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, FbUserResponse, Profile, User} from '../interfaces';
import {Observable, Subject, throwError, from} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, concatMap, delay, mergeMap, tap} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import firebase from 'firebase/app';

@Injectable()
export class AuthService {

  public error$: Subject<string> = new Subject<string>();
  public currentUser: firebase.User;
  public tokenId: string = null;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private afDataBase: AngularFireDatabase,
  ){
  }

  static onAuthError(error: any): void {
    console.log(`Authentication error: ${error}`);
  }


  get token(): string {
    return this.tokenId;
  }


  loginAsync(user: User): Observable<string | null>{
    const promise = this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then(response => {
        this.currentUser = response.user;
        return response.user.getIdToken()
      }, AuthService.onAuthError)
      .then( response => this.tokenId = response ? response : null);
    return from(promise);
  }

  logoutAsync(): Observable<void> {
    const promise = this.afAuth.signOut()
      .then(() => {this.tokenId = null; this.currentUser = null});
    return from(promise);
  }

  registerAsync(user: User): Observable<firebase.auth.UserCredential>{
    return from(this.afAuth.createUserWithEmailAndPassword(user.email, user.password))
  }

  updateEmail(newEmail: string): Observable<void>{
    return from(this.currentUser.updateEmail(newEmail));
  }

  updatePassword(newPassword: string): Observable<void>{
    return from(this.currentUser.updatePassword(newPassword));
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error;
    switch (message){
      case 'INVALID_EMAIL':
        this.error$.next('invalid email')
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('invalid password')
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('email doesnt exist')
        break;
      case 'EMAIL_EXISTS':
        this.error$.next('email exist')
        break;
      default:
        this.error$.next(message);
        break;
    }
    //console.log(message);
    return throwError(error);
  }



  /*private setToken(response: FbAuthResponse | null) {
    if (response){
      console.log(response);
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    }else{
      localStorage.clear();
    }
  }*/


}
