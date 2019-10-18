import { Customer } from './customer';

export class Account extends Customer {
    password: string;
    isPersistent: boolean;
}