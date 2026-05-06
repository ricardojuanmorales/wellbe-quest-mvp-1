(function () {
  const { assert } = window.WellbeUnit;
  const { logic } = window.WellbeLogicFixture;

  (function suiteEscapeHtml() {
    const suite = "escapeHtml";
    assert(`${suite} — escapa <script>`, logic.escapeHtml("<script>") === "&lt;script&gt;");
    assert(`${suite} — escapa comillas dobles`, logic.escapeHtml('"hola"') === "&quot;hola&quot;");
    assert(`${suite} — escapa ampersand`, logic.escapeHtml("a&b") === "a&amp;b");
    assert(`${suite} — escapa comilla simple`, logic.escapeHtml("it's") === "it&#039;s");
    assert(`${suite} — null devuelve cadena vacía`, logic.escapeHtml(null) === "");
    assert(`${suite} — undefined devuelve cadena vacía`, logic.escapeHtml(undefined) === "");
    assert(`${suite} — número se convierte a string`, logic.escapeHtml(42) === "42");
    assert(`${suite} — texto sin caracteres especiales sin cambios`, logic.escapeHtml("Buen vivir") === "Buen vivir");
  })();
})();
