import React from 'react';
import * as Icon from 'react-feather';
import { useRouter } from 'next/router';
import Button from 'components/button/Button';
import styles from './Navigation2.module.scss';

class Navigation2 extends React.Component {
  constructor(props) {
    super(props);
  }

  render = ()=> {
    const { router } = this.props;

    return (
      <div className={styles.navigation2}>
        <div className={styles.left}>
          <Button 
            round={true}
            icon={Icon.ChevronLeft}
            onClick={()=> router.back()}/>
        </div>
        <div className={styles.right}></div>
      </div>
    )
  }
}

export default (props)=> {
  const router = useRouter();

  return <Navigation2 {...props} 
    router={router}/>
}