'use strict'
let betterString = function(str){
    if(/[0-9]/.test(str)){ 
        alert("Это не строка!");
    }else{
        str = str.trim()
        if(str.length > 30) {
            console.log(str.substr(0, 30) + '...');
        }else{
            console.log(str);
        }
    }
}
betterString(prompt('Введите строку?', '                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic neque unde voluptates, reprehenderit perferendis molestiae veniam excepturi perspiciatis, odio harum explicabo vel sequi aspernatur laborum asperiores tenetur corrupti natus accusamus?'))
