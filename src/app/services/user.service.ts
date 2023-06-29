import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user.interface';
import userData from '../services/users.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //The list of users that is worked on
  public userList: User[] = userData

  get users(): User[] {
    return this.userList;
  }

  constructor() { }

  //Functie pentru a verifica daca o parola si un username exista in lista de useri
  checkUser(username: string, password: string): boolean {
    console.log(username);
    console.log(password);
    for (let user of this.userList) {
      console.log(user.username);
      console.log(user.password);
      if (user.username == username && user.password == password) {
        return true;
      }
    }
    return false;
  }

  //Fucntie pentru a verifica daca un username exista in lista de useri
  checkUsername(username: string): boolean {
    for (let user of this.userList) {
      if (user.username == username) {
        return true;
      }
    }
    return false;
  }

  //Functie pentru a verifica daca o parola exista in lista de useri
  checkPassword(password: string): boolean {
    for (let user of this.userList) {
      if (user.password == password) {
        return true;
      }
    }
    return false;
  }

  //Functie pentru a adauga un user in lista de useri
  addUser(user: User): void {
    userData.push(user);
  }

}
