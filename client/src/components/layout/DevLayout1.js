import React from 'react';
import { connect } from 'react-redux';
import styles from './DevLayout1.module.scss';
import { useViewport } from 'hooks/ViewportContext';
import DevBarside1 from 'components/barside/DevBarside1';
import DevContainer1 from 'components/devContainer/DevContainer1';
import DevNavigation1 from 'components/navigation/DevNavigation1';

class DevLayout1 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { 
      children, 
      title, 
      viewport
    } = this.props;

    return (
      <div className={styles.dev_layout1}>
        {!(viewport.isDesktop) &&
        <div className={styles.navigation}>
          <DevNavigation1/>
        </div>}
        <div className={styles.row}>
          {(viewport.isDesktop) &&
            <DevBarside1/>}
          <div className={styles.main}>
            <DevContainer1 title={title} 
              expand={!viewport.isDesktop}>
              {children}
            </DevContainer1>
          </div>
        </div>
      </div>
    )
  }
}

const ConnectedDevLayout1 = connect(null, null)(DevLayout1);

export default (props)=> {
  const viewport = useViewport();

  return <ConnectedDevLayout1 {...props}
    viewport={viewport}/>;
}