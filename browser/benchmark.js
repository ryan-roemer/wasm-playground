(() => {
  const contentEl = document.querySelector("#benchmark");

  contentEl.innerHTML = "<h3>Results</h3>";

  const iterations = 1000;
  const NS_PER_SEC = 1e9;
  const NUMS = [...Array(parseInt(iterations)).keys()];

  // Run benchmark against function.
  const benchmark = (tag, fib) => {
    const time = new Date();

    let last;
    NUMS.forEach((num) => {
      last = fib(num); // make sure result isn't thrown away.
    });

    const diff = (new Date()) - time;
    return { diff, last };
  };

  webassembly
    .load("../dist/fib.wasm")
    .then(mod => {
      const fibWasm = mod.exports.fibonacci;
      const fibJs = window.fibonacci;

      contentEl.innerHTML += `<ul><strong>Iterations</strong>: ${NUMS.length}</ul>`;

      console.log("\n\nBenchmarks:");
      [
        ["WASM", fibWasm],
        ["  JS", fibJs],
        ["WASM", fibWasm],
        ["  JS", fibJs]
      ].forEach(pair => {
        const [tag, fn] = pair;
        const { diff, last } = benchmark(tag, fn);
        contentEl.innerHTML += `<ul><strong>${tag}</strong>: ${diff} ms</ul>`;
        contentEl.innerHTML += `<ul><em>last</em>: ${last}</ul>`;
      });
    })
    .catch(err => {
      console.error(err);
    });
})();
