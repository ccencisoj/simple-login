import React from 'react';
import auth from 'auth';
import SignUpForm from 'components/form/SignUpForm';
import FormLayout1 from 'components/layout/FormLayout1';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    return (
      <FormLayout1>
        <SignUpForm/>
      </FormLayout1>
    )
  }
}

export default SignUp;

export const getServerSideProps = auth.check();