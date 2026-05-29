function AddMoveModal({
  isOpen,
  onClose,
  newMove,
  projects,
  handleChange,
  addMove,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <form className="move-modal" onSubmit={addMove}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">New Move</p>
            <h2>Add to this week</h2>
          </div>

          <button type="button" className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <label>
          Project
          <select
            name="projectId"
            value={newMove.projectId}
            onChange={handleChange}
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.emoji} {project.name}
              </option>
            ))}
          </select>
        </label>

        <div className="form-row">
          <label>
            Day
            <select name="day" value={newMove.day} onChange={handleChange}>
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>
          </label>

          <label>
            Time
            <input
              name="time"
              value={newMove.time}
              onChange={handleChange}
              placeholder="7:17 PM"
            />
          </label>
        </div>

        <label>
          Type
          <input
            name="type"
            value={newMove.type}
            onChange={handleChange}
            placeholder="Instagram, Threads, Task..."
          />
        </label>

        <label>
          Title
          <input
            name="title"
            value={newMove.title}
            onChange={handleChange}
            placeholder="Post product carousel"
          />
        </label>

        <label>
          Note
          <textarea
            name="note"
            value={newMove.note}
            onChange={handleChange}
            placeholder="Keep it funny, light, and non-pushy."
          />
        </label>

        <button className="submit-button" type="submit">
          Add Move
        </button>
      </form>
    </div>
  );
}

export default AddMoveModal;