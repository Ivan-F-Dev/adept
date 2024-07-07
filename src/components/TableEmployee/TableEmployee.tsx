import * as React from 'react';
import {CompanyType} from "../../store/TableReducer";
import '../TableCompany/TableCompany.css'
import {RowEmployee} from "./RowEmployee/RowEmployee";
import {useState} from "react";

type Props = {
    load: boolean
    companies: CompanyType[],
    checkedCompanyId: number,
    editCompany: (company: CompanyType) => void
};
export const TableEmployee = ({companies,load,checkedCompanyId,editCompany}: Props) => {
    const [checkedEmployeeId, setCheckedEmployeeId] = useState<string>('-2')// -2 никто, -1 все
    const curCompany = companies.find(el => el.id === checkedCompanyId)
    console.log('TableEmployee',curCompany)
    return (
        <div className={'TableCompany'}>
            <div className={'TableCompany__head'}>
                <div>
                    <input type="checkbox" checked={checkedEmployeeId === '-1'} onChange={() => {setCheckedEmployeeId(checkedEmployeeId === '-1' ? '-2' : '-1')}}/>
                    Выделить все
                </div>
                <div>Фамилия</div>
                <div>Имя</div>
                <div>Должность</div>
            </div>
            {!!curCompany && curCompany.employees.map(el => <RowEmployee key={el.id} company={curCompany} employee={el} editCompany={editCompany} checkedEmployeeId={checkedEmployeeId} setCheckedEmployeeId={setCheckedEmployeeId}/>)}
            {load && 'Loading...'}
        </div>
    );
};