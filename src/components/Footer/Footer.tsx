import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.credits} data-gfe-screenshot-exclude='true'>
      A challenge by
      <a href='https://www.greatfrontend.com/projects?ref=challenges' target='_blank'>
        GreatFrontEnd Projects
      </a>
      . Built by
      <a href='https://www.greatfrontend.com/projects/u/rockethell' target='_blank'>
        Rockethell
      </a>
      .
    </footer>
  );
};

export default Footer;
