import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'informed';

// Import components
import ManageArtist from './ManageArtist';
import ManageUnit from './ManageUnit';
import ManageMembers from './ManageMembers';
// Import common components
import { RequirementWrapper } from '../../../common';
import utils from '../../../../utils';

class Manage extends Component {
  constructor() {
    super();
    this.state = {
      artistId: null,
      validArtist: false,
      unittId: null,
      validUnit: false,
    };

    this.validateArtist = this.validateArtist.bind(this);
    this.validateUnit = this.validateUnit.bind(this);
    this.validateMembers = this.validateMembers.bind(this);
  }

  componentDidMount() {
    this.props.loadArtists();
    this.props.loadColors();
    this.props.loadMembers();
  }

  validateArtist(event) {
    const { value } = event.target;
    const dict = this.props.admin.artistsTypeaheadDict;
    if (dict[value]) {
      this.setState({ artistId: dict[value], validArtist: true });
    } else {
      this.setState({ artistId: null, validArtist: false });
    }
  }

  validateUnit(event) {
    const { value } = event.target;
    const dict = this.props.admin.unitsTypeaheadDict;
    if (dict[value]) {
      this.setState({ unitId: dict[value], validUnit: true });
    } else {
      this.setState({ unitId: null, validUnit: false });
    }
  }

  validateMembers(event) {
    const { value } = event.target;
    const dict = this.props.admin.membersTypeaheadDict;
    if (dict[value]) {
      this.setState({ memberId: dict[value], validMember: true });
    } else {
      this.setState({ memberId: null, validMember: false });
    }
  }

  render() {
    const {
      admin: { editingArtist, editingMembers, editingUnit },
      updateManageForm,
      unlockUnit,
      unlockMembers,
    } = this.props;

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
      });
    }

    return (
      <RequirementWrapper requirements={['manage']}>
        <main className="container container--manage">
          <h1>Manage</h1>
          <p>
            A complete group is required to save with ONE Artist, ONE Unit, and
            at least TWO members (no solo artists)
          </p>

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
                  />
                </div>
                <div className="manage-form-nav">
                  <button
                    className="btn"
                    onClick={() => console.log(formState)}
                  >
                    Reset
                  </button>
                  <button
                    className="btn"
                    onClick={() => console.log(formState)}
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

Manage.propTypes = {};

Manage.defaultProps = {};

export default Manage;
