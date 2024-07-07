import * as React from 'react';
import {useState} from "react";
import {CompanyType, EmployeeType} from "../../../store/TableReducer";
import '../../TableCompany/RowCompany/RowCompany.css'

type Props = {
    company: CompanyType
    employee:  EmployeeType
    checkedEmployeeId: string
    setCheckedEmployeeId: (id: string) => void
    editCompany: (company: CompanyType) => void
};
export const RowEmployee = ({company,employee,checkedEmployeeId,setCheckedEmployeeId,editCompany}: Props) => {
    const [curEmployee, setCurEmployee] = useState({...employee})
    const {id,surname,name,job} = curEmployee
    const checked = checkedEmployeeId === id

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'surname') {
            setCurEmployee((prev) => ({...prev,surname: e.target.value}))
        }
        if (e.target.name === 'name') {
            setCurEmployee((prev) => ({...prev,name: e.target.value}))
        }
        if (e.target.name === 'job') {
            setCurEmployee((prev) => ({...prev,job: e.target.value}))
        }
    }

    const onBlurHandler = () => {
        const extendedCompany = {
            ...company,
            employees: company.employees.map(el => {
                if (el.id === employee.id) {
                    return {
                        id: curEmployee.id,
                        surname: curEmployee.surname,
                        name: curEmployee.name,
                        job: curEmployee.job,
                    }
                }
                return el
            })}
        editCompany(extendedCompany)
    }
    const deleteHandler = () => {
        const extendedCompany = {
            ...company,
            employees: company.employees.filter(el => el.id !== employee.id)
        }
        editCompany(extendedCompany)
    }
    return (
        <div className={`RowCompany ${(checked || checkedEmployeeId === '-1') && 'active'}`}>
            <div>
                <input type="checkbox" checked={checked || checkedEmployeeId === '-1'} onChange={() => {setCheckedEmployeeId(checked ? '-2' : id)}}/>
                <span>{`(id: ${id})`}</span>
            </div>
            <input name={'surname'} value={surname} onChange={onChangeHandler} onBlur={onBlurHandler}/>
            <input name={'name'} value={name} onChange={onChangeHandler} onBlur={onBlurHandler}/>
            <input name={'job'} value={job} onChange={onChangeHandler} onBlur={onBlurHandler}/>
            <button onClick={deleteHandler}>X</button>
        </div>
    );
};