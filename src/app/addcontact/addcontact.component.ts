import { Address } from './../model/Address';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit {

  contactForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private toastr: ToastrService) { }

  ngOnInit() {
    this.createContactForm();
  }

  // intializing the FormGroup variable using form builder
  createContactForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      buildingNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      street: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  // adding contact to backend using ContactService
  addContact(payload: Address) {
    this.createContactForm();
    const latestId = parseInt(sessionStorage.getItem('latestId'), 2) + 1;
    sessionStorage.setItem('latestId', '' + latestId);
    payload.id = latestId;
    this.toastr.success('Contact Added', payload.name + ' contact is added successfully');
    this.contactService.saveContact(payload).subscribe();
  }

}
