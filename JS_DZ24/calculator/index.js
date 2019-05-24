let add = require('./add.js');
let sub = require('./sub.js');
let div = require('./div.js');
let mult = require('./mult.js');

module.exports.add = add.getResultAddition;

module.exports.sub = sub.getResultSubtraction;

module.exports.div = div.getResultDivision;

module.exports.mult = mult.getMultiplicationResult;