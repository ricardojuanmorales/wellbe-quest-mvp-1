(function () {
  const mockData = {
    config: {
      progress_version: "1.0.0",
      default_avatar_id: "avatar-semilla",
      levels: [
        { level: 1, min_points: 0 },
        { level: 2, min_points: 50 },
        { level: 3, min_points: 120 },
        { level: 4, min_points: 220 }
      ]
    },
    avatars: [
      { id: "avatar-semilla" },
      { id: "avatar-rio" }
    ],
    routes: [
      { id: "route-nutricion", activity_ids: ["act-1", "act-2", "act-3"] },
      { id: "route-comunidad", activity_ids: ["act-4", "act-5", "act-6"] },
      { id: "route-agroecologia-comunidad", activity_ids: ["act-7"] },
      { id: "route-ia-salud-buen-vivir", activity_ids: ["act-8"] },
      { id: "route-vacia", activity_ids: [] }
    ],
    activities: [
      { id: "act-1", route_id: "route-nutricion", type: "quiz", points: 20 },
      { id: "act-2", route_id: "route-nutricion", type: "claim_detector", points: 25 },
      { id: "act-3", route_id: "route-nutricion", type: "branching_case", points: 30 },
      { id: "act-4", route_id: "route-comunidad", type: "mind_map", points: 20 },
      { id: "act-5", route_id: "route-comunidad", type: "simple_simulation", points: 25 },
      { id: "act-6", route_id: "route-comunidad", type: "reflection", points: 20 },
      { id: "act-7", route_id: "route-agroecologia-comunidad", type: "quiz", points: 25 },
      { id: "act-8", route_id: "route-ia-salud-buen-vivir", type: "quiz", points: 25 }
    ],
    badges: [
      { id: "badge-primer-paso", trigger: "complete_1_activity" },
      { id: "badge-primera-ruta", trigger: "complete_1_route" },
      { id: "badge-mitad-camino", trigger: "complete_6_activities" },
      { id: "badge-aprendizaje-completo", trigger: "complete_12_activities" },
      { id: "badge-comunidad", trigger: "complete_community_activity" },
      { id: "badge-ia", trigger: "complete_ai_activity" },
      { id: "badge-explorador-tipos", trigger: "complete_4_activity_types" }
    ]
  };

  function createLogic(data) {
    function createDefaultProgress() {
      return {
        version: "1.0.0",
        selectedAvatarId: "",
        completedActivityIds: [],
        earnedBadgeIds: [],
        points: 0,
        level: 1,
        routeProgress: {},
        stats: { completedActivities: 0, completedRoutes: 0, exportedCount: 0, importedCount: 0 },
        updatedAt: new Date().toISOString()
      };
    }

    function escapeHtml(value) {
      return String(value ?? "")
        .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;").replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function uniqueKnownIds(ids, knownSet) {
      return [...new Set(Array.isArray(ids) ? ids : [])].filter(id => knownSet.has(id));
    }

    function calculateLevel(points) {
      const levels = data.config.levels || [];
      return levels.reduce((sel, lv) => points >= lv.min_points ? lv : sel, levels[0])?.level || 1;
    }

    function calculateRouteProgress(completedIds) {
      const done = new Set(completedIds);
      const rp = {};
      data.routes.forEach(route => {
        const total = route.activity_ids.length;
        const count = route.activity_ids.filter(id => done.has(id)).length;
        rp[route.id] = {
          completed: count,
          total,
          percent: total ? Math.round((count / total) * 100) : 0,
          complete: total > 0 && count === total
        };
      });
      return rp;
    }

    function evaluateBadges(completedIds) {
      const done = new Set(completedIds);
      const rp = calculateRouteProgress(completedIds);
      const completedActivities = data.activities.filter(a => done.has(a.id));
      const completedRoutes = Object.values(rp).filter(r => r.complete).length;
      const completedTypes = new Set(completedActivities.map(a => a.type));
      return data.badges.filter(badge => {
        if (badge.trigger === "complete_1_activity") return done.size >= 1;
        if (badge.trigger === "complete_1_route") return completedRoutes >= 1;
        if (badge.trigger === "complete_6_activities") return done.size >= 6;
        if (badge.trigger === "complete_12_activities") return done.size >= 12;
        if (badge.trigger === "complete_community_activity") return completedActivities.some(a => a.route_id === "route-agroecologia-comunidad");
        if (badge.trigger === "complete_ai_activity") return completedActivities.some(a => a.route_id === "route-ia-salud-buen-vivir");
        if (badge.trigger === "complete_4_activity_types") return completedTypes.size >= 4;
        return false;
      }).map(b => b.id);
    }

    function normalizeProgress(input) {
      const activityIds = new Set(data.activities.map(a => a.id));
      const avatarIds = new Set(data.avatars.map(a => a.id));
      const completedActivityIds = uniqueKnownIds(input?.completedActivityIds, activityIds);
      const selectedAvatarId = avatarIds.has(input?.selectedAvatarId) ? input.selectedAvatarId : (data.config.default_avatar_id || "");
      const points = data.activities
        .filter(a => completedActivityIds.includes(a.id))
        .reduce((sum, a) => sum + Number(a.points || 0), 0);
      const routeProgress = calculateRouteProgress(completedActivityIds);
      const earnedBadgeIds = evaluateBadges(completedActivityIds);
      return {
        ...createDefaultProgress(),
        version: input?.version || data.config.progress_version || "1.0.0",
        selectedAvatarId,
        completedActivityIds,
        earnedBadgeIds,
        points,
        level: calculateLevel(points),
        routeProgress,
        stats: {
          completedActivities: completedActivityIds.length,
          completedRoutes: Object.values(routeProgress).filter(r => r.complete).length,
          exportedCount: Number(input?.stats?.exportedCount || 0),
          importedCount: Number(input?.stats?.importedCount || 0)
        },
        updatedAt: new Date().toISOString()
      };
    }

    return {
      createDefaultProgress,
      escapeHtml,
      uniqueKnownIds,
      calculateLevel,
      calculateRouteProgress,
      evaluateBadges,
      normalizeProgress
    };
  }

  window.WellbeLogicFixture = { mockData, logic: createLogic(mockData) };
})();
