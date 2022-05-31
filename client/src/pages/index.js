import auth from 'auth';

export {default} from './signIn';

export const getServerSideProps = auth.check();