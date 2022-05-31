import React from 'react';
import auth from 'auth';
import SignInForm from 'components/form/SignInForm';
import FormLayout1 from 'components/layout/FormLayout1';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    return (
      <FormLayout1>
        <SignInForm/>
      </FormLayout1>
    )
  }
}

export default SignIn;

export const getServerSideProps = auth.check();