'use strict'

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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

const AppData = function () {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.period = 3;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
}
AppData.prototype.check = function(){
    if (salaryAmount.value !== '') {
        start.removeAttribute('disabled')
    }
};

AppData.prototype.start = function(){
    if(salaryAmount.value.trim() !== ''){
        this.budget = salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.getStatusIncome();
        this.showResult();
        this.disableInputs();
    }
};
AppData.prototype.showResult = function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
};    
AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        expensesPlus.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function(){
    const _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '')
            _this.expenses[itemExpenses] = cashExpenses;
    })
};
AppData.prototype.addIncomeBlock = function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.getIncome = function(){
    const _this = this;
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '')
            _this.income[itemIncome] = cashIncome;
    })

    for(let key in _this.income){
        _this.incomeMonth += +_this.income[key];
    }
};
AppData.prototype.getAddExpenses = function(){
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if(item !== ''){
            _this.addExpenses.push(item);
        }
    })
};
AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    })
}; 
AppData.prototype.getExpensesMonth = function(){
    for(let key in this.expenses){
        this.expensesMonth += +this.expenses[key];
    }
};
AppData.prototype.getBudget = function(){
    this.budgetMonth = +this.budget + this.incomeMonth - +this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
}; 
AppData.prototype.getTargetMonth = function(){
    return +targetAmount.value / +this.budgetMonth;
};
AppData.prototype.getStatusIncome = function(){
    if (this.budgetDay>=1200) {
        console.log('У вас высокий уровень дохода');
    } else if(this.budgetDay<1200 && this.budgetDay>=600){
        console.log('У вас средний уровень дохода');
    } else if(this.budgetDay<600 && this.budgetDay>=0){
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else{
        console.log('Что то пошло не так');
    }
};
AppData.prototype.calcSavedMoney = function(){
    return this.budgetMonth * periodSelect.value;
}; 

AppData.prototype.reset = function(){
    depositCheck.checked = false;
    targetAmount.removeAttribute('disabled', 'true');
    salaryAmount.removeAttribute('disabled', 'true');
    incomeTitle.removeAttribute('disabled', 'true');
    incomeAmount.removeAttribute('disabled', 'true');
    expensesTitle.removeAttribute('disabled', 'true');
    expensesItems.forEach(function(item){
        item.querySelector('.expenses-title').removeAttribute('disabled', 'true');
        item.querySelector('.expenses-amount').removeAttribute('disabled', 'true');
    })
    incomeItems.forEach(function(item){
        item.querySelector('.income-title').removeAttribute('disabled', 'true');
        item.querySelector('.income-amount').removeAttribute('disabled', 'true');
    })
    additionalExpensesItem.removeAttribute('disabled', 'true');
    additionalIncomeItem[0].removeAttribute('disabled', 'true');
    additionalIncomeItem[1].removeAttribute('disabled', 'true');
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    start.innerHTML = 'Рассчитать';
    let inputs = document.querySelectorAll('input');
    let i = 0;
    inputs.forEach(function() {
        if(inputs[i] !== periodSelect){
            inputs[i].value = '';
        }
        i++;
    });
    periodSelect.value = 1;
    document.querySelector('.period-amount').innerHTML = 1;
    start.style.display = 'block';
    cancel.style.display = 'none';
    start.removeEventListener('click', appData.reset.bind(appData));
    start.addEventListener('click', appData.start.bind(appData));
}; 
AppData.prototype.disableInputs = function(){
    targetAmount.setAttribute('disabled', 'true');
    salaryAmount.setAttribute('disabled', 'true');
    incomeTitle.setAttribute('disabled', 'true');
    incomeAmount.setAttribute('disabled', 'true');
    expensesTitle.setAttribute('disabled', 'true');
    expensesItems.forEach(function(item){
        item.querySelector('.expenses-title').setAttribute('disabled', 'true');
        item.querySelector('.expenses-amount').setAttribute('disabled', 'true');
    })
    incomeItems.forEach(function(item){
        item.querySelector('.income-title').setAttribute('disabled', 'true');
        item.querySelector('.income-amount').setAttribute('disabled', 'true');
    })
    additionalExpensesItem.setAttribute('disabled', 'true');
    salaryAmount.setAttribute('disabled', 'true');
    additionalIncomeItem[0].setAttribute('disabled', 'true');
    additionalIncomeItem[1].setAttribute('disabled', 'true');
    expensesPlus.removeEventListener('click', this.addExpensesBlock);
    incomePlus.removeEventListener('click', this.addIncomeBlock);
    cancel.style.display = 'block';
    start.style.display = 'none';
    start.removeEventListener('click', this.start);
    cancel.addEventListener('click', this.reset);
}; 
AppData.prototype.eventListeners = function(){
    console.log(this);
    start.addEventListener('click', this.start.bind(appData));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    salaryAmount.addEventListener('click', this.check);
    cancel.addEventListener('click', this.reset.bind(this));
    for(let i = 0; i< this.addExpenses.length; i++){
        this.addExpenses[i] = ' ' + uCaseFirst(this.addExpenses[i]);
    }
    let this_ = this;
    periodSelect.oninput = function() {
        document.querySelector('.period-amount').innerHTML = periodSelect.value;
        incomePeriodValue.value = this_.calcSavedMoney();
    };
}; 
const appData = new AppData();

appData.eventListeners();
