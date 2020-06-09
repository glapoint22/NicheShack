import { Address } from './address';
import { Contact } from './contact';

export interface Vendor {
    id: string;
    name: string;
    webPage: string;
    address: Address;
    primaryContact: Contact;
    secondaryContact: Contact;
    notes: string;
}