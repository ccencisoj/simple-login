import React from 'react';
import auth from 'auth';
import ProfileLayout1 from 'components/layout/ProfileLayout1';
import ProfileInfo1 from 'components/profileInfo/ProfileInfo1';
import ProfileHeader1 from 'components/profileHeader/ProfileHeader1';
import ProfileContainer1 from 'components/profileContainer/ProfileContainer1';
import { connect } from 'react-redux';
import { 
  LOAD_USER, 
  LOAD_PROFILE 
} from 'contants/actionTypes';
import agent from 'agent';

const mapActionsToProps = (dispatch)=> ({
  loadUser: (user)=> dispatch({
    type: LOAD_USER,
    payload: user
  }),
  loadProfile: (profile)=> dispatch({
    type: LOAD_PROFILE,
    payload: profile
  })
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = ()=> {
    const { user, loadUser, loadProfile } = this.props;

    loadUser(user);

    agent.Profile.current().then((response)=> {
      loadProfile(response.profile);
    });
  }

  render = ()=> {
    return (
      <ProfileLayout1>
        <ProfileContainer1>
          <ProfileHeader1/>
          <ProfileInfo1/>
        </ProfileContainer1>
      </ProfileLayout1>
    )
  }
}

export default connect(
  null, mapActionsToProps)(Profile);

export const getServerSideProps = auth.required();