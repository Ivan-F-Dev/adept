import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface EmployeeType {
    id: string
    name: string
    surname: string
    job: string
}

export interface CompanyType {
    id: number
    name: string
    address: string
    employees: EmployeeType[]
}

export interface StateTableReducerType {
    load: boolean
    companies: CompanyType[] | []
}

const StateTableReducer: StateTableReducerType = {
    load: false,
    companies: []
}

const homeSlice = createSlice({
    name: "tableReducer",
    initialState: StateTableReducer,
    reducers: {
        setLoad(state, action: PayloadAction<boolean>) {
            state.load = action.payload
        },
        addCompanies(state, action: PayloadAction<{companies: CompanyType[],start: boolean }>) {
            if (action.payload.start) {
                state.companies = [...action.payload.companies,...state.companies]//при создании компании удобнее добавить ее в начало списка
            } else {
                state.companies = [...state.companies,...action.payload.companies]
            }

        },
        editCompany(state, action: PayloadAction<CompanyType>) {
            state.companies = state.companies.map(el => {
                if (el.id === action.payload.id) {
                    return action.payload
                }
                return el
            })
        },
        deleteCompany(state, action: PayloadAction<number>) {
            state.companies = state.companies.filter(el => el.id !== action.payload)
        },
    }
})

export default homeSlice.reducer
export const { addCompanies,editCompany, setLoad,deleteCompany } = homeSlice.actions