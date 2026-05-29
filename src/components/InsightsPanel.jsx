function InsightsPanel({ tasks }) {
  const completed = tasks.filter((task) => task.done);

  const tza = completed.filter(
    (task) => task.projectId === "tza"
  ).length;

  const geek = completed.filter(
    (task) => task.projectId === "geek"
  ).length;

  const personal = completed.filter(
    (task) => task.projectId === "personal"
  ).length;

  return (
    <section className="archive-section">
      <p className="eyebrow">Insights</p>

      <h2>Activity Breakdown</h2>

      <div className="archive-list">
        <article className="archive-card">
          <strong>TZA</strong>
          <p>{tza} completed moves</p>
        </article>

        <article className="archive-card">
          <strong>Geek-E-Garments</strong>
          <p>{geek} completed moves</p>
        </article>

        <article className="archive-card">
          <strong>Personal</strong>
          <p>{personal} completed moves</p>
        </article>
      </div>
    </section>
  );
}

export default InsightsPanel;