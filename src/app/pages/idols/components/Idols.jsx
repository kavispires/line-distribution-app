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
  static filterIdols(members = [], user, filters) {
    const filteredMembers = _.filter(members, member => {
      const evaluation = [!member.hide];

      if (filters.favorite) {
        if (filters.favorite === 'favorite') {
          evaluation.push(user.favoriteMembers[member.id]);
        } else {
          evaluation.push(!user.favoriteMembers[member.id]);
        }
      }

      if (filters.privacy) {
        if (filters.privacy === 'private') {
          evaluation.push(member.private);
        } else {
          evaluation.push(!member.private);
        }
      }

      if (filters.color) evaluation.push(member.color === filters.color);
      if (filters.gender) evaluation.push(member.gender === filters.gender);
      if (filters.nationality)
        evaluation.push(member.nationality === filters.nationality);
      if (filters.position)
        evaluation.push(member.positions.includes(filters.position));
      if (filters.name)
        evaluation.push(
          member.name.toLowerCase().startsWith(filters.name.toLowerCase())
        );
      if (filters.age) {
        if (filters.age === '<18') {
          evaluation.push(member.age < 18);
        } else if (filters.age === '18-28') {
          evaluation.push(member.age > 17 && member.age < 28);
        } else {
          evaluation.push(member.age > 28);
        }
      }
      return evaluation.every(e => e);
    });

    return _.orderBy(filteredMembers, [filters.sort], [filters.order]);
  }

  constructor(props) {
    super(props);
    this.state = {
      filters: {
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
      },
      members: [],
    };
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
    // Run members filters as soon as the api return the list of members
    if (prevProps.db.members.length !== this.props.db.members.length) {
      this.updateFilters({ values: {} }, true);
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

  updateFilters(formState, forceUpdateFilters = false) {
    const filters = {
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
    };

    // Prevent filters to be run if filters were not modified
    const hasNoNewFiltres = _.isEqual({ ...filters, members: [] }, this.state);
    if (hasNoNewFiltres && !forceUpdateFilters) {
      return;
    }

    const filteredMembers = this.constructor.filterIdols(
      this.props.db.members,
      this.props.auth.user,
      filters
    );

    this.setState({
      members: filteredMembers,
      ...filters,
    });

    localStorage.set({
      idolsShowIds: this.props.auth.isAdmin
        ? filters.showIds || this.state.filters.showIds
        : null,
      idolsSort: filters.sort || null,
      idolsOrder: filters.order || null,
    });
  }

  render() {
    const {
      app: { pending },
      auth: { isAdmin, user },
      updateFavoriteMembers,
    } = this.props;

    const { members, filters } = this.state;

    if (pending.REQUEST_MEMBERS) {
      return <Loading message="Fecthing Idols..." />;
    }

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
                    initialValue={filters.name}
                    maxLength="3"
                  />
                </div>

                <div className="idols__filter-select-group">
                  <label className="idols__filter-label">Gender</label>
                  <Select
                    className="idols__filter-select"
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
                </div>
                <div className="idols__filter-select-group">
                  <label className="idols__filter-label">Nationality</label>
                  <Select
                    className="idols__filter-select"
                    field="nationality"
                    initialValue={filters.nationality}
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
                    initialValue={filters.age}
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
                    initialValue={filters.position}
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
                    initialValue={filters.color}
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
                    initialValue={filters.favorite}
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
                    initialValue={filters.privacy}
                  >
                    <Option value="">Any</Option>
                    <Option value="private">Private</Option>
                    <Option value="public">Public</Option>
                  </Select>
                </div>
                {isAdmin && (
                  <div className="idols__filter-select-group">
                    <label className="idols__filter-label">Show Ids</label>
                    <Checkbox field="showIds" initialValue={filters.showIds} />
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
                    initialValue={filters.sort}
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
                    initialValue={filters.order}
                  >
                    <Option value="asc">Ascending</Option>
                    <Option value="desc">Descending</Option>
                  </Select>
                </div>
              </div>
            </div>
          </Form>
          <h3 className="member-count">Displaying {members.length} members</h3>
          <div className="idols__list">
            {members.map(member => (
              <MemberCard
                key={member.id}
                member={member}
                showId={filters.showIds}
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
