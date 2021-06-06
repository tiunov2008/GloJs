'use strict'

let arr = ['435','745','523','843','903','234','241'];
for(let i = 0; i < arr.length; i++){
    if(arr[i].charAt(0) == '2' || arr[i].charAt(0) == '4') {
        console.log(arr[i]);
    }
}
label:
for(let i = 0; i < 100; i++){
    for (let j = 2; j < i; j++) {
        if (i % j == 0) continue label;
    }
    console.log(i + '   Делители этого числа: 1 и ' + i);
}
