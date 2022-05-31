import React from 'react';
import agent from 'agent';
import { useRouter } from 'next/router';
import Button from 'components/button/Button';
import styles from './Navigation1.module.scss';
import { useNotifications } from 'hooks/NotificationsContext';
import { NotificationCard1 } from 'components/notificationCard';

class Navigation1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {closingSession: false};
  }

  closeSession = async ()=> {
    const { router, notifications } = this.props;
    let response = null;

    this.setState({closingSession: true});

    response = await agent.User.logout();

    if(response.error) {
      this.setState({closingSession: false});
      return notifications.add(NotificationCard1, {
        type: "error",
        message: `No se ha podido cerrar 
        la session, intentalo nuevamente`
      });
    }

    router.push("/");
  }

  render = ()=> {
    const { closingSession } = this.state;

    return (
      <div className={styles.navigation1}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <Button 
            loading={closingSession}
            primary={true}
            label="Cerrar sesion"
            onClick={this.closeSession}/>
        </div>
      </div>
    )
  }
}

export default (props)=> {
  const notifications = useNotifications();
  const router = useRouter();

  return <Navigation1 {...props}
    router={router}
    notifications={notifications}/>
}