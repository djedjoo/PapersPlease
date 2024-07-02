import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

const oAuthConfig: AuthConfig ={
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: 'http://localhost:4200/signup',
  clientId: '828747053303-o4jve80kb28t3p5rbijnnv0r7fqadjq2.apps.googleusercontent.com',
  scope: 'openid profile email',
}

export interface UserInfo{
  info:{
    sub: string,
    email: string,
    given_name: string,
    family_name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  userProfileSubject = new Subject<UserInfo>()

  constructor(private readonly oAuthService: OAuthService)  {}

  public googleLogin(){
    this.oAuthService.configure(oAuthConfig)
    this.oAuthService.loadDiscoveryDocument().then( ()=> {
      this.oAuthService.tryLoginImplicitFlow().then( ()=> {
        if(!this.oAuthService.hasValidAccessToken()){
          this.oAuthService.initLoginFlow()
        }
        else
          this.oAuthService.loadUserProfile().then( (userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo)

          })
      })
    })
  }

  public setItem(){
    this.oAuthService.configure(oAuthConfig)
    this.oAuthService.loadDiscoveryDocument().then( ()=> {
      this.oAuthService.tryLoginImplicitFlow().then( ()=> {
        if(!this.oAuthService.hasValidAccessToken()){
        }
        else
          this.oAuthService.loadUserProfile().then( (userProfile) => {
            this.userProfileSubject.next(userProfile as UserInfo)
          })
      })
    })
  }

  public signOut(){
    this.oAuthService.logOut();
  }
}
