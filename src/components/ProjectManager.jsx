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

const purposeOptions = [
    "Engagement",
    "Sales",
    "Traffic",
    "Community",
    "Brand Building",
    "Education",
];

const dayOptions = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
];

const timeSlots = ["Morning", "Afternoon", "Night"];

function getProjectEmoji(name = "") {
    const lower = name.toLowerCase();

    if (
        lower.includes("zombie") ||
        lower.includes("apocalypse") ||
        lower.includes("tza")
    ) {
        return "🧟";
    }

    if (
        lower.includes("geek") ||
        lower.includes("garment") ||
        lower.includes("cat")
    ) {
        return "🐾";
    }

    if (
        lower.includes("fruit") ||
        lower.includes("garden") ||
        lower.includes("plant")
    ) {
        return "🌱";
    }

    if (
        lower.includes("music") ||
        lower.includes("band") ||
        lower.includes("song")
    ) {
        return "🎵";
    }

    if (lower.includes("personal")) return "✨";
    if (lower.includes("r'to") || lower.includes("arto")) return "🎛️";

    return "📁";
}

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
                                cadence: "weekly",
                                frequency: 1,
                                postsPerDay: 1,
                                timeSlots: [],
                                days: [],
                                purposes: [],
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
                                        field === "frequency" || field === "postsPerDay"
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

    function toggleTimeSlot(projectId, platformId, slot) {
        setContentProjects((current) =>
            current.map((project) =>
                project.id === projectId
                    ? {
                        ...project,
                        platforms: project.platforms.map((platform) => {
                            if (platform.id !== platformId) return platform;

                            const slots = platform.timeSlots || [];
                            const updatedSlots = slots.includes(slot)
                                ? slots.filter((item) => item !== slot)
                                : [...slots, slot];

                            return {
                                ...platform,
                                timeSlots: updatedSlots,
                            };
                        }),
                    }
                    : project
            )
        );
    }

    function togglePurpose(projectId, platformId, purpose) {
        setContentProjects((current) =>
            current.map((project) =>
                project.id === projectId
                    ? {
                        ...project,
                        platforms: project.platforms.map((platform) => {
                            if (platform.id !== platformId) return platform;

                            const purposes = platform.purposes || [];

                            const updated = purposes.includes(purpose)
                                ? purposes.filter((item) => item !== purpose)
                                : [...purposes, purpose];

                            return {
                                ...platform,
                                purposes: updated,
                            };
                        }),
                    }
                    : project
            )
        );
    }

    function toggleDay(projectId, platformId, day) {
        setContentProjects((current) =>
            current.map((project) =>
                project.id === projectId
                    ? {
                        ...project,
                        platforms: project.platforms.map((platform) => {
                            if (platform.id !== platformId) {
                                return platform;
                            }

                            const days = platform.days || [];

                            const updatedDays = days.includes(day)
                                ? days.filter((item) => item !== day)
                                : [...days, day];

                            return {
                                ...platform,
                                days: updatedDays,
                            };
                        }),
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

    function deleteProject(projectId) {
        const confirmed = window.confirm(
            "Delete this project and all associated tasks?"
        );

        if (!confirmed) return;

        setContentProjects((current) =>
            current.filter((project) => project.id !== projectId)
        );

        setTasks((current) =>
            current.filter((task) => task.projectId !== projectId)
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
                    placeholder="Campaign notes, assets available, target audience, promotions, content themes...Notes for generator to get ideas from"
                    value={newProject.notes}
                    onChange={(e) => updateProject("notes", e.target.value)}
                />

                <button className="ghost-button">Add Project</button>
            </form>

            <div className="archive-list">
                {contentProjects.map((project) => (
                    <article className="archive-card" key={project.id}>
                        <div className="project-header">
                            <strong>
                                {getProjectEmoji(project.name)}
                                {" "}
                                {project.name}
                            </strong>

                            <button
                                type="button"
                                className="danger-button"
                                onClick={() => deleteProject(project.id)}
                            >
                                Delete Project
                            </button>
                        </div>


                        <p>Tone: {project.tone}</p>
                        <p>{project.notes}</p>

                        <div className="platform-list">
                            {project.platforms.map((platform) => (
                                <div className="platform-row cadence-row" key={platform.id}>
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

                                    <select
                                        value={platform.cadence || "weekly"}
                                        onChange={(e) =>
                                            updatePlatform(
                                                project.id,
                                                platform.id,
                                                "cadence",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="weekly">Weekly</option>
                                        <option value="daily">Daily</option>
                                    </select>

                                    <input
                                        type="number"
                                        min="1"
                                        max="21"
                                        value={
                                            platform.cadence === "daily"
                                                ? platform.postsPerDay || 1
                                                : platform.frequency || 1
                                        }
                                        onChange={(e) =>
                                            updatePlatform(
                                                project.id,
                                                platform.id,
                                                platform.cadence === "daily"
                                                    ? "postsPerDay"
                                                    : "frequency",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <span>
                                        {platform.cadence === "daily" ? "x/day" : "x/week"}
                                    </span>

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

                                    {platform.cadence === "daily" && (
                                        <div className="slot-picker">
                                            {timeSlots.map((slot) => (
                                                <label key={slot}>
                                                    <input
                                                        type="checkbox"
                                                        checked={(platform.timeSlots || []).includes(slot)}
                                                        onChange={() =>
                                                            toggleTimeSlot(project.id, platform.id, slot)
                                                        }
                                                    />
                                                    {slot}
                                                </label>
                                            ))}
                                        </div>
                                    )}

                                    <div className="purpose-picker">
                                        {purposeOptions.map((purpose) => (
                                            <label key={purpose}>
                                                <input
                                                    type="checkbox"
                                                    checked={(platform.purposes || []).includes(purpose)}
                                                    onChange={() =>
                                                        togglePurpose(project.id, platform.id, purpose)
                                                    }
                                                />
                                                {purpose}
                                            </label>
                                        ))}
                                    </div>

                                    <div className="day-picker">
                                        {dayOptions.map((day) => (
                                            <label key={day}>
                                                <input
                                                    type="checkbox"
                                                    checked={(platform.days || []).includes(day)}
                                                    onChange={() =>
                                                        toggleDay(
                                                            project.id,
                                                            platform.id,
                                                            day
                                                        )
                                                    }
                                                />
                                                {day}
                                            </label>
                                        ))}
                                    </div>

                                    <button
                                        className="danger-button"
                                        type="button"
                                        onClick={() => deletePlatform(project.id, platform.id)}
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