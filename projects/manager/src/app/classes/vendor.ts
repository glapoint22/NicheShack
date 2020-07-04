import { Address } from './address';
import { Contact } from './contact';

export class Vendor {
    id: string;
    name: string;
    webPage: string;
    address: Address = new Address();
    primaryContact: Contact = new Contact();
    secondaryContact: Contact = new Contact();
    notes: string;
}