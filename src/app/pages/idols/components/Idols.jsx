import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Import components
import IdolsFilters from './IdolsFilters';
import IdolsEdit from './IdolsEdit';
// Import common components
import {
  Icon,
  Loading,
  MemberCard,
  PageTitle,
  RequirementWrapper,
} from '../../../common';
// Import utils
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
      sidePanel: null,
      editingMember: {},
    };

    this.openPanel = this.openPanel.bind(this);
    this.toggleMemberEditing = this.toggleMemberEditing.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.updateMember = this.updateMember.bind(this);
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
    if (
      prevProps.db.members.length !== this.props.db.members.length ||
      (prevProps.app.isLoading === true && this.props.app.isLoading === false)
    ) {
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
      age: formState.values.age || this.state.filters.age,
      color: formState.values.color || this.state.filters.color,
      favorite: formState.values.favorite || this.state.filters.favorite,
      gender: formState.values.gender || this.state.filters.gender,
      name: formState.values.name || this.state.filters.name,
      nationality:
        formState.values.nationality || this.state.filters.nationality,
      position: formState.values.position || this.state.filters.position,
      privacy: formState.values.privacy || this.state.filters.privacy,
      sort: formState.values.sort || this.state.filters.sort,
      order: formState.values.order || this.state.filters.order,
      showIds: formState.values.showIds || this.state.filters.showIds,
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

  toggleMemberEditing(member) {
    const editingMember = { ...member };
    editingMember.birthdate = utils.parseBirthdateToInput(member.birthdate);

    this.setState(
      {
        editingMember,
        sidePanel: null,
      },
      () => {
        if (this.state.sidePanel !== 'edit') {
          this.setState({ sidePanel: 'edit' });
        }
      }
    );
  }

  updateMember(formValues) {
    const member = { ...this.state.editingMember, ...formValues };

    this.props.updateMember(member);

    this.setState({
      editingMember: {},
      sidePanel: null,
    });
  }

  render() {
    const {
      app: { pending },
      auth: { isAdmin, user },
      updateFavoriteMembers,
    } = this.props;

    const { editingMember, filters, members, sidePanel } = this.state;

    if (pending.REQUEST_MEMBERS || pending.INITIALIZER || pending.RUN_AUTH) {
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
          <IdolsEdit
            isExpanded={sidePanel === 'edit'}
            editingMember={editingMember}
            openPanel={this.openPanel}
            updateMember={this.updateMember}
          />
          <aside className="side-panel-vertical-buttons">
            <button
              className="side-panel-vertical-buttons__button"
              onClick={() => this.openPanel('filters')}
            >
              <Icon type="filter" />
            </button>
            {isAdmin && (
              <button
                className="side-panel-vertical-buttons__button"
                onClick={() => this.openPanel('edit')}
              >
                <Icon type="edit" />
              </button>
            )}
          </aside>
          <main className="container__main-content">
            <PageTitle title="Idols" />
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
                  editMember={this.toggleMemberEditing}
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
  updateMember: PropTypes.func.isRequired,
};

export default Idols;
