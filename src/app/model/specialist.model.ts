import { ObjectID } from 'bson';

export interface SpecialistElement {
    _id: ObjectID;
    name: string;
    surname: string;
    specialization: string;
    description: string;
    email: string;
    password: string;
    city: string;
    person: string;
  }