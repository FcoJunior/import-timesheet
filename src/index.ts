import data from './data/timesheets.json';

function agruparPor(objetoArray: Array<ITimesheet>, propriedade: string) {
    return objetoArray.reduce(function (acc: any, obj: any) {
        let key = obj[propriedade];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}

interface ITimesheet {
    Project: string;
    Description: string;
    Start_date: string;
    Duration: string;
}

const timesheets = data as Array<ITimesheet>;

const agrupados = agruparPor(timesheets, 'Start_date');
console.table(agrupados);

for (const property in agrupados) {
    console.log('Importing date: ', property);
    
}
