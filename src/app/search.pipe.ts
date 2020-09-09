import { Pipe, PipeTransform } from '@angular/core';
import { Address } from './model/Address';

@Pipe({
  name: 'search'
})

// Implement logic to filter the given contacts based on given searchText
// Convert text to lowercase
export class SearchPipe implements PipeTransform {

  transform(contacts: Address[], searchText: any): any {
    if (searchText == null) {
      return contacts;
    }
    return contacts.filter( (contact) => {
      return contact.name.toLowerCase().includes(searchText.toLowerCase())
      || contact.contactNumber.toString().toLowerCase().includes(searchText.toString().toLowerCase());
    });
  }


}

