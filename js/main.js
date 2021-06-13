'use strict'
let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item');
let rightInputs = [];
let right = ['budget_month','budget_day','expenses_month','additional_income','additional_expenses',
'income_period','target_month'];
for(let i = 0;i !== right.length;i++){
    rightInputs[i] = document.getElementsByClassName(right[i] + '-value')[0];
}
let budgetMonthValue = rightInputs[0];
let budgetDayValue = rightInputs[1];
let expensesMonthValue = rightInputs[2];
let additionalIncomeValue = rightInputs[3];
let additionalExpensesValue = rightInputs[4];
let incomePeriodValue = rightInputs[5];
let targetMonthValue = rightInputs[6];
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
let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 3,
    expensesMonth: 0,
    incomeMonth: 0,
    start: function(){
        appData.start.bind(appData);
        console.log(this);

        this.budget = salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();

        this.getStatusIncome();
    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
    },    
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '')
                appData.expenses[itemExpenses] = cashExpenses;
        })
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '')
                appData.income[itemIncome] = cashIncome;
        })

        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        })
    }, 
    getExpensesMonth: function(){
        for(let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function(){
        appData.budgetMonth = +appData.budget + appData.incomeMonth - +appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    }, 
    getTargetMonth: function(){
        return +targetAmount.value / +appData.budgetMonth;
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
    calcSavedMoney: function(){
        return this.budgetMonth * periodSelect.value;
    }, 
    reset: function(){
        targetAmount.removeAttribute('readonly', '');
        salaryAmount.removeAttribute('readonly', '');
        incomeTitle.removeAttribute('readonly', '');
        incomeAmount.removeAttribute('readonly', '');
        expensesTitle.removeAttribute('readonly', '');
        expensesItems.forEach(function(item){
            item.querySelector('.expenses-title').removeAttribute('readonly', '');
            item.querySelector('.expenses-amount').removeAttribute('readonly', '');
        })
        incomeItems.forEach(function(item){
            item.querySelector('.income-title').removeAttribute('readonly', '');
            item.querySelector('.income-amount').removeAttribute('readonly', '');
        })
        additionalExpensesItem.removeAttribute('readonly', '');
        salaryAmount.removeAttribute('readonly', '');
        additionalIncomeItem[0].removeAttribute('readonly', '');
        additionalIncomeItem[1].removeAttribute('readonly', '');
        expensesPlus.addEventListener('click', appData.addExpensesBlock);
        incomePlus.addEventListener('click', appData.addIncomeBlock);
        start.innerHTML = 'Рассчитать';
        let inputs = document.querySelectorAll('input');
        let i = 0;
        inputs.forEach(function() {
            if(inputs[i] !== periodSelect){
                inputs[i].value = '';
            }
            i++;
        });
        periodSelect.setAttribute('step', '1');
        start.removeEventListener('click', appData.reset);
        start.addEventListener('click', startP);
    }, 
}
let startP = function(){
    if(salaryAmount.value.trim() !== ''){
        appData.start();
        targetAmount.setAttribute('readonly', '');
        salaryAmount.setAttribute('readonly', '');
        incomeTitle.setAttribute('readonly', '');
        incomeAmount.setAttribute('readonly', '');
        expensesTitle.setAttribute('readonly', '');
        expensesItems.forEach(function(item){
            item.querySelector('.expenses-title').setAttribute('readonly', '');
            item.querySelector('.expenses-amount').setAttribute('readonly', '');
        })
        incomeItems.forEach(function(item){
            item.querySelector('.income-title').setAttribute('readonly', '');
            item.querySelector('.income-amount').setAttribute('readonly', '');
        })
        additionalExpensesItem.setAttribute('readonly', '');
        salaryAmount.setAttribute('readonly', '');
        additionalIncomeItem[0].setAttribute('readonly', '');
        additionalIncomeItem[1].setAttribute('readonly', '');
        expensesPlus.removeEventListener('click', appData.addExpensesBlock);
        incomePlus.removeEventListener('click', appData.addIncomeBlock);
        start.innerHTML = 'Сбросить';
        start.removeEventListener('click', startP);
        start.addEventListener('click', appData.reset);
    }
}
start.addEventListener('click', startP);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
for(let i = 0; i< appData.addExpenses.length; i++){
    appData.addExpenses[i] = ' ' + uCaseFirst(appData.addExpenses[i]);
}

periodSelect.oninput = function() {
    document.querySelector('.period-amount').innerHTML = periodSelect.value;
    incomePeriodValue.value = appData.calcSavedMoney();
};