export interface Client {
    id? : string;
    firstName?: string;
    lastName?:string;
    email?:string;
    telephone? :number | null;
    balance? : number;
}