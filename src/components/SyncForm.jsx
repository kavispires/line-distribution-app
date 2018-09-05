import React from 'react';
import PropTypes from 'prop-types';

// Import shared components
import SyncInstructions from './SyncInstructions';

const SyncForm = ({ form, step, updateForm, updateStep }) => (
  <main className="container container-sync">
    <h1>Sync</h1>
    <div className="sync-grid-group">
      <SyncInstructions step={step} />
      <section className="sync-grid-form">
        <ul className="sync-info">
          <li className="sync-info__item">
            <label className="ld-form__label" htmlFor="title">
              title:
            </label>
            <input
              className="ld-form__input-text"
              type="text"
              name="title"
              onChange={updateForm}
              placeholder="Song Title"
              value={form.title}
            />
          </li>
          <li className="sync-info__item">
            <label className="ld-form__label" htmlFor="originalArtist">
              original artist:
            </label>
            <input
              className="ld-form__input-text"
              type="text"
              name="originalArtist"
              onChange={updateForm}
              placeholder="Original Artist"
              value={form.originalArtist}
            />
          </li>
          <li className="sync-info__item">
            <label className="ld-form__label" htmlFor="album">
              album:
            </label>
            <input
              className="ld-form__input-text"
              type="text"
              name="album"
              onChange={updateForm}
              placeholder="Album Name"
              value={form.album}
            />
          </li>
          <li className="sync-info__item">
            <label className="ld-form__label" htmlFor="single">
              title/single:
            </label>
            <input
              className="ld-form__checkbox"
              type="checkbox"
              name="single"
              onChange={updateForm}
              value={form.single}
            />
          </li>
          <li className="sync-info__item">
            <label className="ld-form__label" htmlFor="groupSize">
              group size:
            </label>
            <input
              className="ld-form__input-number"
              type="number"
              name="groupSize"
              onChange={updateForm}
              value={form.groupSize}
            />
          </li>
        </ul>
        <nav className="sync-navigation">
          <button
            className="btn btn-block btn-fx-150"
            onClick={() => updateStep('+1')}
            disabled={form.title.length === 0}
          >
            Next
          </button>
        </nav>
      </section>
    </div>
  </main>
);

SyncForm.propTypes = {
  form: PropTypes.object.isRequired,
  step: PropTypes.number.isRequired,
  updateForm: PropTypes.func.isRequired,
  updateStep: PropTypes.func.isRequired,
};

export default SyncForm;
