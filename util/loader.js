"use strict";

const NS_PER_SEC = 1e9;
const NUMS = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10
]

require("webassembly")
  .load("dist/fib.wasm")
  .then(mod => {
    const time = process.hrtime();
    const fib = mod.exports.fibonacci;

    NUMS.forEach((num) => {
      console.log(`fib(${num}) = ${fib(num)}`);
    });

    const diff = process.hrtime(time);
    console.log(`Elapsed: ${diff[0] * NS_PER_SEC + diff[1]} ns (${diff[0]} secs)`);
  });