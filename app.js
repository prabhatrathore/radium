const obj =  require('./logger');
const format = require('./formatter');
const names = require('./util/helper');
const _= require('lodash');
const obj2 = require("lodash")

obj.getlog();
obj.getdate();
obj.getmonth();
obj.getname() ;
obj.getbatchinfo();
console.log('url is '+obj.geturl);
format.gettrimString();
format.getchangetoLowerCase();
format.getchangeToUpperCase();
names.getsname();
const month2 = ["january","feb","mar","april","may","june","july","august","sept","oct","nov","dec"]

console.log(_.chunk(month2,4 ))

console.log(obj2.fromPairs([["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy”:Pans Labyrinth"]]))

const array2 = [1,2,5,6,4,9,44,55,25,36] 
console.log(obj2.tail(array2))

console.log(obj2.union([1,3,5,6],[5,6,9,8],[5,8,94,2]))



