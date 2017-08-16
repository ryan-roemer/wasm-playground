WebAssembly Fun
===============

Simple playground using the [`webassembly`](https://github.com/dcodeIO/webassembly) utility library.

## Build some WebAssembly!

```sh
$ yarn install
$ yarn run build      # builds src/fib.c -> dist/fib.wasm
```

## Benchmark in Node

```sh
$ yarn run benchmark
$ yarn run benchmark -- NUM_OF_ITERATIONS
```
## Benchmark in the browser

```sh
$ yarn run server
```

... and navigate to: http://localhost:8000/browser/ or
http://localhost:8000/browser/?iterations=NUM_OF_ITERATIONS
