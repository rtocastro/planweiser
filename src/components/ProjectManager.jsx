const platformOptions = [
  "Instagram",
  "Threads",
  "TikTok",
  "YouTube",
  "Facebook",
  "X / Twitter",
  "LinkedIn",
  "Blog",
];

function ProjectManager({
  contentProjects,
  setContentProjects,
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

  function addPlatform(projectId) {
    setContentProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              platforms: [
                ...project.platforms,
                {
                  id: Date.now(),
                  platform: "Instagram",
                  frequency: 1,
                  contentType: "Post",
                },
              ],
            }
          : project
      )
    );
  }

  function updatePlatform(projectId, platformId, field, value) {
    setContentProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              platforms: project.platforms.map((platform) =>
                platform.id === platformId
                  ? {
                      ...platform,
                      [field]:
                        field === "frequency"
                          ? Number(value)
                          : value,
                    }
                  : platform
              ),
            }
          : project
      )
    );
  }

  function deletePlatform(projectId, platformId) {
    setContentProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              platforms: project.platforms.filter(
                (platform) => platform.id !== platformId
              ),
            }
          : project
      )
    );
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
            <p>{project.notes}</p>

            <div className="platform-list">
              {project.platforms.map((platform) => (
                <div className="platform-row" key={platform.id}>
                  <select
                    value={platform.platform}
                    onChange={(e) =>
                      updatePlatform(
                        project.id,
                        platform.id,
                        "platform",
                        e.target.value
                      )
                    }
                  >
                    {platformOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={platform.frequency}
                    onChange={(e) =>
                      updatePlatform(
                        project.id,
                        platform.id,
                        "frequency",
                        e.target.value
                      )
                    }
                  />

                  <span>x/week</span>

                  <input
                    value={platform.contentType}
                    onChange={(e) =>
                      updatePlatform(
                        project.id,
                        platform.id,
                        "contentType",
                        e.target.value
                      )
                    }
                    placeholder="Post, Reel, Short..."
                  />

                  <button
                    className="danger-button"
                    type="button"
                    onClick={() =>
                      deletePlatform(project.id, platform.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <button
              className="ghost-button"
              type="button"
              onClick={() => addPlatform(project.id)}
            >
              + Add Platform
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectManager;