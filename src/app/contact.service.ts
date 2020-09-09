import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from './model/Address';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  // get all contacts sorted based on id
  getSortedContacts(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(environment.API_URL + '?_sort=id&_order=asc');
  }

  // delete a contact by given contact id
  deleteContact(id: any): Observable<any> {
    return this.httpClient.delete(environment.API_URL + id);
  }

  // save a new contact
  saveContact(payload: Address): Observable<any> {
    return this.httpClient.post(environment.API_URL, payload);
  }

  // update a contact using the contact id
  updateContact(payload: Address): Observable<any> {
    return this.httpClient.put(environment.API_URL + payload.id, payload);
  }
}
