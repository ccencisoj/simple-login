import React, { Fragment } from 'react';
import * as yup from 'yup';
import agent from 'agent';
import { Formik } from 'formik';
import Field from 'components/Field';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import types from 'contants/validationTypes';
import styles from './SignUpForm.module.scss';
import Button from 'components/button/Button';
import { useModals } from 'hooks/ModalsContext';
import { ADD_AVATAR } from 'contants/actionTypes';
import { useStorage } from 'hooks/StorageContext';
import FormHeader1 from 'components/formHeader/FormHeader1';
import { useNotifications } from 'hooks/NotificationsContext';
import { FormNotification1 } from 'components/formNotification';
import LoadingCircle2 from 'components/loading/LoadingCircle2';
import { SelectablesAvatars1 } from 'components/selectablesAvatars';
import FormContainer1 from 'components/formContainer/FormContainer1';
import ActionsFooter1 from 'components/actionsFooter/ActionsFooter1';
import FieldsContainer1 from 'components/fieldsContainer/FieldsContainer1';
import { 
  UPDATE_AVATAR, 
  LOAD_AVATARS,
  REPLACE_AVATAR 
} from 'contants/actionTypes';
import { 
  SIGN_UP_STEP1, 
  SIGN_UP_STEP2, 
  SIGN_UP_STEP3 
} from 'contants/commons';
import { isLocalId } from 'utils/localId';

const validationSchema = yup.object({
  username: types.Username,
  email: types.Email,
  password: types.Password
});

const mapStateToProps = (store)=> ({
  avatars: store.collections.avatars,
  selectedAvatar: store.collections.selectedAvatar
});

const mapDispatchToProps = (dispatch)=> ({
  addAvatar: (avatar)=> dispatch({
    type: ADD_AVATAR,
    payload: avatar
  }),
  
  updateAvatar: (avatarId, values)=> dispatch({
    type: UPDATE_AVATAR,
    payload: [avatarId, values]
  }),

  loadAvatars: (avatars)=> dispatch({
    type: LOAD_AVATARS,
    payload: avatars
  }),

  replaceAvatar: (avatar1, avatar2)=> dispatch({
    type: REPLACE_AVATAR,
    payload: [avatar1, avatar2]
  })
});

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentStep: SIGN_UP_STEP1};
  }

  handleSubmit = async (data, {setStatus, setSubmitting})=> {
    const { selectedAvatar, replaceAvatar, router } = this.props;
    const { currentStep } = this.state;
    let response = null;
    let avatar = {id: selectedAvatar.id};

    setStatus({error: ""});
    setSubmitting(true);
    
    if(currentStep === SIGN_UP_STEP1)
      return this.setState({currentStep: SIGN_UP_STEP2});
    
    if(currentStep === SIGN_UP_STEP2)
      this.setState({currentStep: SIGN_UP_STEP3});

    if(isLocalId(selectedAvatar.id)) {
      response = await agent.Avatar.upload({
        avatar: selectedAvatar.url
      });

      if(response.error)
        return setStatus({error: `Ha ocurrido un error en el 
        servidor, intentalo de nuevo`});
  
      avatar = {
        ...selectedAvatar,
        id: response.avatar.id, 
      };

      replaceAvatar(selectedAvatar, avatar);
    }

    response = await agent.User.create({
      username: data.username,
      email: data.email,
      password: data.password,
      avatar: avatar.id
    });

    if(response.error)
      return setStatus({error: `Ha ocurrido un error en el 
      servidor, intentalo de nuevo`});

    await router.push("/profile");
  }

  render = ()=> {
    const { 
      router, 
      avatars,
      selectedAvatar
    } = this.props;

    const { currentStep } = this.state;

    return (
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: ""
        }}
        initialStatus={{
          error: ""
        }}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}>
        {({
          errors,
          values,
          touched,
          status,
          setStatus,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          
        })=> (
          <FormContainer1 expand={currentStep === SIGN_UP_STEP3}>
            <form className={styles.sign_up_form} 
              onSubmit={handleSubmit}>
              {currentStep === SIGN_UP_STEP1 && 
              <Fragment>
                <FormHeader1 
                  title="Crear cuenta"
                  sentence="Hey!! ingresa los siguientes 
                  datos para crear tu cuenta"/>
                <FieldsContainer1>
                  <Field 
                    expand={true}
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.username ? errors.username : false}
                    placeholder="Nombre de usuario"/>
                  <Field 
                    expand={true}
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.email ? errors.email : false}
                    placeholder="Correo"/>
                  <Field 
                    type="password"
                    expand={true}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.password ? errors.password : false}
                    placeholder="Contraseña"/>
                </FieldsContainer1>
                <ActionsFooter1>
                  <Button 
                    type="submit"
                    expand={true}
                    loading={isSubmitting}
                    primary={true}
                    label="Continuar"/>
                  <Button 
                    expand={true}
                    secundary={true}
                    label="Iniciar sesion"
                    onClick={()=> router.push("/signIn")}/>
                </ActionsFooter1>
              </Fragment>}
              {currentStep === SIGN_UP_STEP2 &&
              <Fragment>
                <FormHeader1 
                  title="Crear cuenta"
                  sentence="Genial, ahora selecciona 
                  un avatar"/>
                <SelectablesAvatars1/>
                <ActionsFooter1>
                  <Button 
                    type="submit"
                    disabled={!Object.values(selectedAvatar).length}
                    expand={true}
                    primary={true}
                    label="Continuar"
                    onClick={()=> this.setState({
                      currentStep: SIGN_UP_STEP2
                    })}/>
                  <Button 
                    expand={true}
                    secundary={true}
                    label="Atras"
                    onClick={()=> this.setState({
                      currentStep: SIGN_UP_STEP1
                    })}/>
                </ActionsFooter1>
              </Fragment>}
              {currentStep === SIGN_UP_STEP3 && !status.error &&
              <Fragment>
                <LoadingCircle2 
                  label="Espera un momento, 
                  estamos creando su cuenta"/>
              </Fragment>}
              {currentStep === SIGN_UP_STEP3 && status.error &&
              <Fragment>
                <FormNotification1 
                  label={status.error}/>    
                <ActionsFooter1>
                  <Button 
                    type="submit"
                    expand={true}
                    primary={true}
                    label="Intentar de nuevo"/>
                  <Button 
                    expand={true}
                    secundary={true}
                    label="Atras"
                    onClick={()=> {
                      setStatus({error: ""}); 
                      this.setState({
                        currentStep: SIGN_UP_STEP2
                      })
                    }}/>
                </ActionsFooter1>           
              </Fragment>}
            </form>
          </FormContainer1>
        )}
      </Formik>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)((props)=> {
    
  const router = useRouter();
  const modals = useModals();
  const storage = useStorage();
  const notifications = useNotifications();

  return <SignUpForm {...props} 
    router={router}
    modals={modals}
    storage={storage}
    notifications={notifications}/>;
})