(() => {
  const contentEl = document.querySelector("#benchmark");

  contentEl.innerHTML = "<h3>Results</h3>";

  let iterations = 1000;
  const search = window.location.search;
  if (search) {
    const newIters = search.split(/\?iterations\=/)[1];
    iterations = newIters ? parseInt(newIters) : iterations;
  }

  const NS_PER_SEC = 1e9;
  const NUMS = [...Array(parseInt(iterations)).keys()];

  // Run benchmark against function.
  const localBench = (fib) => {
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
      const benchWasm = mod.exports.benchmark;
      const fibJs = window.fibonacci;
      const benchJs = mod.exports.benchmark;

      contentEl.innerHTML += `<ul><li><strong>Iterations</strong>: ${NUMS.length}</li></ul>`;

      [
        ["WASM", fibWasm, benchWasm],
        ["  JS", fibJs, benchJs],
        ["WASM", fibWasm, benchWasm],
        ["  JS", fibJs, benchJs]
      ].forEach(group => {
        const [tag, fn, extBench] = group;

        const extTime = new Date();
        const extLast = extBench(iterations);
        const extDiff = (new Date()) - extTime;

        const { diff, last } = localBench(fn);

        contentEl.innerHTML += [
          `<ul>`,
          `  <li><strong>${tag}</strong></li>`,
          `  <ul>`,
          `    <li>External: ${extDiff} ms (<em>last</em>: ${extLast})</li>`,
          `    <li>Local: ${diff} ms (<em>last</em>: ${last})</li>`,
          `  </ul>`,
          `</ul>`
        ].join("\n");
      });
    })
    .catch(err => {
      console.error(err);
    });
})();
