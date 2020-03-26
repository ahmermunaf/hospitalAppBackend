import {get, post, alertSuccess, alertError} from '../helper';
import Common from "../constants/Common";

// Patients apis
export const getPatients = () => (dispatch) => {
    dispatch({type: Common.GET_PATIENTS_API, loading: true, payload: []});
    get('patients/get')
        .then(({data}) => {
            if (!data.error) {
                dispatch({type: Common.GET_PATIENTS_API, loading: false, payload: data.data});
            } else {
                alertError(data.data[0]);
                dispatch({type: Common.GET_PATIENTS_API, loading: false, payload: []});
            }
        })
        .catch((error) => {
            dispatch({type: Common.GET_PATIENTS_API, loading: false, payload: []});
            console.log('error', error)
        });
};
export const addPatient = (payload, CB) => (dispatch) => {
    dispatch({type: Common.ADD_PATIENT_API, loading: true});
    post('patients/create', payload)
        .then(({data}) => {
            if (!data.error) {
                alertSuccess('Successfully add patient');
                CB && CB();
                dispatch({type: Common.ADD_PATIENT_API, loading: false});
                dispatch(getAll());
            } else {
                alertError(data.data[0]);
                dispatch({type: Common.ADD_PATIENT_API, loading: false});
            }
        })
        .catch((error) => {
            alertError('Something went wrong please try again');
            dispatch({type: Common.ADD_PATIENT_API, loading: false});
            console.log('error', error)
        });
};

// Operation Room and Theaters apis
export const getOperationRooms = () => (dispatch) => {
    dispatch({type: Common.GET_OPERATION_ROOMS_API, loading: true, payload: []});
    get('operationRooms/get')
        .then(({data}) => {
            if (!data.error) {
                dispatch({type: Common.GET_OPERATION_ROOMS_API, loading: false, payload: data.data});
            } else {
                alertError(data.data[0]);
                dispatch({type: Common.GET_OPERATION_ROOMS_API, loading: false, payload: []});
            }
        })
        .catch((error) => {
            dispatch({type: Common.GET_OPERATION_ROOMS_API, loading: false, payload: []});
            console.log('error', error)
        });
};
export const getOperationTheaters = () => (dispatch) => {
    dispatch({type: Common.GET_OPERATION_THEATER_API, loading: true, payload: []});
    get('operationTheaters/get')
        .then(({data}) => {
            if (!data.error) {
                dispatch({type: Common.GET_OPERATION_THEATER_API, loading: false, payload: data.data});
            } else {
                alertError(data.data[0]);
                dispatch({type: Common.GET_OPERATION_THEATER_API, loading: false, payload: []});
            }
        })
        .catch((error) => {
            dispatch({type: Common.GET_OPERATION_THEATER_API, loading: false, payload: []});
            console.log('error', error)
        });
};

// Patients Operation apis
export const getAllOperations = () => (dispatch) => {
    dispatch({type: Common.GET_ALL_OPERATIONS_API, loading: true, payload: []});
    get('operations/get')
        .then(({data}) => {
            if (!data.error) {
                dispatch({type: Common.GET_ALL_OPERATIONS_API, loading: false, payload: data.data});
            } else {
                alertError(data.data[0]);
                dispatch({type: Common.GET_ALL_OPERATIONS_API, loading: false, payload: []});
            }
        })
        .catch((error) => {
            dispatch({type: Common.GET_ALL_OPERATIONS_API, loading: false, payload: []});
            console.log('error', error)
        });
};
export const createOperation = (payload, CB) => (dispatch) => {
    dispatch({type: Common.CREATE_OPERATION_API, loading: true});
    post('operations/create', payload)
        .then(({data}) => {
            if (!data.error) {
                alertSuccess('Successfully create operation');
                CB && CB();
                dispatch({type: Common.CREATE_OPERATION_API, loading: false});
            } else {
                alertError(data.data[0]);
                alertError('Something went wrong please try again');
                dispatch({type: Common.CREATE_OPERATION_API, loading: false});
            }
        })
        .catch((error) => {
            alertError('Something went wrong please try again');
            dispatch({type: Common.CREATE_OPERATION_API, loading: false});
            console.log('error', error)
        });
};
export const updateOperation = (payload, CB) => (dispatch) => {
    dispatch({type: Common.UPDATE_OPERATION_API, loading: true});
    post('operations/update', payload)
        .then(({data}) => {
            if (!data.error) {
                alertSuccess('Successfully add patient');
                CB && CB();
                dispatch({type: Common.UPDATE_OPERATION_API, loading: false});
            } else {
                alertError(data.data[0]);
                alertError('Something went wrong please try again');
                dispatch({type: Common.UPDATE_OPERATION_API, loading: false});
            }
        })
        .catch((error) => {
            alertError('Something went wrong please try again');
            dispatch({type: Common.UPDATE_OPERATION_API, loading: false});
            console.log('error', error)
        });
};

// Procedures api
export const getProcedures = () => (dispatch) => {
    dispatch({type: Common.GET_PROCEDURES_API, loading: true, payload: []});
    get('procedures/get')
        .then(({data}) => {
            if (!data.error) {
                dispatch({type: Common.GET_PROCEDURES_API, loading: false, payload: data.data});
            } else {
                alertError(data.data[0]);
                dispatch({type: Common.GET_PROCEDURES_API, loading: false, payload: []});
            }
        })
        .catch((error) => {
            dispatch({type: Common.GET_PROCEDURES_API, loading: false, payload: []});
            console.log('error', error)
        });
};

// Diagnosis api
export const getDiagnosis = () => (dispatch) => {
    dispatch({type: Common.GET_DIAGNOSIS_API, loading: true, payload: []});
    get('diagnosis/get')
        .then(({data}) => {
            if (!data.error) {
                dispatch({type: Common.GET_DIAGNOSIS_API, loading: false, payload: data.data});
            } else {
                alertError(data.data[0]);
                dispatch({type: Common.GET_DIAGNOSIS_API, loading: false, payload: []});
            }
        })
        .catch((error) => {
            dispatch({type: Common.GET_DIAGNOSIS_API, loading: false, payload: []});
            console.log('error', error)
        });
};

export const getAll = () => (dispatch) => {
    dispatch(getPatients());
    dispatch(getOperationRooms());
    dispatch(getOperationTheaters());
    dispatch(getProcedures());
    dispatch(getDiagnosis());
};
