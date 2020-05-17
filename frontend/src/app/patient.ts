import { Drug } from './drug'
import { Treatment } from './treatment'

export interface Patient {
    _id: number;
    firstName: string;
    lastName: string;
    age: string;
    sex: string;
    drugs: Drug[];
    treatments: Treatment[];
}
