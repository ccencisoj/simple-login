import React from 'react';
import agent from 'agent';
import * as yup from 'yup';
import { Formik } from 'formik';
import Field from 'components/Field';
import { useRouter } from 'next/router';
import types from 'contants/validationTypes';
import Button from 'components/button/Button';
import styles from './SignInForm.module.scss';
import FormHeader1 from 'components/formHeader/FormHeader1';
import FormContainer1 from 'components/formContainer/FormContainer1';
import ActionsFooter1 from 'components/actionsFooter/ActionsFooter1';
import FieldsContainer1 from 'components/fieldsContainer/FieldsContainer1';

const validationSchema = yup.object({
  email: types.Email,
  password: types.Password
});

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = async (data, {setStatus})=> {
    const { router } = this.props;
    let response = null;

    response = await agent.User.login(data);

    if(response.error) 
      return setStatus({error: response.error.message});

    router.push("/profile");
  }

  render = ()=> {
    const { router } = this.props;

    return (
      <Formik 
        initialValues={{
          email: "",
          password: ""
        }}
        initialStatus={{
          error: ""
        }}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}>
        {({
          values,
          errors,
          touched,
          status,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        })=> (
          <FormContainer1>
            <form className={styles.sign_in_form} 
              onSubmit={handleSubmit}>
              <FormHeader1 
                title="Iniciar session" 
                sentence="Hola, ingresa tu correo y 
                contraseña para continuar"
                error={status.error}/>
              <FieldsContainer1>
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
                  loading={isSubmitting}
                  type="submit"
                  expand={true}
                  primary={true}
                  label="Continuar"/>
                <Button 
                  expand={true}
                  secundary={true}
                  label="Crear cuenta"
                  onClick={()=> router.push("/signUp")}/>
              </ActionsFooter1>
            </form>
          </FormContainer1>
        )}
      </Formik>
    )
  }
}

export default (props)=> {
  const router = useRouter();

  return <SignInForm {...props} 
    router={router}/>
}