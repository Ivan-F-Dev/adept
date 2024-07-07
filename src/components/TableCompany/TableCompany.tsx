import * as React from 'react';
import {CompanyType} from "../../store/TableReducer";
import {RowCompany} from "./RowCompany/RowCompany";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";
import './TableCompany.css'

type Props = {
    companies: CompanyType[]
    load: boolean
    checkedRowId: number
    setCheckedRowId: (id: number) => void
    editCompany: (company: CompanyType) => void
    deleteCompany: (id: number) => void
    setFetch: (bool: boolean) => void
};
export const TableCompany = ({companies,load,checkedRowId,setCheckedRowId,editCompany,deleteCompany,setFetch}: Props) => {

    const [ref,inView] = useInView()

    useEffect(() => {
        if (inView && companies.length > 0) {
            setFetch(true)
        }
    },[inView])

    return (
        <div className={'TableCompany'}>
            <div className={'TableCompany__head'}>
                <div><input type="checkbox" checked={checkedRowId === -1} onChange={() => {setCheckedRowId(checkedRowId === -1 ? -2 : -1)}}/> Выделить все</div>
                <div>Название</div>
                <div>Кол-во сотрудников</div>
                <div>Адрес</div>
            </div>
            {!!companies.length && companies.map(el => <RowCompany key={el.id} company={el} checkedRowId={checkedRowId} setCheckedRow={setCheckedRowId} editCompany={editCompany} deleteCompany={deleteCompany}/>)}
            <div id='trigger' ref={ref}>trigger</div>
            {load && 'Loading...'}

        </div>
    );
};