import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'informed';

// Import components
import ManageArtist from './ManageArtist';
import ManageUnit from './ManageUnit';
import ManageMembers from './ManageMembers';
// Import common components
import { RequirementWrapper } from '../../../common';

class Manage extends Component {
  constructor() {
    super();
    this.state = {
      artistId: null,
      validArtist: false,
    };

    this.validateArtist = this.validateArtist.bind(this);
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
      admin: { editingArtist },
      updateManageForm,
      unlockUnit,
    } = this.props;

    // Build default values for form
    const defaultValues = {
      artist: {
        name: undefined,
        otherNames: undefined,
        genre: undefined,
        private: undefined,
      },
      unit: undefined,
      members: undefined,
    };

    if (editingArtist && editingArtist.id) {
      defaultValues.artist = {
        name: editingArtist.name,
        otherNames: editingArtist.otherNames,
        genre: editingArtist.genre,
        private: editingArtist.private,
      };
    }

    // ?
    const resetArtist = () => {
      console.log('RESET_ARTIST');
    };

    return (
      <RequirementWrapper requirements={['manage']}>
        <main className="container container--artists">
          <h1>Manage</h1>
          <p>
            A complete group is required to save with ONE Artist, ONE Unit, and
            at least TWO members (no solo artists)
          </p>
          <Form
            onChange={formState => updateManageForm(formState)}
            className="manage-section"
            autoComplete="off"
          >
            {({ formState }) => (
              <Fragment>
                <ManageArtist
                  formState={formState}
                  props={this.props}
                  validateTypeahead={this.validateArtist}
                  isValid={this.state.validArtist}
                  artistId={this.state.artistId}
                  defaultValues={defaultValues.artist}
                  next={unlockUnit}
                  back={resetArtist}
                />
                <ManageUnit formState={formState} props={this.props} />
                <ManageMembers formState={formState} props={this.props} />
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
