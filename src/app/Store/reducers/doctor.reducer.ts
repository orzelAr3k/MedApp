import * as DoctorActions from '../actions/doctor.action';
import { createReducer, Action, on } from '@ngrx/store';

const initialState: DoctorState = {
  doctors: [],
  loading: false,
  error: undefined,
};

const _doctorReducer = createReducer(
  initialState,
  on(DoctorActions.LoadDoctorAction, (state) => {
    return { ...state, loading: true };
  }),
  on(DoctorActions.LoadDoctorSuccessAction, (state, { payload }) => {
    return { ...state, doctors: payload, loading: false };
  }),
  on(DoctorActions.LoadDoctorFailureAction, (state, { payload }) => {
    return { ...state, loading: false, error: payload };
  }),
  on(DoctorActions.AddDoctorAction, (state, { payload }) => {
    return { ...state, loading: true };
  }),
  on(DoctorActions.AddDoctorSucccessAction, (state, { payload }) => {
    return { ...state, doctors: [...state.doctors, payload], loading: false };
  }),
  on(DoctorActions.AddDoctorFailureAction, (state, { payload }) => {
    return { ...state, loading: false, error: payload };
  }),
  on(DoctorActions.DeleteDoctorAction, (state, { payload }) => {
    return { ...state, loading: true };
  }),
  on(DoctorActions.DeleteSuccesDoctorAction, (state, { payload }) => {
    return {
      ...state,
      doctors: state.doctors.filter((item) => item._id !== payload),
      loading: false,
    };
  }),
  on(DoctorActions.DeleteFailureDoctorAction, (state, { payload }) => {
    return { ...state, loading: false, error: payload };
  }),
  on(DoctorActions.PatchDoctorAction, (state, { payload }) => {
    return { ...state, loading: true };
  }),
  on(DoctorActions.PatchDoctorSuccessAction, (state, { payload }) => {
    return {
      ...state,
      doctors: [
        ...state.doctors.filter(item => item._id !== payload.id),
        ...{
          ...state.doctors.filter((item) => item._id === payload.id),
          name: payload.data.name,
          surname: payload.data.surname,
          description: payload.data.description,
          specialization: payload.data.specialization,
        },
      ],
      loading: false,
    };
  }),
  on(DoctorActions.PatchDoctorFailureAction, (state, { payload }) => { return { ...state, loading: false, error: payload }}),
);

export function doctorReducer(state: DoctorState = initialState, action: Action) {
    return _doctorReducer(state, action);
}
