(function () {
  const results = [];

  function assert(description, condition, detail = "") {
    results.push({ description, pass: !!condition, detail: condition ? "" : detail });
  }

  function assertEqual(description, actual, expected) {
    const pass = JSON.stringify(actual) === JSON.stringify(expected);
    results.push({
      description,
      pass,
      detail: pass ? "" : `esperado: ${JSON.stringify(expected)}, obtenido: ${JSON.stringify(actual)}`
    });
  }

  function renderResults({ output, summary }) {
    const suiteGroups = {};
    results.forEach(result => {
      const [suite] = result.description.split(" — ");
      if (!suiteGroups[suite]) suiteGroups[suite] = [];
      suiteGroups[suite].push(result);
    });

    Object.entries(suiteGroups).forEach(([suite, tests]) => {
      const div = document.createElement("div");
      div.className = "suite";
      div.innerHTML = `<h2>${suite}</h2>` + tests.map(test => `
        <div class="test ${test.pass ? "pass" : "fail"}">
          <span class="icon">${test.pass ? "✓" : "✗"}</span>
          <div>
            <span>${test.description.split(" — ")[1]}</span>
            ${test.detail ? `<div class="detail">${test.detail}</div>` : ""}
          </div>
        </div>`).join("");
      output.appendChild(div);
    });

    const total = results.length;
    const passed = results.filter(result => result.pass).length;
    const failed = total - passed;
    summary.className = failed === 0 ? "all-pass" : "has-fail";
    summary.textContent = failed === 0
      ? `✓ ${total}/${total} tests pasaron`
      : `✗ ${failed} de ${total} tests fallaron`;
  }

  window.WellbeUnit = { assert, assertEqual, renderResults, results };
})();
