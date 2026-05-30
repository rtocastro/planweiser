function TemplateLibrary({
  customTemplates,
  loadTemplate,
  deleteTemplate,
}) {
  if (!customTemplates.length) return null;

  return (
    <section className="archive-section">
      <p className="eyebrow">Templates</p>
      <h2>Saved Templates</h2>

      <div className="archive-list">
        {customTemplates.map((template) => (
          <article
            className="archive-card"
            key={template.id}
          >
            <strong>{template.name}</strong>

            <p>
              {template.tasks.length} saved moves
            </p>

            <div className="task-actions">
              <button
                onClick={() => loadTemplate(template)}
              >
                Load
              </button>

              <button
                className="danger-button"
                onClick={() =>
                  deleteTemplate(template.id)
                }
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TemplateLibrary;