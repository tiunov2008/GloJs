'use strict'
//document.addEventListener("DOMContentLoaded", function () {
    const AppData = function () {
        this.selector = '.class';
        this.height = 100;
        this.width = 100;
        this.bg = '#000fff';
        this.fontSize = 100;
    }
    
    AppData.prototype.createElem = function(){
        if(this.selector[0] === '.'){
            let div = document.createElement('div');
            div.className = this.selector.substr(1).trim();
            div.innerHTML = 'div';
            document.body.append(div);
        }else if(this.selector[0] === '#'){
            let p = document.createElement('p');
            p.id = this.selector.substr(1).trim();
            p.innerHTML = 'p';
            document.body.append(p);
        }
    };

    AppData.prototype.addStyles = function(){
        let elem = document.querySelector(this.selector);
        elem.style.height = this.height + 'px';
        elem.style.width = this.width + 'px';
        elem.style.background = this.bg;
        elem.style.fontSize = this.fontSize + 'px';
        elem.style.position = 'absolute';
    };
    AppData.prototype.keydown = function(){
        let elem = document.querySelector(this.selector);
        let Y = 0;
        let X = 0;
        document.addEventListener('keydown', function(event) {
            if (event.code == 'ArrowUp') {
                Y -= 10;
                elem.style.top = Y + 'px';
                console.log(Y);
            }
            if (event.code == 'ArrowDown') {
                Y += 10;
                elem.style.top = Y + 'px';
                console.log(Y);
            }
            if (event.code == 'ArrowLeft') {
                X -= 10;
                elem.style.left = X + 'px';
                console.log(X);
            }
            if (event.code == 'ArrowRight') {
                X += 10;
                elem.style.left = X + 'px';
                console.log(X);
            }
        });
    };

    let appData = new AppData();
    appData.createElem();
    appData.addStyles();
    appData.keydown();
//});
