"use strict";

const fibJs = require("../src/fib").fibonacci;

const NS_PER_SEC = 1e9;
const NUMS = [...Array(200).keys()];

// Run benchmark against function.
const benchmark = (fib) => {
  const time = process.hrtime();

  NUMS.forEach((num) => {
    console.log(`fib(${num}) = ${fib(num)}`);
  });

  const diff = process.hrtime(time);
  console.log(`Elapsed: ${diff[0] * NS_PER_SEC + diff[1]} ns (${diff[0]} secs)`);

  return diff;
};

require("webassembly")
  .load("dist/fib.wasm")
  .then(mod => {
    const fibWasm = mod.exports.fibonacci;

    console.log("Benchmark: WASM");
    const diffWasm = benchmark(fibWasm);

    console.log("\n\n\nBenchmark: JS");
    const diffJs = benchmark(fibJs);

    console.log("\n\nFinal results:");
    console.log(` * WASM: ${diffWasm[0] * NS_PER_SEC + diffWasm[1]} ns`);
    console.log(` * JS:   ${diffJs[0] * NS_PER_SEC + diffJs[1]} ns`);
  });