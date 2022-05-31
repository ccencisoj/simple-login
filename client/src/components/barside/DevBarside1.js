import React from 'react';
import agent from 'agent';
import { nanoid } from 'nanoid';
import { connect } from 'react-redux';
import * as Icon from 'react-feather';
import { useRouter } from 'next/router';
import Button from 'components/button/Button';
import styles from './DevBarside1.module.scss';
import { useViewport } from 'hooks/ViewportContext';
import { DEV_SECTION_AVATARS } from 'contants/commons';
import { HIDE_BARSIDE } from 'contants/actionTypes';
import { DevBarsideItem1 } from 'components/barsideItem';
import { useNotifications } from 'hooks/NotificationsContext';
import { NotificationCard1 } from 'components/notificationCard';

const mapActionsToProps = (dispatch)=> ({
  hideBarside: ()=> dispatch({
    type: HIDE_BARSIDE
  })
});

class DevBarside1 extends React.Component {
  constructor(props) {
    super(props);
    this.items = [
      {
        id: nanoid(),
        icon: Icon.Image,
        label: "Avatars",
        section: DEV_SECTION_AVATARS
      }
    ];
  }

  closeSession = async ()=> {
    const { router, notifications } = this.props;
    const response = await agent.User.logout();

    if(response.error)
      return notifications.add(NotificationCard1, {
        type: "error",
        message: `Ha ocurrido un error, 
        no se pudo cerrar sesion`
      });

    router.push("/signIn");
  }

  render = ()=> {
    const { hideModal, viewport } = this.props;

    return (
      <div className={styles.dev_barside1}>
        <div className={styles.header}>
          <div className={styles.title_container}>
            <p className={styles.title}>Dev.</p>
          </div>
          {!(viewport.isDesktop) &&
          <Button 
            blackColor={true}
            lightBackground={true}
            icon={Icon.ChevronLeft}
            onClick={()=> hideModal(300)}/>}
        </div>
        <div className={styles.main}>
          {this.items.map((item, index)=> 
            <DevBarsideItem1 key={item.id} {...item}
              index={index}/>)}
        </div>
        <div className={styles.footer}>
          <Button 
            expand={true}
            primary={true}
            label="Cerrar sesion"
            onClick={this.closeSession}/>
        </div>
      </div>
    )
  }
}

const ConnectedDevBarside1 =  connect(
  null, mapActionsToProps)(DevBarside1);

export default (props)=> {
  const viewport = useViewport();
  const router = useRouter();
  const notifications = useNotifications();

  return <ConnectedDevBarside1 {...props}
    viewport={viewport}
    router={router}
    notifications={notifications}/>
}