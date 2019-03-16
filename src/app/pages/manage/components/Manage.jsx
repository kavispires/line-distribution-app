import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'informed';

// Import components
import ColorReferenceBar from './ColorReferenceBar';
import ManageArtist from './ManageArtist';
import ManageUnit from './ManageUnit';
import ManageMembers from './ManageMembers';
// Import common components
import { RequirementWrapper, Loading, Icon } from '../../../common';
// Import utility functions
import utils from '../../../../utils';

class Manage extends Component {
  constructor() {
    super();
    this.state = {
      artistId: null,
      validArtist: false,
      unitId: null,
      validUnit: false,
      memberId: null,
      validMember: false,
    };

    this.handleEditMemberAndState = this.handleEditMemberAndState.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.validateArtist = this.validateArtist.bind(this);
    this.validateUnit = this.validateUnit.bind(this);
    this.validateMembers = this.validateMembers.bind(this);
  }

  componentDidMount() {
    console.log('HERE');
    this.props.loadArtists();
    this.props.loadColors();
    this.props.loadMembers();
  }

  validateArtist(event) {
    const { value } = event.target;
    const dict = this.props.db.artistsTypeaheadDict;
    if (dict[value]) {
      this.setState({ artistId: dict[value], validArtist: true });
    } else {
      this.setState({ artistId: null, validArtist: false });
    }
  }

  validateUnit(event) {
    const { value } = event.target;
    const dict = this.props.db.unitsTypeaheadDict;
    if (dict[value]) {
      this.setState({ unitId: dict[value], validUnit: true });
    } else {
      this.setState({ unitId: null, validUnit: false });
    }
  }

  validateMembers(event) {
    const { value } = event.target;
    const dict = this.props.db.membersTypeaheadDict;
    if (dict[value]) {
      this.setState({ memberId: dict[value], validMember: true });
    } else {
      this.setState({ memberId: null, validMember: false });
    }
  }

  handleEditMemberAndState(memberId, formState) {
    if (memberId) {
      this.setState({ memberId: null, validMember: false });
    }
    this.props.handleEditMember(memberId, formState);
  }

  resetAll() {
    this.setState({
      artistId: null,
      validArtist: false,
      unitId: null,
      validUnit: false,
      memberId: null,
      validMember: false,
    });
    this.props.resetManage();
  }

  render() {
    const {
      app: { pending },
      admin: {
        colorsInUse,
        editingArtist,
        editingMembers,
        editingUnit,
        manageResult,
      },
      db: { colors },
      handleResyncDB,
      saveManage,
      updateManageForm,
      unlockUnit,
      unlockMembers,
    } = this.props;

    const isSaveable =
      Object.keys(editingArtist).length &&
      Object.keys(editingUnit).length &&
      editingMembers.length;

    // Build default values for form
    const defaultValues = {
      artist: {
        name: undefined,
        otherNames: undefined,
        genre: undefined,
        private: undefined,
      },
      unit: {
        debutYear: undefined,
        name: undefined,
        official: undefined,
        private: undefined,
      },
      members: [],
    };

    if (editingArtist && editingArtist.id) {
      defaultValues.artist = {
        name: editingArtist.name,
        otherNames: editingArtist.otherNames,
        genre: editingArtist.genre,
        private: editingArtist.private,
      };
    }

    if (editingUnit && editingUnit.id) {
      defaultValues.unit = {
        debutYear: editingUnit.debutYear,
        name: editingUnit.name,
        official: editingUnit.official,
        private: editingUnit.private,
      };
    }

    if (editingMembers.length) {
      editingMembers.forEach(member => {
        if (member) {
          defaultValues.members.push({
            colorId: member.colorId || undefined,
            gender: member.gender || undefined,
            initials: member.initials || undefined,
            name: member.name || undefined,
            nationality: member.nationality || undefined,
            private: member.private || undefined,
            referenceArtist: member.referenceArtist || undefined,
            birthdate: member.birthdate
              ? utils.spiralBirthdate(member.birthdate)
              : undefined,
            ...utils.makePositionsEditable(member.positions || []),
          });
        } else {
          defaultValues.members.push(null);
        }
      });
    }

    // If database is still loading
    if (
      pending.REQUEST_ARTISTS ||
      pending.REQUEST_COLORS ||
      pending.REQUEST_MEMBERS
    ) {
      return <Loading message="Preparing manage..." />;
    }

    // If database is being resynced
    if (pending.RESYNC_DATABASE) {
      return <Loading message="Resyncing database..." />;
    }

    // If save is in progress
    if (pending.UPDATE_COMPLETE_ARTIST) {
      return <Loading message="Saving..." />;
    }

    // If save is in progress
    if (manageResult === 'SUCCESS') {
      return (
        <main className="container container--manage">
          <h1>Manage</h1>
          <div className="manage-section--manage-success">
            <Icon type="check" color="green" size={96} />
            <p>Complete Artists Successfully Created/Updated</p>
            <button className="btn" onClick={this.resetAll}>
              Create New Artist
            </button>
          </div>
        </main>
      );
    }

    return (
      <RequirementWrapper>
        <main className="container container--manage">
          <h1>Manage</h1>
          <button className="btn btn-resync-db" onClick={handleResyncDB}>
            Resync Database
          </button>
          <p>
            A complete group is required to save with ONE Artist, ONE Unit, and
            at least TWO members (no solo artists)
          </p>
          <ColorReferenceBar colors={colors} colorsInUse={colorsInUse} />
          <Form
            onChange={formState => updateManageForm(formState)}
            autoComplete="off"
            className="manage-section"
          >
            {({ formState }) => (
              <Fragment>
                <div className="manage-form">
                  <ManageArtist
                    formState={formState}
                    props={this.props}
                    validateTypeahead={this.validateArtist}
                    isValid={this.state.validArtist}
                    artistId={this.state.artistId}
                    defaultValues={defaultValues.artist}
                    next={unlockUnit}
                  />
                  <ManageUnit
                    formState={formState}
                    props={this.props}
                    validateTypeahead={this.validateUnit}
                    isValid={this.state.validUnit}
                    unitId={this.state.unitId}
                    defaultValues={defaultValues.unit}
                    next={unlockMembers}
                  />
                  <ManageMembers
                    formState={formState}
                    props={this.props}
                    defaultValues={defaultValues.members}
                    validateTypeahead={this.validateMembers}
                    isValid={this.state.validMember}
                    memberId={this.state.memberId}
                    colorsInUse={colorsInUse}
                    handleEditMember={this.handleEditMemberAndState}
                  />
                </div>
                <div className="manage-form-nav">
                  <button className="btn" onClick={() => this.resetAll()}>
                    Reset
                  </button>
                  <button
                    className="btn"
                    onClick={() => saveManage(formState)}
                    disabled={!isSaveable}
                  >
                    Save
                  </button>
                </div>
              </Fragment>
            )}
          </Form>
        </main>
      </RequirementWrapper>
    );
  }
}

Manage.propTypes = {
  admin: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired,
  loadArtists: PropTypes.func.isRequired,
  loadColors: PropTypes.func.isRequired,
  loadMembers: PropTypes.func.isRequired,
  handleEditMember: PropTypes.func.isRequired,
  handleResyncDB: PropTypes.func.isRequired,
  resetManage: PropTypes.func.isRequired,
  saveManage: PropTypes.func.isRequired,
  updateManageForm: PropTypes.func.isRequired,
  unlockMembers: PropTypes.func.isRequired,
  unlockUnit: PropTypes.func.isRequired,
};

Manage.defaultProps = {};

export default Manage;
