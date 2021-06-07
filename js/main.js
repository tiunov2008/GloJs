'use strict'

let start = document.getElementById('start');
let buttonPlus1 = document.getElementsByTagName('button')[0];
let buttonPlus2 = document.getElementsByTagName('button')[1];
let depositCheckmark = document.querySelector('.deposit-checkmark');
let salary = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('input.income-title');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('input.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

console.log(periodSelect);
console.log(targetAmount);
console.log(depositPercent);
console.log(depositAmount);
console.log(expensesAmount);
console.log(incomeAmount);
console.log(incomeTitle);
console.log(depositCheckmark);
console.log(additionalExpensesItem);
console.log(expensesTitle);
console.log(salary);



console.log(start);
console.log(buttonPlus1);
console.log(buttonPlus2);
console.log(depositCheckmark);
console.log(additionalIncomeItem);
let rightInputs = [];
let right = ['budget_month','budget_day','expenses_month','additional_income','additional_expenses',
'income_period','target_month'];
for(let i = 0;i !== right.length;i++){
    rightInputs[i] = document.getElementsByClassName(right[i] + '-value');
}
console.log(rightInputs);
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
let money
let reQuestionNum = function(varible,str,substr){
    do{
        varible = prompt(str,substr);
    }
    while(!isNumber(varible));
}
let reQuestionStr = function(varible,str,substr){
    do{
        varible = prompt(str,substr);
    }
    while(isString(varible));
}
reQuestionNum(money,'Ваш месячный доход?', 10000)
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
            reQuestionStr(itemIncome,'Какой у вас дополнительный заработок?','Таксую')
            let cashIncome;
            reQuestionNum(cashIncome,'Сколько в месяц вы на этом зарабатываете?', 10000)
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
            appData.percentDeposit;
            reQuestionNum(percentDeposit,'Какой у вас годовой процент?', 10)
            appData.moneyDeposit;
            reQuestionNum(moneyDeposit,'Какая сумма заложена?', 10000)
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }, 
}
appData.asking();
appData.getBudget();
appData.getExpensesMonth();

console.log('Расходы за месяц: ' + appData.expensesMonth);

console.log(appData.getTargetMonth());
for(let i = 0; i< appData.addExpenses.length; i++){
    appData.addExpenses[i] = ' ' + uCaseFirst(appData.addExpenses[i]);
}
console.log(appData.addExpenses.toString().trimStart())
appData.getStatusIncome();
console.log("Наша программа включает в себя данные:");
for(let key in appData){
    console.log(key + ":  " + appData[key]);
}
