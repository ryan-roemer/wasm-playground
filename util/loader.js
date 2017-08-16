"use strict";

const fs = require("fs");
const pify = require("pify");
const readFile = pify(fs.readFile);

module.exports = (filename) => readFile(filename)
  .then(buffer => new Uint32Array(buffer.buffer, buffer.byteOffset))
  .then(buffer => WebAssembly.compile(buffer))
  .then(module => new WebAssembly.Instance(module, {
    env: {
      memoryBase: 0,
      tableBase: 0,
      memory: new WebAssembly.Memory({
        initial: 256
      }),
      table: new WebAssembly.Table({
        initial: 0,
        element: "anyfunc"
      })
    }
  }));