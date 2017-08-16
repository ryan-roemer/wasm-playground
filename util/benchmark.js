"use strict";
/**
 * ```sh
 * $ yarn run benchmark -- 10000
 * ```
 */

const fibJs = require("../src/fib").fibonacci;

const iterations = process.argv[2] || 1000;
const NS_PER_SEC = 1e9;
const NUMS = [...Array(parseInt(iterations)).keys()];

// Run benchmark against function.
const benchmark = (tag, fib) => {
  const time = process.hrtime();

  let last;
  NUMS.forEach((num) => {
    last = fib(num); // make sure result isn't thrown away.
  });

  const diff = process.hrtime(time);
  return { diff, last };
};

require("webassembly")
  .load("dist/fib.wasm")
  .then(mod => {
    const fibWasm = mod.exports.fibonacci;

    console.log("Setup:");
    console.log(`* Iterations: ${NUMS.length}`);

    console.log("\n\nBenchmarks:");
    [
      ["WASM", fibWasm],
      ["  JS", fibJs],
      ["WASM", fibWasm],
      ["  JS", fibJs]
    ].forEach(pair => {
      const [tag, fn] = pair;
      const { diff, last } = benchmark(tag, fn);
      console.log(` * ${tag}: ${diff[0] * NS_PER_SEC + diff[1]} ns (${diff[0]} secs)`);
      console.log(`         last: ${last}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
