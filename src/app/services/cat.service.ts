import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cat } from '../interfaces/cat.interface';
import catData from './cats.json'

@Injectable({
  providedIn: 'root'
})

export class CatService {
  //The list of cats that is worked on
  public catList: Cat[] = catData
  catListSubject = new Subject<Cat[]>();


  constructor() { }


  get cats(): Cat[] {
    return this.catList;
  }

  set cats(catsToSet: any) {
    this.catList = catsToSet;
    this.catListSubject.next(catsToSet);
  }

  addNewCat() {
    this.catList.push(this.defaultCat());
    this.catListSubject.next(this.catList);
  }

  deleteCat(cat: Cat){
    const index=this.catList.findIndex(()=>cat);
    this.catList.splice(index,1);
    this.catListSubject.next(this.catList);
  }


  defaultCat(): Cat {
    return{
      name: '-',
      age: 0,
      breed: '-',
      weight: 0,
      owner: '-',
    };
  }
}
