import styles from "./SessionHeader.module.css";
import { Link } from "react-router-dom";

function SessionHeader() {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img className={styles.fav} src="favicon.png" />
          <a className={styles.aTag} href="/">
            Y-BOX
          </a>
        </div>
        <span className={styles.sessionTitle}>session title</span>
        <li className={styles.menu}>
          <img className={styles.img} src="participant.png" />
          <img className={styles.img} src="user.png" />
          <img className={styles.img} src="enlarge.png" />
          <Link to="/result">
            <button className={styles.end}>✕ End Session</button>
          </Link>
        </li>
      </div>
      <hr style={{ border: "1px solid", margin: 0 }} />
    </div>
  );
}

export default SessionHeader;
