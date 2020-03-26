import Common from '../constants/Common';

const initialState = {
    operationRooms: [],
    operationRoomsLoading: false,
    procedures: [],
    proceduresLoading: false,
    diagnosis: [],
    diagnosisLoading: false,
    operationTheaters: [],
    operationTheatersLoading: false,
    patients: [],
    patientsLoading: false,
    operations: [],
    operationsLoading: false,
    addPatientLoading: false,
    updateOperationLoading: false,
    createOperationLoading: false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        // Patients apis
        case Common.GET_PATIENTS_API:
            return {...state, patientsLoading: action.loading, patients: action.payload};
        case Common.ADD_PATIENT_API:
            return {...state, addPatientLoading: action.loading};

        //  Patients Operation apis
        case Common.GET_ALL_OPERATIONS_API:
            return {...state, operationsLoading: action.loading, operations: action.payload};
        case Common.UPDATE_OPERATION_API:
            return {...state, updateOperationLoading: action.loading};
        case Common.CREATE_OPERATION_API:
            return {...state, createOperationLoading: action.loading};

        // Operation Room and Theaters apis
        case Common.GET_OPERATION_ROOMS_API:
            return {...state, operationRoomsLoading: action.loading, operationRooms: action.payload};
        case Common.GET_OPERATION_THEATER_API:
            return {...state, operationTheatersLoading: action.loading, operationTheaters: action.payload};

        // Procedures api
        case Common.GET_PROCEDURES_API:
            return {...state, proceduresLoading: action.loading, procedures: action.payload};

        // Diagnosis api
        case Common.GET_DIAGNOSIS_API:
            return {...state, diagnosisLoading: action.loading, diagnosis: action.payload};

        default:
            return state;
    }
};