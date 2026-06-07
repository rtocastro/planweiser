function getWinnerScore(task) {
    const metrics = task.metrics || {};

    return (
        Number(metrics.likes || 0) +
        Number(metrics.comments || 0) * 2 +
        Number(metrics.shares || 0) * 3 +
        Number(metrics.saves || 0) * 3 +
        Number(metrics.clicks || 0) * 2 +
        Number(metrics.orders || 0) * 5
    );
}

function getBestTags(tasks) {
    const tagScores = {};

    tasks.forEach((task) => {
        if (!task.winnerTags) return;

        const tags = task.winnerTags
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean);

        tags.forEach((tag) => {
            if (!tagScores[tag]) {
                tagScores[tag] = {
                    label: tag,
                    total: 0,
                    count: 0,
                };
            }

            tagScores[tag].total += getWinnerScore(task);
            tagScores[tag].count += 1;
        });
    });

    return Object.values(tagScores)
        .map((tag) => ({
            ...tag,
            average: Math.round(tag.total / tag.count),
        }))
        .sort((a, b) => b.average - a.average)
        .slice(0, 5);
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

        groups[key].total += getWinnerScore(task);
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
    const postsWithMetrics = tasks.filter((task) => getWinnerScore(task) > 0);

    if (!postsWithMetrics.length) {
        return (
            <section className="archive-section">
                <p className="eyebrow">Insights</p>
                <h2>Winning Content</h2>
                <p>No performance data yet.</p>
            </section>
        );
    }

    const topPosts = [...postsWithMetrics]
        .sort((a, b) => getWinnerScore(b) - getWinnerScore(a))
        .slice(0, 5);

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

    const bestTags = getBestTags(postsWithMetrics);

    return (
        <section className="archive-section">
            <p className="eyebrow">Insights</p>
            <h2>🏆 Winning Content</h2>
<div className="winner-card">
  <h3>🏷️ Best Tags</h3>

  {bestTags.length ? (
    bestTags.map((tag) => (
      <p key={tag.label}>
        <strong>{tag.label}</strong> · Avg Score: {tag.average}
      </p>
    ))
  ) : (
    <p>No tags yet.</p>
  )}
</div>
        </section>
    );
}

export default WinningContentPanel;