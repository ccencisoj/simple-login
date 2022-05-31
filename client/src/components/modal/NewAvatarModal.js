import React from 'react';
import Button from 'components/button/Button';
import ModalBase1 from 'components/modalBase/ModalBase1';
import CuttingViewer from 'components/viewer/CuttingViewer';
import ActionsFooter1 from 'components/actionsFooter/ActionsFooter1';

class NewAvatarModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { willHiddenModal, hideModal } = this.props;

    return (
      <ModalBase1 title="Nuevo avatar" 
        willHiddenModal={willHiddenModal} 
        hideModal={hideModal}>
        <CuttingViewer/>
        <ActionsFooter1>
          <Button
            expand={true}
            primary={true}
            label="Crear avatar"/>
          <Button
            expand={true}
            secundary={true}
            label="Elegir otra imagen"/>
        </ActionsFooter1>
      </ModalBase1>
    )
  }
}

export default NewAvatarModal;