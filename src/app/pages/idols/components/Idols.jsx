import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Checkbox, Form, Option, Select, Text } from 'informed';

// Import common components
import { Loading, MemberCard, RequirementWrapper } from '../../../common';
// Import utils
import constants from '../../../../utils/constants';
import enums from '../../../../utils/readable-enums';
import localStorage from '../../../../utils/local-storage';
import utils from '../../../../utils';

class Idols extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: '',
      color: '',
      favorite: '',
      gender: '',
      name: '',
      nationality: '',
      position: '',
      privacy: '',
      sort: 'name',
      order: 'asc',
      showIds: false,
    };

    this.filterIdols = this.filterIdols.bind(this);
    this.sortIdols = this.sortIdols.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.loadMembers();
    }

    this.localStorage();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.isAuthenticated && this.props.auth.isAuthenticated) {
      this.props.loadMembers();
    }
  }

  localStorage() {
    this.setState({
      showIds: this.props.auth.isAdmin
        ? localStorage.get('idolsShowIds')
        : false,
      sort: localStorage.get('idolsSort') || 'name',
      order: localStorage.get('idolsOrder') || 'asc',
    });
  }

  updateFilters(formState) {
    this.setState({
      age: formState.values.age,
      color: formState.values.color,
      favorite: formState.values.favorite,
      gender: formState.values.gender,
      name: formState.values.name,
      nationality: formState.values.nationality,
      position: formState.values.position,
      privacy: formState.values.privacy,
      sort: formState.values.sort || 'name',
      order: formState.values.order || 'asc',
      showIds: formState.values.showIds || false,
    });

    localStorage.set({
      idolsShowIds: this.props.auth.isAdmin
        ? formState.values.showIds || this.state.showIds
        : null,
      idolsSort: formState.values.sort || null,
      idolsOrder: formState.values.order || null,
    });
  }

  filterIdols(members, user) {
    return _.filter(members, member => {
      const evaluation = [!member.hide];

      if (this.state.favorite) {
        if (this.state.favorite === 'favorite') {
          evaluation.push(user.favoriteMembers[member.id]);
        } else {
          evaluation.push(!user.favoriteMembers[member.id]);
        }
      }

      if (this.state.privacy) {
        if (this.state.privacy === 'private') {
          evaluation.push(member.private);
        } else {
          evaluation.push(!member.private);
        }
      }

      if (this.state.color) evaluation.push(member.color === this.state.color);
      if (this.state.gender)
        evaluation.push(member.gender === this.state.gender);
      if (this.state.nationality)
        evaluation.push(member.nationality === this.state.nationality);
      if (this.state.position)
        evaluation.push(member.positions.includes(this.state.position));
      if (this.state.name)
        evaluation.push(
          member.name.toLowerCase().startsWith(this.state.name.toLowerCase())
        );
      if (this.state.age) {
        if (this.state.age === '<18') {
          evaluation.push(member.age < 18);
        } else if (this.state.age === '18-28') {
          evaluation.push(member.age > 17 && member.age < 28);
        } else {
          evaluation.push(member.age > 28);
        }
      }
      return evaluation.every(e => e);
    });
  }

  sortIdols(filteredMembers) {
    return _.orderBy(filteredMembers, [this.state.sort], [this.state.order]);
  }

  render() {
    const {
      app: { pending },
      auth: { isAdmin, user },
      db: { members },
      updateFavoriteMembers,
    } = this.props;

    if (pending.REQUEST_MEMBERS) {
      return <Loading message="Fecthing Idols..." />;
    }

    const filteredMembers = this.filterIdols(members, user);

    const sortedMembers = this.sortIdols(filteredMembers);

    return (
      <RequirementWrapper>
        <main className="container container--idols">
          <h1>Idols</h1>
          <Form
            onChange={formState => this.updateFilters(formState)}
            autoComplete="off"
            className="idols__filters-form"
          >
            <div className="idols__filters-group">
              <div className="idols__filters-items">
                <div className="idols__filter-select-group">
                  <label className="idols__filter-label">
                    Name starts with
                  </label>
                  <Text
                    className="idols__filter-input-text"
                    field="name"
                    initialValue={this.state.name}
                    maxLength="3"
                  />
                </div>

                <div className="idols__filter-select-group">
                  <label className="idols__filter-label">Gender</label>
                  <Select
                    className="idols__filter-select"
                    field="gender"
                    initialValue={this.state.gender}
                  >
                    <Option value="">Any</Option>
                    {Object.entries(enums.GENDERS).map(gender => (
                      <Option key={gender[0]} value={gender[0]}>
                        {gender[1]}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="idols__filter-select-group">
                  <label className="idols__filter-label">Nationality</label>
                  <Select
                    className="idols__filter-select"
                    field="nationality"
                    initialValue={this.state.nationality}
                  >
                    <Option value="">Any</Option>
                    {Object.entries(enums.NATIONALITIES).map(
                      ([value, text]) => (
                        <Option key={value} value={value}>
                          {text}
                        </Option>
                      )
                    )}
                  </Select>
                </div>
                <div className="idols__filter-select-group">
                  <label className="idols__filter-label">Age Range</label>
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
                </div>
                <div className="idols__filter-select-group">
                  <label className="idols__filter-label">Position</label>
                  <Select
                    className="idols__filter-select"
                    field="position"
                    initialValue={this.state.position}
                  >
                    <Option value="">Any</Option>
                    {Object.entries(enums.POSITIONS).map(([value, text]) => (
                      <Option key={value} value={value}>
                        {text}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="idols__filter-select-group">
                  <label className="idols__filter-label">Color</label>
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
                </div>
                <div className="idols__filter-select-group">
                  <label className="idols__filter-label">Favorite</label>
                  <Select
                    className="idols__filter-select"
                    field="favorite"
                    initialValue={this.state.favorite}
                  >
                    <Option value="">Any</Option>
                    <Option value="favorite">Favorite</Option>
                    <Option value="nonfavorite">Non-favorite</Option>
                  </Select>
                </div>
                <div className="idols__filter-select-group">
                  <label className="idols__filter-label">Privacy</label>
                  <Select
                    className="idols__filter-select"
                    field="privacy"
                    initialValue={this.state.privacy}
                  >
                    <Option value="">Any</Option>
                    <Option value="private">Private</Option>
                    <Option value="public">Public</Option>
                  </Select>
                </div>
                {isAdmin && (
                  <div className="idols__filter-select-group">
                    <label className="idols__filter-label">Show Ids</label>
                    <Checkbox
                      field="showIds"
                      initialValue={this.state.showIds}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="idols__filters-group">
              <div className="idols__filters-items">
                <div className="idols__filter-select-group">
                  <label className="idols__filter-label">Sort by</label>
                  <Select
                    className="idols__filter-select"
                    field="sort"
                    initialValue={this.state.sort}
                  >
                    <Option value="age">Age</Option>
                    <Option value="color">Color</Option>
                    <Option value="gender">Gender</Option>
                    <Option value="referenceArtists">Group</Option>
                    <Option value="name">Name</Option>
                    <Option value="nationality">Nationality</Option>
                  </Select>
                </div>
                <div className="idols__filter-select-group">
                  <label className="idols__filter-label">Order by</label>
                  <Select
                    className="idols__filter-select"
                    field="order"
                    initialValue={this.state.order}
                  >
                    <Option value="asc">Ascending</Option>
                    <Option value="desc">Descending</Option>
                  </Select>
                </div>
              </div>
            </div>
          </Form>
          <h3 className="member-count">
            Displaying {sortedMembers.length} members
          </h3>
          <div className="idols__list">
            {sortedMembers.map(member => (
              <MemberCard
                key={member.id}
                member={member}
                showId={this.state.showIds}
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
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  loadMembers: PropTypes.func.isRequired,
  updateFavoriteMembers: PropTypes.func.isRequired,
};

export default Idols;
