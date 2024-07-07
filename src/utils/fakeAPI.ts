import {CompanyType} from "../store/TableReducer";

export const fakeAPI = {
    nameList: ['Илья','Иван','Алексей','Антон','Роман','Александр','Матвей','Павел','Сергей','Магамед'],
    surnameList: ['Кузнецов','Петров','Сидоров','Смирнов','Пушкин','Ленин','Орлов','Дзидзария','Галеев','Демидов'],
    addressList: ['Москва','Саратов','Новосибирск','Челябинск','Тюмень','Сургут','Курган','Казань','Киев','Минск'],
    companyTitleList: ['МТС','Мегафон','Билайн','РосАтом','Алабуга','Интерсвязь','Газпром','Адепт','БиномТех','Солитон'],
    jobList: ['Сварщик','Фрезеровщик','Паяльщик','HR','Менеджер','Разработчик','Начальник цеха','Повар','Дворник','Грузчик'],
    getRandom() {
        return Math.floor(Math.random()*10)
    },
    getCompany(id: number) {
        return {
            id: id,
            name: this.companyTitleList[this.getRandom()],
            address: this.addressList[this.getRandom()],
            employees: this.getEmployees(this.getRandom(),id)
        }
    },
    getEmployee(id: string) {
        return {
            id: id,
            name: this.nameList[this.getRandom()],
            surname: this.surnameList[this.getRandom()],
            job: this.jobList[this.getRandom()]
        }
    },
    getCompanies(count: number, acc: number): CompanyType[] {
        return new Array(count).fill(null).map((el,i) => {
            return this.getCompany(acc + i)
        })
    },
    getEmployees(count: number,parentId: number) {
        return new Array(count).fill(null).map((el,i) => {
            return this.getEmployee(parentId + '_' + i)
        })
    },
    fetch(count:number, acc: number, delay: number = 1000): Promise<CompanyType[]> {
        return new Promise((res,rej) => {
            setTimeout( () => {
                res(this.getCompanies(count,acc))
            }, delay)
        })
    }
}