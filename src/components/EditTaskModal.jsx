const statusOptions = [
  "Drafted",
  "Scheduled",
  "Posted",
  "Review Needed",
  "Archived",
];

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
            value={editingTask.title || ""}
            onChange={(e) =>
              updateEditingTask("title", e.target.value)
            }
          />
        </label>

        <label>
          Idea
          <textarea
            value={editingTask.idea || ""}
            onChange={(e) =>
              updateEditingTask("idea", e.target.value)
            }
          />
        </label>

        <label>
          Caption Draft
          <textarea
            value={editingTask.captionDraft || ""}
            onChange={(e) =>
              updateEditingTask("captionDraft", e.target.value)
            }
          />
        </label>

        <label>
          Final Caption
          <textarea
            value={editingTask.finalCaption || ""}
            onChange={(e) =>
              updateEditingTask("finalCaption", e.target.value)
            }
            placeholder="Paste or write the final version you actually post..."
          />
        </label>

        <label>
          Status
          <select
            value={editingTask.status || "Drafted"}
            onChange={(e) =>
              updateEditingTask("status", e.target.value)
            }
          >
            {statusOptions.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>

        <label>
          Notes
          <textarea
            value={editingTask.note || ""}
            onChange={(e) =>
              updateEditingTask("note", e.target.value)
            }
          />
        </label>

        <label>
          Time
          <input
            value={editingTask.time || ""}
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