import React, { Fragment } from 'react';
import auth from 'auth';
import { connect } from 'react-redux';
import DevLayout1 from 'components/layout/DevLayout1';
import { DEV_SECTION_AVATARS } from 'contants/commons';
import { DevAvatarActions1 } from 'components/devActions';
import { ContainerWithTitle1 } from 'components/containerWithTitle';
import { SelectablesAvatars1 } from 'components/selectablesAvatars';

const mapStateToProps = (store)=> ({
  devSection: store.common.devSection
});

class Dev extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { devSection } = this.props;

    return (
      <Fragment>
        {devSection === DEV_SECTION_AVATARS &&
        <DevLayout1 title="Avatars">
          {devSection === DEV_SECTION_AVATARS &&
          <ContainerWithTitle1
            variant="dev"
            title="Selectables avatars"
            actions={DevAvatarActions1}>
            <SelectablesAvatars1 
              variant="dev"/>
          </ContainerWithTitle1>}
        </DevLayout1>}
      </Fragment>
    )
  }
}

const ConnectedDev = connect(
  mapStateToProps, null)(Dev);

export default ConnectedDev;

export const getServerSideProps = auth.requiredDev();