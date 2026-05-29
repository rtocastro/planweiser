function ArchiveSection({ archives }) {
  if (!archives.length) return null;

  return (
    <section className="archive-section">
      <p className="eyebrow">History</p>
      <h2>Archived Weeks</h2>

      <div className="archive-list">
        {archives.slice(0, 10).map((archive) => (
          <article className="archive-card" key={archive.id}>
            <strong>{archive.date}</strong>

            <p>
              {archive.completed} of {archive.total} moves completed
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ArchiveSection;