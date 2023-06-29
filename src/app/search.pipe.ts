import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //Daca nu exista date returneaza null
    if (!value) return null;
    //Daca nu exista search value returenaza null
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter((item: any) => {
      return JSON.stringify(item).toLowerCase().includes(args);
    })
  }

}
