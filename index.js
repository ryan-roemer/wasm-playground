"use strict";

const load = require('./util/loader');

load("dist/fib.wasm")
  .then((instance) => {
    console.log(instance);
  })
  .catch((err) => console.error(err))