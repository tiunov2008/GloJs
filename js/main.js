'use strict'

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
}
function uCaseFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
}
let isString = function(n){
    if(!isNaN(parseFloat(n)) && isFinite(n) || n == null){
        return true;
    }else if(n.trim() != '' && isNaN(n)){
        return false;
    }else{
        return true;
    }
}
let money;
do{
    money = prompt('Ваш месячный доход?', 10000);
}
while(!isNumber(money));
let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function(){
        if(confirm('Есть ли у вас дополнительный заработок?')){
            let itemIncome;
            do{
                itemIncome = prompt('Какой у вас дополнительный заработок?','Таксую');
            }
            while(isString(itemIncome));
            let cashIncome;
            do{
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?',10000);
            }
            while(!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }
        do{
            appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','Квартплата, проездной, кредит');
        }
        while(isString(appData.addExpenses));
        appData.addExpenses = appData.addExpenses.toString().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');//Есть ли депозит в банке
        let sum = [];
        let expensesList = [];
        for(let i = 0; i < 2; i++){
            do{
                expensesList[i] = prompt('Введите обязательную статью расходов?', 'Билеты на метро');
            }
            while(isString(expensesList[i]));
            do{
                sum[i] = prompt('Во сколько это обойдется?', 500);
            }
            while(!isNumber(sum[i]));
            appData.expenses[expensesList[i]] = +sum[i];
            
        }
    },
    getBudget: function(){
        appData.budgetMonth = money - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
        if(!(appData.budgetDay >= 0)){
            appData.budgetDay = 'Что то пошло не так';
        }
        if(!(appData.budgetMonth >= 0)){
            appData.budgetMonth = 'Что то пошло не так';
        }
    },    
    getExpensesMonth: function(){
        for(let key in appData.expenses){
            appData.expensesMonth += appData.expenses[key];
        }
        
        if(!(appData.expensesMonth >= 0)){
            appData.expensesMonth = 'Что то пошло не так';
        }
    },
    getTargetMonth: function(){
        if(Math.ceil(appData.mission / appData.budgetMonth) >= 0 && Math.ceil(appData.mission / appData.budgetMonth) != Infinity){
            return 'Осталось ' + Math.ceil(appData.mission / appData.budgetMonth) + ' месяца до достижения цели';
        }else{
            return "Цель не будет достигнута";
        }
    },
    getStatusIncome: function(){
        if (appData.budgetDay>=1200) {
            console.log('У вас высокий уровень дохода');
        } else if(appData.budgetDay<1200 && appData.budgetDay>=600){
            console.log('У вас средний уровень дохода');
        } else if(appData.budgetDay<600 && appData.budgetDay>=0){
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else{
            console.log('Что то пошло не так');
        }
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do{
                appData.percentDeposit = prompt('Какой у вас годовой процент?', 10);
            }
            while(!isNumber(appData.percentDeposit));
            do{
                appData.moneyDeposit = prompt('Какая сумма заложена?',10000);
            }
            while(!isNumber(appData.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }, 
}
appData.asking();
appData.getBudget();
appData.getExpensesMonth();
appData.getInfoDeposit();
console.log('Расходы за месяц: ' + appData.expensesMonth);

console.log(appData.getTargetMonth());
for(let i = 0; i< appData.addExpenses.length; i++){
    appData.addExpenses[i] = ' ' + uCaseFirst(appData.addExpenses[i]);
}
appData.addExpenses = appData.addExpenses.toString().trim();
console.log(appData.addExpenses.toString().trim());
appData.getStatusIncome();

console.log("Наша программа включает в себя данные:");
for(let key in appData){
    console.log(key + ":  " + appData[key]);
}
