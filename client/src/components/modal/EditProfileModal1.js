import * as yup from 'yup';
import agent from 'agent';
import React from 'react';
import { Formik } from 'formik';
import Field from 'components/Field';
import { connect } from 'react-redux';
import types from 'contants/validationTypes';
import Button from 'components/button/Button';
import { UPDATE_PROFILE } from 'contants/actionTypes';
import styles from './EditProfileModal1.module.scss';
import ModalBase1 from 'components/modalBase/ModalBase1';
import ActionsFooter1 from 'components/actionsFooter/ActionsFooter1';
import FieldsContainer1 from 'components/fieldsContainer/FieldsContainer1';

const mapStateToProps = (store)=> ({
  profile: store.common.profile
});

const mapActionsToProps = (dispatch)=> ({
  updateProfile: (values)=> dispatch({
    type: UPDATE_PROFILE,
    payload: values
  })
});

const validationSchema = yup.object({
  username: types.Username,
  email: types.Email
});

class EditProfileModal1 extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = async (data)=> {   
    const { updateProfile, hideModal } = this.props;
    
    const response = await agent.Profile.update({
      username: data.username,
      email: data.email
    });

    updateProfile(response.profile);
    hideModal(300);
  }

  render = ()=> {
    const { 
      willHiddenModal, 
      hideModal, 
      profile 
    } = this.props;

    console.log(profile);

    return (
      <Formik
        initialValues={{
          username: profile.username,
          email: profile.user.email
        }}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}>
        {({
          errors,
          values,
          touched,
          handleBlur,
          handleChange,
          isSubmitting,
          handleSubmit
        })=> (
          <ModalBase1 
            title="Editar datos basicos"
            willHiddenModal={willHiddenModal}
            hideModal={hideModal}
            verticalPadding={true}>
            <form className={styles.form} 
              onSubmit={handleSubmit}>
              <FieldsContainer1>
                <Field 
                  value={values.username}
                  error={touched.username ? errors.username : ""}
                  name="username"
                  expand={true}
                  label="Nombre"
                  placeholder="Nombre de usuario"
                  onBlur={handleBlur}
                  onChange={handleChange}/>
                <Field 
                  value={values.email}
                  error={touched.email ? errors.email : ""}
                  name="email"
                  expand={true}
                  label="Correo"
                  placeholder="Correo electronico"
                  onBlur={handleBlur}
                  onChange={handleChange}/>
              </FieldsContainer1>
              <ActionsFooter1>
                <Button
                  loading={isSubmitting}
                  type="submit"
                  expand={true}
                  primary={true}
                  label="Guardar cambios"/>
                <Button
                  expand={true}
                  secundary={true}
                  label="Cancelar"
                  onClick={()=> hideModal(300)}/>
              </ActionsFooter1>
            </form>
          </ModalBase1>
        )}
      </Formik>
    )
  }
}

export default connect(
  mapStateToProps, mapActionsToProps)(EditProfileModal1);