const moment = require('moment');

var date = moment();
date.add(100,'year').subtract(99,'year').subtract(3,'month');

console.log(date.format('Do-MMM-YYYY'));


date = moment();

console.log(date.format('h:mm a'));

var before = date.add(1,'minute');

console.log(before.fromNow());
