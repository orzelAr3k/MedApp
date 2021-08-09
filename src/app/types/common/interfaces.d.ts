interface SpecialistElement {
    _id: import('bson').ObjectID; // ObjectID;
    name: string;
    surname: string;
    specialization: string;
    description: string;
    email: string;
    password: string;
    city: string;
    person: string;
}


interface LoginElement {
    _id: import('bson').ObjectID; //ObjectID;
    name: string;
    surname: string;
    email: string;
    password: string;
    person: string;
}

interface Appointment {
    appointmentId: string;
    date: Date;
    hour: string;
    name: string;
    description: string;
    city: string;
}

interface DoctorState {
    doctors: SpecialistElement[];
    loading: boolean;
    error: Error | undefined;
    
}

