function getMetricTotal(task) {
  const metrics = task.metrics || {};

  return (
    Number(metrics.likes || 0) +
    Number(metrics.comments || 0) +
    Number(metrics.shares || 0) +
    Number(metrics.saves || 0) +
    Number(metrics.clicks || 0) +
    Number(metrics.orders || 0)
  );
}

function getBestByGroup(tasks, groupKey) {
  const groups = {};

  tasks.forEach((task) => {
    const key = groupKey(task);

    if (!key) return;

    if (!groups[key]) {
      groups[key] = {
        label: key,
        total: 0,
        count: 0,
      };
    }

    groups[key].total += getMetricTotal(task);
    groups[key].count += 1;
  });

  return Object.values(groups)
    .map((group) => ({
      ...group,
      average: Math.round(group.total / group.count),
    }))
    .sort((a, b) => b.average - a.average)[0];
}

function WinningContentPanel({ tasks }) {
  const postsWithMetrics = tasks.filter((task) => getMetricTotal(task) > 0);

  if (!postsWithMetrics.length) {
    return (
      <section className="archive-section">
        <p className="eyebrow">Insights</p>
        <h2>Winning Content</h2>
        <p>No performance data yet.</p>
      </section>
    );
  }

  const topPost = [...postsWithMetrics].sort(
    (a, b) => getMetricTotal(b) - getMetricTotal(a)
  )[0];

  const bestPlatform = getBestByGroup(postsWithMetrics, (task) => task.type);

  const bestTimeSlot = getBestByGroup(postsWithMetrics, (task) => {
    if (task.title?.includes("Morning")) return "Morning";
    if (task.title?.includes("Afternoon")) return "Afternoon";
    if (task.title?.includes("Night")) return "Night";
    return task.time || "Flexible";
  });

  const bestPurpose = getBestByGroup(postsWithMetrics, (task) => {
    const match = task.note?.match(/Purpose:\s*([\s\S]*?)\n/);
    return match?.[1]?.trim() || "General";
  });

  return (
    <section className="archive-section">
      <p className="eyebrow">Insights</p>
      <h2>🏆 Winning Content</h2>

      <div className="winner-grid">
        <div className="winner-card">
          <h3>🔥 Top Post</h3>
          <strong>{topPost.title}</strong>
          <p>{topPost.type}</p>
          <p>Score: {getMetricTotal(topPost)}</p>
        </div>

        <div className="winner-card">
          <h3>📱 Best Platform</h3>
          <strong>{bestPlatform?.label}</strong>
          <p>Avg Score: {bestPlatform?.average}</p>
        </div>

        <div className="winner-card">
          <h3>🕒 Best Time Slot</h3>
          <strong>{bestTimeSlot?.label}</strong>
          <p>Avg Score: {bestTimeSlot?.average}</p>
        </div>

        <div className="winner-card">
          <h3>🎯 Best Purpose</h3>
          <strong>{bestPurpose?.label}</strong>
          <p>Avg Score: {bestPurpose?.average}</p>
        </div>
      </div>
    </section>
  );
}

export default WinningContentPanel;