import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useAppSelector} from "./store/hooks/useAppSelector";
import {useAppDispatch} from "./store/hooks/useAppDispatch";
import {addCompanies, CompanyType, deleteCompany, editCompany, setLoad} from "./store/TableReducer";
import {TableCompany} from "./components/TableCompany/TableCompany";
import {TableEmployee} from "./components/TableEmployee/TableEmployee";
import {fakeAPI} from "./utils/fakeAPI";
import './App.css';

function App() {

    const {companies, load} = useAppSelector(state => state.table)
    const lastId = useMemo(() => {
        return [...companies].sort((a,b) => b.id - a.id)[0]?.id+1
    }, [companies])
    const dispatch = useAppDispatch()
    const [fetch, setFetch] = useState(true)
    const [checkedCompanyId, setCheckedCompanyId] = useState<number>(-2)

    useEffect(() => {
        if (fetch) {
            fakeRequest(lastId || 0)
            setFetch(false)
        }
    }, [fetch])

    async function fakeRequest(acc: number = 0) {
        dispatch(setLoad(true))
        const response = await fakeAPI.fetch(20,acc)
        dispatch(addCompanies({companies:response,start: false}))
        dispatch(setLoad(false))
    }

    const editCompanyHandler = (company: CompanyType) => {
        dispatch(editCompany(company))
    }

    const addNewCompanyHandler = () => {
        const newCompany = {
            id: lastId || companies.length,
            name: '',
            address: '',
            employees: [],
        }
        dispatch(addCompanies({companies:[newCompany],start: true}))
    }

    const addNewEmployeeHandler = () => {
        const checkedCompany = companies.find(el => el.id === checkedCompanyId)
        if (checkedCompany) {
            const extendedCompany = {
                ...checkedCompany,
                employees: [
                    ...checkedCompany.employees,
                    {
                        id: checkedCompany.id + '_' +checkedCompany.employees.length,
                        name: '',
                        surname: '',
                        job: '',
                    }
                ]
            }
            dispatch(editCompany(extendedCompany))
        }
    }

    const deleteCompanyHandler = (id: number) => {
        dispatch(deleteCompany(id))
    }

    return (
    <div className="App">
        <div style={{position: 'absolute', left: '20px', top: '20px', display: 'flex', gap: '20px', fontSize: '20px'}}>
            <div>Компаний в списке: {companies.length}</div>
            <button title='Вручную подгрузить пачку компаний' onClick={() => setFetch(true)}>+</button>
            {load && 'Loading...'}
        </div>

        <div className="App__container">
            <TableCompany setFetch={setFetch} companies={companies} load={load} checkedRowId={checkedCompanyId} setCheckedRowId={setCheckedCompanyId} editCompany={editCompanyHandler} deleteCompany={deleteCompanyHandler}/>
            <button onClick={addNewCompanyHandler}>Добавить компанию</button>
        </div>
        <div className="App__container">
            { checkedCompanyId >= 0 && <TableEmployee companies={companies} checkedCompanyId={checkedCompanyId} load={load} editCompany={editCompanyHandler}/>}
            { checkedCompanyId >= 0 && <button onClick={addNewEmployeeHandler}>Добавить сотрудника</button>}
        </div>
    </div>
    );
}

export default App;