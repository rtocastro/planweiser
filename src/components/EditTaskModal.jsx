function EditTaskModal({
  editingTask,
  setEditingTask,
  saveEditedTask,
}) {
  if (!editingTask) return null;

  function updateEditingTask(field, value) {
    setEditingTask((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <div className="modal-backdrop">
      <form
        className="move-modal"
        onSubmit={(e) => {
          e.preventDefault();
          saveEditedTask(editingTask);
        }}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Edit Move</p>
            <h2>{editingTask.title}</h2>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={() => setEditingTask(null)}
          >
            ×
          </button>
        </div>

        <label>
          Title
          <input
            value={editingTask.title}
            onChange={(e) =>
              updateEditingTask("title", e.target.value)
            }
          />
        </label>

        <label>
          Note
          <textarea
            value={editingTask.note}
            onChange={(e) =>
              updateEditingTask("note", e.target.value)
            }
          />
        </label>

        <label>
          Time
          <input
            value={editingTask.time}
            onChange={(e) =>
              updateEditingTask("time", e.target.value)
            }
          />
        </label>

        <button className="submit-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditTaskModal;