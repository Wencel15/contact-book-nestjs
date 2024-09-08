import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from './contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // Route to create a contact
  @Post()
  create(@Body() contact: Omit<Contact, 'id'>): Contact {
    return this.contactService.create(contact);
  }

  // Rout to list all contacts
  @Get()
  findAll(): Contact[] {
    return this.contactService.findAll();
  }

  // Route to update a contact
  @Patch(':id')
  update(@Param('id') id: number, @Body() contact: Partial<Contact>): Contact {
    return this.contactService.update(Number(id), contact);
  }

  // Route to delete a contact
  @Delete(':id')
  delete(@Param('id') id: number): void {
    this.contactService.delete(Number(id));
  }
}
