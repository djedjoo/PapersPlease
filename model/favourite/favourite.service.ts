import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/app/environment/environment';
import { Observable } from 'rxjs';
import { Favourite } from './favourite';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public getFavourites(): Observable<Favourite[]>{
    return this.http.get<Favourite[]>(`${this.apiServerUrl}/favourite/all`)
  }

  public getFavouriteById(favouriteId: number): Observable<Favourite>{
    return this.http.get<Favourite>(`${this.apiServerUrl}/favourite/findId/${favouriteId}`)
  }

  public addFavourite(favourite: Favourite): Observable<Favourite>{
    return this.http.post<Favourite>(`${this.apiServerUrl}/favourite/add`, favourite)
  }

  public updateFavourite(favourite: Favourite): Observable<Favourite>{
    return this.http.put<Favourite>(`${this.apiServerUrl}/favourite/update`, favourite)
  }

  public deleteFavouriteById(favouriteId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/favourite/deleteId/${favouriteId}`)
  }
}
