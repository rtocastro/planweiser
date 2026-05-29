function GeneratorModal({
  isOpen,
  onClose,
  generatorSettings,
  setGeneratorSettings,
  selectedTemplate,
  setSelectedTemplate,
  generateFromTemplate,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="move-modal">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Planweiser AI</p>
            <h2>Generate This Week</h2>
          </div>

          <button
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <label>
          Energy
          <select
            value={generatorSettings.energy}
            onChange={(e) =>
              setGeneratorSettings((current) => ({
                ...current,
                energy: e.target.value,
              }))
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Focus
          <select
            value={generatorSettings.focus}
            onChange={(e) =>
              setGeneratorSettings((current) => ({
                ...current,
                focus: e.target.value,
              }))
            }
          >
            <option value="all">All</option>
            <option value="etsy">Etsy</option>
            <option value="music">Music</option>
            <option value="personal">Personal</option>
          </select>
        </label>

        <label>
          Goal
          <select
            value={generatorSettings.goal}
            onChange={(e) =>
              setGeneratorSettings((current) => ({
                ...current,
                goal: e.target.value,
              }))
            }
          >
            <option value="engagement">Engagement</option>
            <option value="sales">Sales</option>
            <option value="consistency">Consistency</option>
            <option value="release">Release Push</option>
          </select>
        </label>

        <label>
          Tone
          <select
            value={generatorSettings.tone}
            onChange={(e) =>
              setGeneratorSettings((current) => ({
                ...current,
                tone: e.target.value,
              }))
            }
          >
            <option value="funny">Funny</option>
            <option value="motivational">Motivational</option>
            <option value="direct">Direct</option>
            <option value="nonsalesy">Non-salesy</option>
          </select>
        </label>

        <label>
          Template
          <select
            value={selectedTemplate}
            onChange={(e) =>
              setSelectedTemplate(e.target.value)
            }
          >
            <option value="lowEnergy">Low Energy Week</option>
            <option value="etsyPush">Etsy Push</option>
            <option value="releaseWeek">Release Week</option>
            <option value="burnoutRecovery">
              Burnout Recovery
            </option>
          </select>
        </label>

        <button
          className="submit-button"
          onClick={generateFromTemplate}
        >
          ⚡ Generate Week
        </button>
      </div>
    </div>
  );
}

export default GeneratorModal;