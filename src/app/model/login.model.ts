import { ObjectID } from 'bson';

export interface LoginElement {
    _id: ObjectID;
    name: string;
    surname: string;
    email: string;
    password: string;
    person: string;
  }