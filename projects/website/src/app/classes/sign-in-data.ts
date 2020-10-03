import { Customer } from 'classes/customer';
import { TokenData } from 'interfaces/token-data';

export interface SignInData {
    customer: Customer;
    tokenData: TokenData;
}
