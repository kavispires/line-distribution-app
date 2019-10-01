import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import components
import IdolsFilters from './IdolsFilters';
// Import common components
import { Icon, Loading, MemberCard, RequirementWrapper } from '../../../common';
// Import utils
import localStorage from '../../../../utils/local-storage';

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
      sidePanel: null,
    };

    this.updateFilters = this.updateFilters.bind(this);
    this.openPanel = this.openPanel.bind(this);
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
      filters,
    });

    localStorage.set({
      idolsShowIds: this.props.auth.isAdmin
        ? filters.showIds || this.state.filters.showIds
        : null,
      idolsSort: filters.sort || null,
      idolsOrder: filters.order || null,
    });
  }

  openPanel(panelName) {
    let sidePanel = null;
    if (panelName && panelName !== this.state.sidePanel) {
      sidePanel = panelName;
    }
    this.setState({
      sidePanel,
    });
  }

  render() {
    const {
      app: { pending },
      auth: { isAdmin, user },
      updateFavoriteMembers,
    } = this.props;

    const { members, filters, sidePanel } = this.state;

    if (pending.REQUEST_ARTISTS || pending.INITIALIZER || pending.RUN_AUTH) {
      return <Loading message="Fecthing Idols..." />;
    }

    return (
      <RequirementWrapper>
        <div className="container container--with-filters container--idols">
          <IdolsFilters
            isExpanded={sidePanel === 'filters'}
            filters={filters}
            isAdmin={isAdmin}
            updateFilters={this.updateFilters}
            openPanel={this.openPanel}
          />
          <aside className="side-panel-vertical-buttons">
            <button
              className="side-panel-vertical-buttons__button"
              onClick={() => this.openPanel('filters')}
            >
              <Icon type="filter" />
            </button>
            <button
              className="side-panel-vertical-buttons__button"
              onClick={() => this.openPanel('edit')}
            >
              <Icon type="edit" />
            </button>
          </aside>
          <main className="container__main-content">
            <h1>Idols</h1>
            <p className="filter-count-text italic">
              Displaying {members.length} members...
            </p>
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
        </div>
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
