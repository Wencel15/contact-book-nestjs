import { Injectable, NotFoundException } from '@nestjs/common';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
  private contacts: Contact[] = [];
  private idCounter = 1;
  contactsIndex: Contact[];

  // Create a new contact
  create(contact: Omit<Contact, 'id'>): Contact {
    const newContact = { id: this.idCounter++, ...contact };
    this.contacts.push(newContact);
    return newContact;
  }

  // List all contacts
  findAll(): Contact[] {
    return this.contacts;
  }

  // Update a contact
  update(id: number, updatedContact: Partial<Contact>): Contact {
    const contact = this.contacts.find((c) => c.id === id);
    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }
    Object.assign(contact, updatedContact);
    return contact;
  }

  // Delete a contact
  delete(id: number): void {
    this.contacts = this.contacts.filter((c) => c.id !== id);
  }
}
