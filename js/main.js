'use strict'

const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.getElementsByClassName('expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositBank = document.querySelector('.deposit-bank'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.getElementsByClassName('income-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item');
const rightInputs = [];
const right = ['budget_month','budget_day','expenses_month','additional_income','additional_expenses',
'income_period','target_month'];
for(let i = 0;i !== right.length;i++){
    rightInputs[i] = document.getElementsByClassName(right[i] + '-value')[0];
}
const budgetMonthValue = rightInputs[0];
const budgetDayValue = rightInputs[1];
const expensesMonthValue = rightInputs[2];
const additionalIncomeValue = rightInputs[3];
const additionalExpensesValue = rightInputs[4];
const incomePeriodValue = rightInputs[5];
const targetMonthValue = rightInputs[6];
function uCaseFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
}

class AppData{
    constructor(){
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
    check(){
        if (salaryAmount.value !== '') {
            start.removeAttribute('disabled')
        }
    };
    start(){
        if(salaryAmount.value.trim() !== ''){
            this.budget = salaryAmount.value;
    
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getInfoDeposit();
            this.getBudget();
            this.getStatusIncome();
            this.showResult();
            this.disableInputs();
        }
    };
    showResult(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
    };    
    addExpensesBlock(){
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    };
    getExpenses(){
        const _this = this;
        console.log(expensesItems[0]);
        Array.from(expensesItems[0]).forEach(function(item){
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '')
                _this.expenses[itemExpenses] = cashExpenses;
        })
    };
    addIncomeBlock(){
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    };
    getIncome(){
        const _this = this;
        Array.from(incomeItems[0]).forEach(function(item){
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '')
                _this.income[itemIncome] = cashIncome;
        })
    
        for(let key in _this.income){
            _this.incomeMonth += +_this.income[key];
        }
    };
    getAddExpenses(){
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                _this.addExpenses.push(item);
            }
        })
    };
    getAddIncome(){
        const _this = this;
        additionalIncomeItem.forEach(function(item){
            const itemValue = item.value.trim();
            if(itemValue !== ''){
                _this.addIncome.push(itemValue);
            }
        })
    }; 
    getExpensesMonth(){
        for(const key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    };
    getBudget(){

        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100)
        this.budgetMonth = +this.budget + this.incomeMonth - +this.expensesMonth + monthDeposit;
        this.budgetDay = this.budgetMonth / 30;
    }; 
    getTargetMonth(){
        return +targetAmount.value / +this.budgetMonth;
    };
    getStatusIncome(){
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
    calcSavedMoney(){
        return this.budgetMonth * periodSelect.value;
    }; 
    reset(){
        depositCheck.checked = false;
        targetAmount.removeAttribute('disabled', 'true');
        salaryAmount.removeAttribute('disabled', 'true');
        incomeTitle.removeAttribute('disabled', 'true');
        incomeAmount.removeAttribute('disabled', 'true');
        expensesTitle.removeAttribute('disabled', 'true');
        Array.from(expensesItems[0]).forEach(function(item){
            item.querySelector('.expenses-title').removeAttribute('disabled', 'true');
            item.querySelector('.expenses-amount').removeAttribute('disabled', 'true');
        })
        Array.from(incomeItems[0]).forEach(function(item){
            item.querySelector('.income-title').removeAttribute('disabled', 'true');
            item.querySelector('.income-amount').removeAttribute('disabled', 'true');
        })
        additionalExpensesItem.removeAttribute('disabled', 'true');
        additionalIncomeItem[0].removeAttribute('disabled', 'true');
        additionalIncomeItem[1].removeAttribute('disabled', 'true');
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        start.innerHTML = 'Рассчитать';
        const inputs = document.querySelectorAll('input');
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
    disableInputs(){
        targetAmount.setAttribute('disabled', 'true');
        salaryAmount.setAttribute('disabled', 'true');
        incomeTitle.setAttribute('disabled', 'true');
        incomeAmount.setAttribute('disabled', 'true');
        expensesTitle.setAttribute('disabled', 'true');
        Array.from(expensesItems[0]).forEach(function(item){
            item.querySelector('.expenses-title').setAttribute('disabled', 'true');
            item.querySelector('.expenses-amount').setAttribute('disabled', 'true');
        })
        Array.from(incomeItems[0]).forEach(function(item){
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
    getInfoDeposit(){
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }; 
    changePercent(){
        const valueSelect = this.value;
        if (valueSelect === "other") {
            depositPercent.style.display = "inline-block";
            console.log(depositPercent.value);
            document.addEventListener('change', function () {
                console.log(1);
                if(depositPercent.value < 0){
                    depositPercent.value = 0;
                }else if(depositPercent.value > 100){
                    depositPercent.value = 100;
                }else if(!depositPercent.value === ''){
                    depositPercent.value = depositPercent.value;
                }
                //depositPercent.value = depositPercent.value;
            });
        }else{
            depositPercent.value = valueSelect;
        }
    }; 
    depositHandler(){
        if (depositCheck.checked) {
            depositBank.style.display = "inline-block";
            depositAmount.style.display = "inline-block";
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        }else{
            depositBank.style.display = "none";
            depositAmount.style.display = "none";
            depositPercent.style.display = "none";
            depositBank.value = "";
            depositAmount.value = "";
            depositPercent.value = "";
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }; 
    eventListeners(){
        start.addEventListener('click', this.start.bind(appData));
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        salaryAmount.addEventListener('click', this.check);
        cancel.addEventListener('click', this.reset.bind(this));
        for(let i = 0; i< this.addExpenses.length; i++){
            this.addExpenses[i] = ' ' + uCaseFirst(this.addExpenses[i]);
        }
        const this_ = this;
        periodSelect.oninput = function() {
            document.querySelector('.period-amount').innerHTML = periodSelect.value;
            incomePeriodValue.value = this_.calcSavedMoney();
        };
        const salaryAmountClone = salaryAmount.value;
        salaryAmount.oninput = function() {
            if(isNaN(parseFloat(salaryAmount.value)) && isFinite(salaryAmount.value)){
                salaryAmount.value = salaryAmountClone;
            }
        };

        depositCheck.addEventListener('change',this.depositHandler.bind(this));
    }; 
}

const appData = new AppData();

appData.eventListeners();
