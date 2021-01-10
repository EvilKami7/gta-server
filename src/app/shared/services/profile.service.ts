import {Injectable} from '@angular/core';
import {from, Observable, Subject} from 'rxjs';
import {Profile} from '../interfaces';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable()

export class ProfileService {

  public profile: Profile = {} as Profile;
  private user: AngularFireList<Profile[]>;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private afDataBase: AngularFireDatabase,
    private router: Router,
    ){

  }

  static profileSaveError(e: Error) {
    console.log('Profile saving error', e);
  }

  loadProfileAsync(userId: string): Observable<Profile> {
    const ref = this.afDataBase.database.ref('users/' + userId);
    return new Observable((observer) => {
      ref.once('value', snapshot => {
        this.profile = snapshot.val();
        observer.next(snapshot.val())
        },
        error => observer.error(error));

    });
  }

  updateProfile(userId: string, profile: Profile){
    return from(firebase.database().ref('users/' + userId).update(profile));
  }

  saveProfileAsync(userId: string): Observable<any> {
    const ref = this.afDataBase.database.ref('users/' + userId);
    return from(ref.set(this.profile, ProfileService.profileSaveError));
  }

  onProfileChanged(profile: Profile): void {
    if (profile.admin){
      this.router.navigate(['/admin','dashboard']);
    } else {this.router.navigate(['/','profile'])}
    console.log(`Profile loaded:`, profile);
    console.log(`Profile admin:`, profile.admin);
  }

  isAdmin(): boolean {
    return this.profile.admin >= 1;
  }

}
