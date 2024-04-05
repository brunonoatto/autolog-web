import styles from './styles.module.css';

type TMainProps = {
  children: React.ReactNode;
};

const Main = ({ children }: TMainProps) => {
  return <main className={styles.content}>{children}</main>;
};
export default Main;
