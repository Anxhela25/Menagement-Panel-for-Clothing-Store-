import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UsersModel } from '../entity/Users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  checkEmailExists(email: string) {
    throw new Error('Method not implemented.');
  }
  private readonly urlu: string;
  constructor(private httpClient: HttpClient) {
    //Initialize the API URL using the base URL from the environment
    this.urlu = `${environment.baseUrl}/users`;
  }

  //Create new users
  createUsers(
    newUsers: Omit<UsersModel, 'id' | 'active'>
  ): Observable<UsersModel> {
    const user: Omit<UsersModel, 'id'> = {
      ...newUsers,
      active: false,
    };

    return this.httpClient.post<UsersModel>(this.urlu, user);
  }
  // Send a GET request to retrieve the list of users
  getUsers(): Observable<UsersModel[]> {
    return this.httpClient.get<UsersModel[]>(this.urlu);
  }
}
