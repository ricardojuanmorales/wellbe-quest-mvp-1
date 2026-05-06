(function () {
  const { assert, assertEqual } = window.WellbeUnit;
  const { logic } = window.WellbeLogicFixture;

  (function suiteDefaultProgress() {
    const suite = "createDefaultProgress";
    const progress = logic.createDefaultProgress();
    assertEqual(`${suite} — level inicial = 1`, progress.level, 1);
    assertEqual(`${suite} — points inicial = 0`, progress.points, 0);
    assertEqual(`${suite} — completedActivityIds vacío`, progress.completedActivityIds, []);
    assertEqual(`${suite} — earnedBadgeIds vacío`, progress.earnedBadgeIds, []);
    assert(`${suite} — updatedAt presente`, typeof progress.updatedAt === "string" && progress.updatedAt.length > 0);
    assertEqual(`${suite} — stats.completedActivities = 0`, progress.stats.completedActivities, 0);
  })();

  (function suiteUniqueKnownIds() {
    const suite = "uniqueKnownIds";
    const known = new Set(["a", "b", "c"]);
    assertEqual(`${suite} — filtra IDs desconocidos`, logic.uniqueKnownIds(["a", "x", "b"], known), ["a", "b"]);
    assertEqual(`${suite} — elimina duplicados`, logic.uniqueKnownIds(["a", "a", "b"], known), ["a", "b"]);
    assertEqual(`${suite} — null devuelve vacío`, logic.uniqueKnownIds(null, known), []);
    assertEqual(`${suite} — todos desconocidos devuelve vacío`, logic.uniqueKnownIds(["x", "y"], known), []);
  })();

  (function suiteCalculateLevel() {
    const suite = "calculateLevel";
    assertEqual(`${suite} — 0 pts -> nivel 1`, logic.calculateLevel(0), 1);
    assertEqual(`${suite} — 49 pts -> nivel 1`, logic.calculateLevel(49), 1);
    assertEqual(`${suite} — 50 pts -> nivel 2`, logic.calculateLevel(50), 2);
    assertEqual(`${suite} — 120 pts -> nivel 3`, logic.calculateLevel(120), 3);
    assertEqual(`${suite} — 220 pts -> nivel 4`, logic.calculateLevel(220), 4);
    assertEqual(`${suite} — 999 pts -> nivel 4`, logic.calculateLevel(999), 4);
  })();

  (function suiteCalculateRouteProgress() {
    const suite = "calculateRouteProgress";
    const empty = logic.calculateRouteProgress([]);
    assertEqual(`${suite} — sin actividades, completed=0`, empty["route-nutricion"].completed, 0);
    assertEqual(`${suite} — sin actividades, percent=0`, empty["route-nutricion"].percent, 0);
    assertEqual(`${suite} — ruta vacía no queda completa`, empty["route-vacia"].complete, false);

    const partial = logic.calculateRouteProgress(["act-1", "act-2"]);
    assertEqual(`${suite} — 2/3 completadas, percent=67`, partial["route-nutricion"].percent, 67);
    assertEqual(`${suite} — 2/3 completadas, complete=false`, partial["route-nutricion"].complete, false);

    const full = logic.calculateRouteProgress(["act-1", "act-2", "act-3"]);
    assertEqual(`${suite} — ruta completa, percent=100`, full["route-nutricion"].percent, 100);
    assertEqual(`${suite} — ruta completa, complete=true`, full["route-nutricion"].complete, true);
  })();

  (function suiteEvaluateBadges() {
    const suite = "evaluateBadges";
    assertEqual(`${suite} — sin actividades, sin badges`, logic.evaluateBadges([]), []);

    const one = logic.evaluateBadges(["act-1"]);
    assert(`${suite} — 1 actividad -> badge-primer-paso`, one.includes("badge-primer-paso"));
    assert(`${suite} — 1 actividad -> NO badge-primera-ruta`, !one.includes("badge-primera-ruta"));

    const routeDone = logic.evaluateBadges(["act-1", "act-2", "act-3"]);
    assert(`${suite} — ruta completa -> badge-primera-ruta`, routeDone.includes("badge-primera-ruta"));

    const sixDone = logic.evaluateBadges(["act-1", "act-2", "act-3", "act-4", "act-5", "act-6"]);
    assert(`${suite} — 6 actividades -> badge-mitad-camino`, sixDone.includes("badge-mitad-camino"));

    const community = logic.evaluateBadges(["act-7"]);
    assert(`${suite} — actividad comunidad -> badge-comunidad`, community.includes("badge-comunidad"));

    const ia = logic.evaluateBadges(["act-8"]);
    assert(`${suite} — actividad IA -> badge-ia`, ia.includes("badge-ia"));

    const fourTypes = logic.evaluateBadges(["act-1", "act-2", "act-3", "act-4"]);
    assert(`${suite} — 4 tipos distintos -> badge-explorador-tipos`, fourTypes.includes("badge-explorador-tipos"));
  })();

  (function suiteNormalizeProgress() {
    const suite = "normalizeProgress";
    const normalized = logic.normalizeProgress({
      selectedAvatarId: "avatar-rio",
      completedActivityIds: ["act-1", "act-1", "unknown", "act-2", "act-3"],
      stats: { exportedCount: 2, importedCount: 1 }
    });

    assertEqual(`${suite} — limpia duplicados e IDs desconocidos`, normalized.completedActivityIds, ["act-1", "act-2", "act-3"]);
    assertEqual(`${suite} — conserva avatar conocido`, normalized.selectedAvatarId, "avatar-rio");
    assertEqual(`${suite} — recalcula puntos desde actividades`, normalized.points, 75);
    assertEqual(`${suite} — recalcula nivel desde puntos`, normalized.level, 2);
    assert(`${suite} — recalcula badge de ruta completa`, normalized.earnedBadgeIds.includes("badge-primera-ruta"));
    assertEqual(`${suite} — stats.completedActivities recalculado`, normalized.stats.completedActivities, 3);
    assertEqual(`${suite} — stats.completedRoutes recalculado`, normalized.stats.completedRoutes, 1);
    assertEqual(`${suite} — conserva exportedCount`, normalized.stats.exportedCount, 2);
    assertEqual(`${suite} — conserva importedCount`, normalized.stats.importedCount, 1);

    const fallback = logic.normalizeProgress({ selectedAvatarId: "avatar-fantasma", completedActivityIds: ["act-1"] });
    assertEqual(`${suite} — avatar desconocido usa default`, fallback.selectedAvatarId, "avatar-semilla");
  })();
})();
