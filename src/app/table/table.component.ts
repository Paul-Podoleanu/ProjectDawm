import { Component, OnInit, ViewChild } from '@angular/core';
import { Cat } from '../interfaces/cat.interface';
import { CatService } from '../services/cat.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Routes } from '@angular/router';
import cats from '../services/cats.json';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { AddFormComponent } from '../add-form/add-form.component';

//Implement Routes
const routes: Routes = [
  { path: 'add', component: AddFormComponent }
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  //Variables
  listOfCats: Cat[] = [];
  selectedCat!: Cat;
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  searchedText: string = '';
  copyListOfCats = [...this.listOfCats];
  listOfColumns: any[] = [
    {
      title: 'Name',
      compare: (a: Cat, b: Cat) => a.name.localeCompare(b.name),
      priority: false,
    },
    {
      title: 'Age',
      compare: (a: Cat, b: Cat) => a.age - b.age,
      priority: false,
    },
    {
      title: 'Breed',
      compare: (a: Cat, b: Cat) => a.breed.localeCompare(b.breed),
      priority: false,
    },
    {
      title: 'Weight',
      compare: (a: Cat, b: Cat) => a.weight - b.weight,
      priority: false,
    },
    {
      title: 'Owner',
      compare: (a: Cat, b: Cat) => a.owner.localeCompare(b.owner),
      priority: false,
    }
  ];


  constructor(
    private catService: CatService,
    private router: Router
    ) {}

  @ViewChild('table') table!: NzTableComponent<Cat>;

  ngOnInit(): void {
    this.listOfCats=this.catService.cats;
    this.copyListOfCats = [...this.listOfCats];
  }

  deleteCat(cat: Cat){
    this.catService.deleteCat(cat);
  }

  addCat(){
    this.router.navigate(['/add']);
    this.showAddModal = true;
    this.copyListOfCats = [...this.listOfCats];
  }


  //Functie pentru a cauta in tabel
  search(search){
    //Lista cu pisici gasite
    const targetValue: Cat[] = [];
    //Search in listOfCats for search value, if found push to targetValue
    this.copyListOfCats.forEach((cat: Cat) => {
      if (JSON.stringify(cat).toLowerCase().includes(search.toLowerCase())) {
        targetValue.push(cat);
      }
    });
    //Set listOfCats to targetValue, if search is empty set listOfCats to copyListOfCat
    this.listOfCats = search ? targetValue : this.copyListOfCats;
  }

  //Functie pentru a sorta tabelul
  sort(sort: { key: string; value: string }): void {
    //Sorteaza lista de pisici dupa key si value
    this.listOfCats = this.listOfCats.sort((a, b) =>
      sort.value === 'ascend'
        ? a[sort.key!] > b[sort.key!]
          ? 1
          : -1
        : b[sort.key!] > a[sort.key!]
        ? 1
        : -1
    );
  }

}
