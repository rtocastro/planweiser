function ProjectManager({
  contentProjects,
  newProject,
  setNewProject,
  addContentProject,
}) {
  function updateProject(field, value) {
    setNewProject((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <section className="archive-section">
      <p className="eyebrow">Content Engine</p>
      <h2>Projects</h2>

      <form className="mini-form" onSubmit={addContentProject}>
        <input
          placeholder="Project name, ex: Thee Zombie Apocalypse"
          value={newProject.name}
          onChange={(e) => updateProject("name", e.target.value)}
        />

        <input
          placeholder="Tone, ex: funny, heavy, direct"
          value={newProject.tone}
          onChange={(e) => updateProject("tone", e.target.value)}
        />

        <textarea
          placeholder="Notes for the generator..."
          value={newProject.notes}
          onChange={(e) => updateProject("notes", e.target.value)}
        />

        <button className="ghost-button">Add Project</button>
      </form>

      <div className="archive-list">
        {contentProjects.map((project) => (
          <article className="archive-card" key={project.id}>
            <strong>{project.name}</strong>
            <p>Tone: {project.tone}</p>
            <p>Platforms: {project.platforms.length}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectManager;