import React from 'react';
import PropTypes from 'prop-types';

// Form components
import { Checkbox, Form, Option, Select, Text } from 'informed';

// Import utils
import constants from '../../../../utils/constants';
import enums from '../../../../utils/readable-enums';
import utils from '../../../../utils';

const IdolsFilters = ({
  isExpanded,
  filters,
  isAdmin,
  updateFilters,
  openPanel,
}) => (
  <aside className={`side-panel ${isExpanded ? 'side-panel--active' : ''}`}>
    <h3>Filters</h3>
    <Form onChange={formState => updateFilters(formState)} autoComplete="off">
      <label className="input-label">Name (first 3 letters)</label>
      <Text
        className="input-text"
        field="name"
        initialValue={filters.name}
        maxLength="3"
      />

      <label className="input-label">Gender</label>
      <Select
        className="input-select"
        field="gender"
        initialValue={filters.gender}
      >
        <Option value="">Any</Option>
        {Object.entries(enums.GENDERS).map(gender => (
          <Option key={gender[0]} value={gender[0]}>
            {gender[1]}
          </Option>
        ))}
      </Select>

      <label className="input-label">Age Range</label>
      <Select className="input-select" field="age" initialValue={filters.age}>
        <Option value="">Any</Option>
        <Option value="<18">&lt;18</Option>
        <Option value="18-28">18-28</Option>
        <Option value="28+">28+</Option>
      </Select>

      <label className="input-label">Nationality</label>
      <Select
        className="input-select"
        field="nationality"
        initialValue={filters.nationality}
      >
        <Option value="">Any</Option>
        {Object.entries(enums.NATIONALITIES).map(([value, text]) => (
          <Option key={value} value={value}>
            {text}
          </Option>
        ))}
      </Select>

      <label className="input-label">Position</label>
      <Select
        className="input-select"
        field="position"
        initialValue={filters.position}
      >
        <Option value="">Any</Option>
        {Object.entries(enums.POSITIONS).map(([value, text]) => (
          <Option key={value} value={value}>
            {text}
          </Option>
        ))}
      </Select>

      <label className="input-label">Color</label>
      <Select
        className="input-select"
        field="color"
        initialValue={filters.color}
      >
        <Option value="">Any</Option>
        {Object.entries(constants.COLORS).map(color => (
          <Option key={color[0]} value={color[0]}>
            {utils.humanize(color[1], 'Capital')}
          </Option>
        ))}
      </Select>

      <label className="input-label">Favorite</label>
      <Select
        className="input-select"
        field="favorite"
        initialValue={filters.favorite}
      >
        <Option value="">Any</Option>
        <Option value="favorite">Favorite</Option>
        <Option value="nonfavorite">Non-favorite</Option>
      </Select>

      <label className="input-label">Privacy</label>
      <Select
        className="input-select"
        field="privacy"
        initialValue={filters.privacy}
      >
        <Option value="">Any</Option>
        <Option value="private">Private</Option>
        <Option value="public">Public</Option>
      </Select>

      {isAdmin && (
        <>
          <hr className="side-panel-hr" />
          <label className="input-label input-label--inline">Show Ids</label>
          <Checkbox field="showIds" initialValue={filters.showIds} />
        </>
      )}

      <hr className="side-panel-hr" />

      <label className="input-label">Sort by</label>
      <Select className="input-select" field="sort" initialValue={filters.sort}>
        <Option value="age">Age</Option>
        <Option value="color">Color</Option>
        <Option value="gender">Gender</Option>
        <Option value="referenceArtistsQuery">Group</Option>
        <Option value="name">Name</Option>
        <Option value="nationality">Nationality</Option>
      </Select>

      <label className="input-label">Order by</label>
      <Select
        className="input-select"
        field="order"
        initialValue={filters.order}
      >
        <Option value="asc">Ascending</Option>
        <Option value="desc">Descending</Option>
      </Select>
    </Form>

    <button className="btn side-panel-button" onClick={() => openPanel(null)}>
      Close
    </button>
  </aside>
);

IdolsFilters.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  filters: PropTypes.shape({
    age: PropTypes.string,
    color: PropTypes.string,
    favorite: PropTypes.string,
    gender: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
    position: PropTypes.string,
    privacy: PropTypes.string,
    sort: PropTypes.string,
    order: PropTypes.string,
    showIds: PropTypes.bool,
  }).isRequired,
  updateFilters: PropTypes.func.isRequired,
  openPanel: PropTypes.func.isRequired,
};

IdolsFilters.defaultProps = {};

export default IdolsFilters;
