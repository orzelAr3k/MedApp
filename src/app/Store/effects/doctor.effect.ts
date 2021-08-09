import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as DoctorActions from '../actions/doctor.action';

import { SpecialistsService } from 'src/app/services/specialists.service';

@Injectable()
export class DoctorEffects {
  constructor(
    private actions$: Actions,
    private specialistService: SpecialistsService
  ) {}

  loadDoctors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorActions.DoctorActionTypes.LOAD_DOCTOR),
      switchMap(() =>
        this.specialistService.getListOfSpecialists().pipe(
          map((data) =>
            DoctorActions.LoadDoctorSuccessAction({ payload: data })
          ),
          catchError((error) =>
            of(DoctorActions.LoadDoctorFailureAction({ payload: error }))
          )
        )
      )
    )
  );

  addDoctor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorActions.DoctorActionTypes.ADD_DOCTOR),
      switchMap((state) =>
        this.specialistService.addNewSpecialists(state['payload']).pipe(
          map(() =>
            DoctorActions.AddDoctorSucccessAction({ payload: state['payload'] })
          ),
          catchError((error) =>
            of(DoctorActions.AddDoctorFailureAction({ payload: error }))
          )
        )
      )
    )
  );

  deleteDoctor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorActions.DoctorActionTypes.DELETE_DOCTOR),
      switchMap((state) =>
        this.specialistService.deleteSpecialist(state['payload']).pipe(
          map(() =>
            DoctorActions.DeleteSuccesDoctorAction({
              payload: state['payload'],
            })
          ),
          catchError((error) =>
            of(DoctorActions.DeleteFailureDoctorAction({ payload: error }))
          )
        )
      )
    )
  );

  patchDoctor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorActions.DoctorActionTypes.PATCH_DOCTOR),
      switchMap((state) =>
        this.specialistService
          .changeSpecialists(state['payload']['data'], state['payload']['id'])
          .pipe(
            map(() =>
              DoctorActions.PatchDoctorSuccessAction({
                payload: state['payload'],
              })
            ),
            catchError((error) =>
              of(DoctorActions.PatchDoctorFailureAction({ payload: error }))
            )
          )
      )
    )
  );
}
