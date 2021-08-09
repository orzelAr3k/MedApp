import { createAction, props } from "@ngrx/store";
import { ObjectId } from "bson";

export enum DoctorActionTypes {
    LOAD_DOCTOR =           "[DOCTORS] Load Doctors",
    LOAD_DOCTOR_SUCCESS =   "[DOCTORS] Load Doctors Success",
    LOAD_DOCTOR_FAILURE =   "[DOCTORS] Load DOctors Failure",
    ADD_DOCTOR =            "[DOCTORS] Add Doctor",
    ADD_DOCTOR_SUCCESS =    "[DOCTORS] Add Doctor Success",
    ADD_DOCTOR_FAILURE =    "[DOCTORS] Add Doctor Failure",
    DELETE_DOCTOR =         "{DOCTORS] Delete Doctor",
    DELETE_DOCTOR_SUCCESS = "[DOCTORS] Delete Doctor Success",
    DELETE_DOCTOR_FAILURE = "[DOCTORS] Delete Doctor Failure",
    PATCH_DOCTOR =          "[DOCTORS] Patch Doctor",
    PATCH_DOCTOR_SUCCESS =  "[DOCTORS] Patch Doctor Success",
    PATCH_DOCTOR_FAILURE =  "[DOCTORS] Patch Doctor Failure",

} 

export const LoadDoctorAction = createAction(DoctorActionTypes.LOAD_DOCTOR);
export const LoadDoctorSuccessAction = createAction(DoctorActionTypes.LOAD_DOCTOR_SUCCESS, props<{ payload: SpecialistElement[] }>());
export const LoadDoctorFailureAction = createAction(DoctorActionTypes.LOAD_DOCTOR_FAILURE, props<{ payload: Error }>());
export const AddDoctorAction = createAction(DoctorActionTypes.ADD_DOCTOR, props<{ payload: SpecialistElement }>());
export const AddDoctorSucccessAction = createAction(DoctorActionTypes.ADD_DOCTOR_SUCCESS, props<{ payload: SpecialistElement }>());
export const AddDoctorFailureAction = createAction(DoctorActionTypes.ADD_DOCTOR_FAILURE, props<{ payload: Error }>());
export const DeleteDoctorAction = createAction(DoctorActionTypes.DELETE_DOCTOR, props<{ payload: ObjectId }>());
export const DeleteSuccesDoctorAction = createAction(DoctorActionTypes.DELETE_DOCTOR_SUCCESS, props<{ payload: ObjectId }>());
export const DeleteFailureDoctorAction = createAction(DoctorActionTypes.DELETE_DOCTOR_FAILURE, props<{ payload: Error }>());
export const PatchDoctorAction = createAction(DoctorActionTypes.PATCH_DOCTOR, props<{ payload: {data: { name: string, surname: string, specialization: string, description: string }, id: ObjectId }}>());
export const PatchDoctorSuccessAction = createAction(DoctorActionTypes.PATCH_DOCTOR_SUCCESS, props<{ payload: {data: { name: string, surname: string, specialization: string, description: string }, id: ObjectId }}>());
export const PatchDoctorFailureAction = createAction(DoctorActionTypes.PATCH_DOCTOR_FAILURE, props<{ payload: Error }>());
