import * as React from 'react';
import {CompanyType} from "../../../store/TableReducer";
import {useState} from "react";
import './RowCompany.css'

type Props = {
    company: CompanyType
    checkedRowId: number
    setCheckedRow: (id: number) => void
    editCompany: (company: CompanyType) => void
    deleteCompany: (id: number) => void
};
export const RowCompany = ({company,checkedRowId,setCheckedRow,editCompany,deleteCompany}: Props) => {

    const [curCompany, setCurCompany] = useState({...company})

    const {id,name,address} = curCompany
    const checked = checkedRowId === id
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'name') {
            setCurCompany((prev) => ({...prev,name: e.target.value}))
        }
        if (e.target.name === 'address') {
            setCurCompany((prev) => ({...prev,address: e.target.value}))
        }
    }

    const onBlurHandler = () => {
        editCompany(curCompany)
    }
    const deleteHandler = () => {
        deleteCompany(company.id)
    }

    return (
        <div className={`RowCompany ${(checked || checkedRowId === -1) && 'active'}`}>
            <div>
                <input type="checkbox" checked={checked || checkedRowId === -1} onChange={() => {setCheckedRow(checked ? -2 : id)}}/>
                <span>{`(id: ${id})`}</span>
            </div>
            <input name={'name'} value={name} onChange={onChangeHandler} onBlur={onBlurHandler}/>
            <div>{company.employees.length}</div>
            <input name={'address'} value={address} onChange={onChangeHandler} onBlur={onBlurHandler}/>
            <button onClick={deleteHandler}>X</button>
        </div>
    );
};