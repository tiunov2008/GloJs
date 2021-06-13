'use strict'

const AppData = function () {
    this.selector = '#class';
    this.height = 100;
    this.width = 1000;
    this.bg = '#000fff';
    this.fontSize = 100;
}
AppData.prototype.createElem = function(){
    if(this.selector[0] === '.'){
        let div = document.createElement('div');
        div.className = this.selector.substr(1).trim();
        div.innerHTML = 'Я div';
        document.body.append(div);
    }else if(this.selector[0] === '#'){
        let p = document.createElement('p');
        p.id = this.selector.substr(1).trim();
        p.innerHTML = 'Я p';
        document.body.append(p);
    }
};

AppData.prototype.addStyles = function(){
    let elem = document.querySelector(this.selector);
    elem.style.height = this.height + 'px';
    elem.style.width = this.width + 'px';
    elem.style.background = this.bg;
    elem.style.fontSize = this.fontSize + 'px';
};
let appData = new AppData();

appData.createElem();
appData.addStyles();