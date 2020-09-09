import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Address } from '../model/Address';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})

export class ContactComponent implements OnInit {
  contacts: Address[];
  contactForm: FormGroup;

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  // get all contacts using ContactService and save the last Id in the session storage
  ngOnInit() {
    this.contactService.getSortedContacts().subscribe((data) => {
      this.contacts = data;
      sessionStorage.setItem('latestId', '' + data[data.length - 1].id);
    });
    this.createContactForm();
  }

  // intializing the FormGroup variable using form builder
  createContactForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$')
        ],
      ],
      buildingNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      street: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }


  // delete the contact using ContactService and id of the contact
  deleteContact(contact: Address) {
    this.contactService.deleteContact(contact.id).subscribe();
    this.contacts = this.contacts.filter((i) => i.id !== contact.id);
    this.toastr.error('Contact Deleted', contact.name + ' is deleted');
  }

  // update the modal's form by updating FormGroup variable value
  updateModalForm(contact: Address) {
    this.contactForm = this.formBuilder.group({
      id: [contact.id],
      name: [contact.name, Validators.required],
      email: [contact.email, [Validators.required, Validators.email]],
      contactNumber: [
        contact.contactNumber,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$')
        ],
      ],
      buildingNo: [contact.buildingNo, [Validators.required, Validators.pattern('^[0-9]*$')]],
      street: [contact.street, Validators.required],
      area: [contact.area, Validators.required],
      city: [contact.city, Validators.required],
      state: [contact.state, Validators.required],
      pincode: [contact.pincode, [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }

  // update the changed value in backend using ContactService
  updateContact(payload: Address) {
    this.contacts[
      this.contacts.findIndex((o) => o.id === payload.id)
    ] = payload;
    this.contactService.updateContact(payload).subscribe();
    location.reload();
  }
}
