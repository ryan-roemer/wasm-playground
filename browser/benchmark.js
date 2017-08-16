(() => {
  const contentEl = document.querySelector("#benchmark");

  contentEl.innerHTML = "<h3>Results</h3>";

  const iterations = 2000;
  const NS_PER_SEC = 1e9;
  const NUMS = [...Array(parseInt(iterations)).keys()];

  fetch("../dist/fib.wasm")
    .then(mod => {
      console.log("TODO HERE", mod);
    })
    .catch(err => {
      console.error(err);
    });
})();
