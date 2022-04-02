import styles from "../../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";

function Navbar({ user }) {
  return (
    <div className={styles.nav}>
      <div className={styles.name}>
        <Link href="/">Edvora</Link>
      </div>
      <div className={styles.user}>
        <span className={styles.username}>{user.name}</span>
        <Image
          unoptimized={true}
          height={44}
          width={44}
          src={user.url}
          className={styles.userimage}
        />
      </div>
    </div>
  );
}

export default Navbar;
