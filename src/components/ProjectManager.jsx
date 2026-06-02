function ProjectManager({
  projects,
  setProjects,
}) {
  return (
    <section className="archive-section">
      <p className="eyebrow">Projects</p>
      <h2>Content Engines</h2>

      {projects.map((project) => (
        <article
          key={project.id}
          className="archive-card"
        >
          <strong>{project.name}</strong>

          <p>
            {project.platforms.length} platforms
          </p>
        </article>
      ))}
    </section>
  );
}

export default ProjectManager;