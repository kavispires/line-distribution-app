import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Checkbox, Form, Option, Select, Text } from 'informed';

// Import common components
import { Loading, MemberCard, RequirementWrapper } from '../../../common';
// Import constants
import constants from '../../../../utils/constants';
// Import utility functions
import utils from '../../../../utils';

class Idols extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      color: '',
      gender: '',
      name: '',
      nationality: '',
      position: '',
      sort: 'name',
      order: 'asc',
    };
  }

  componentDidMount() {
    this.props.loadMembers();
  }

  updateFilters(formState) {
    this.setState({
      age: formState.values.age,
      color: formState.values.color,
      gender: formState.values.gender,
      favorite: formState.values.favorite,
      name: formState.values.name,
      nationality: formState.values.nationality,
      position: formState.values.position,
      sort: formState.values.sort || 'name',
      order: formState.values.order || 'asc',
    });
  }

  render() {
    const {
      app: { pending },
      auth: { user },
      admin: { members },
      updateFavoriteMembers,
    } = this.props;

    if (pending.REQUEST_MEMBERS) {
      return <Loading message="Fecthing Idols..." />;
    }

    const filteredMembers = _.filter(members, member => {
      let evaluation = true;
      if (this.state.color) evaluation = member.colorId === this.state.color;
      if (this.state.gender) evaluation = member.gender === this.state.gender;
      if (this.state.nationality)
        evaluation = member.nationality === this.state.nationality;
      if (this.state.position)
        evaluation = member.positions.includes(this.state.position);
      if (this.state.name)
        evaluation = member.name
          .toLowerCase()
          .startsWith(this.state.name.toLowerCase());
      if (this.state.favorite) evaluation = user.favoriteMembers[member.id];
      if (this.state.age) {
        if (this.state.age === '<18') {
          evaluation = member.age < 18;
        } else if (this.state.age === '18-28') {
          evaluation = member.age < 17 && member.age < 28;
        } else {
          evaluation = member.age > 28;
        }
      }
      return evaluation;
    });

    const sortedMembers = _.orderBy(
      filteredMembers,
      [this.state.sort],
      [this.state.order]
    );

    return (
      <RequirementWrapper>
        <main className="container container--idols">
          <h1>Idols</h1>
          <Form
            onChange={formState => this.updateFilters(formState)}
            autoComplete="off"
            className="idols__filter-group"
          >
            <span className="idols__filter-name">Filters: </span>
            <label className="idols__filter-label">
              Name starts with:{' '}
              <Text
                className="idols__filter-input-text"
                field="name"
                initialValue={this.state.name}
                maxLength="3"
              />
            </label>
            <label className="idols__filter-label">
              Gender:{' '}
              <Select
                className="idols__filter-select"
                field="gender"
                initialValue={this.state.gender}
              >
                <Option value="">Any</Option>
                {Object.entries(constants.GENDERS).map(gender => (
                  <Option key={gender[0]} value={gender[0]}>
                    {gender[1]}
                  </Option>
                ))}
              </Select>
            </label>
            <label className="idols__filter-label">
              Nationality:{' '}
              <Select
                className="idols__filter-select"
                field="nationality"
                initialValue={this.state.nationality}
              >
                <Option value="">Any</Option>
                {Object.entries(constants.NATIONALITIES).map(nationalitie => (
                  <Option key={nationalitie[0]} value={nationalitie[0]}>
                    {nationalitie[1]}
                  </Option>
                ))}
              </Select>
            </label>
            <label className="idols__filter-label">
              Age Range:{' '}
              <Select
                className="idols__filter-select"
                field="age"
                initialValue={this.state.age}
              >
                <Option value="">Any</Option>
                <Option value="<18">&lt;18</Option>
                <Option value="18-28">18-28</Option>
                <Option value="28+">28+</Option>
              </Select>
            </label>
            <label className="idols__filter-label">
              Position:{' '}
              <Select
                className="idols__filter-select"
                field="position"
                initialValue={this.state.position}
              >
                <Option value="">Any</Option>
                {constants.POSITIONS_LIST.map(position => (
                  <Option key={position} value={position}>
                    {constants.POSITIONS_LIST_OBJ[position]}
                  </Option>
                ))}
              </Select>
            </label>
            <label className="idols__filter-label">
              Color:{' '}
              <Select
                className="idols__filter-select"
                field="color"
                initialValue={this.state.color}
              >
                <Option value="">Any</Option>
                {Object.entries(constants.COLORS).map(color => (
                  <Option key={color[0]} value={color[0]}>
                    {utils.humanize(color[1], 'Capital')}
                  </Option>
                ))}
              </Select>
            </label>
            <label className="idols__filter-label">
              Show only favorites:{' '}
              <Checkbox
                field="favorite"
                initialValue={this.state.onlyFavorite}
              />
            </label>
            <label className="idols__filter-label">
              Sort by:{' '}
              <Select
                className="idols__filter-select"
                field="sort"
                initialValue={this.state.sort}
              >
                <Option value="age">Age</Option>
                <Option value="colorId">Color</Option>
                <Option value="gender">Gender</Option>
                <Option value="referenceArtist">Group</Option>
                <Option value="name">Name</Option>
                <Option value="nationality">Nationality</Option>
              </Select>
            </label>
            <label className="idols__filter-label">
              Order:{'  '}
              <Select
                className="idols__filter-select"
                field="order"
                initialValue={this.state.order}
              >
                <Option value="asc">Ascending</Option>
                <Option value="desc">Descending</Option>
              </Select>
            </label>
          </Form>
          <h3 className="member-count">
            Displaying {sortedMembers.length} members
          </h3>
          <div className="idols__list">
            {sortedMembers.map(member => (
              <MemberCard
                key={member.id}
                member={member}
                showId
                showReferenceArtist
                favoriteState={
                  user.favoriteMembers && user.favoriteMembers[member.id]
                }
                updateFavoriteMembers={updateFavoriteMembers}
              />
            ))}
          </div>
        </main>
      </RequirementWrapper>
    );
  }
}

Idols.propTypes = {
  admin: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loadMembers: PropTypes.func.isRequired,
  updateFavoriteMembers: PropTypes.func.isRequired,
};

export default Idols;
