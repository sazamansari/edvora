import styles from "../../styles/BodyItem.module.css";
import Image from "next/image";
import { getStationPath } from "../util";

function BodyItem({ ride }) {
  return (
    <div className={styles.container}>
      <div>
        <Image
          unoptimized={true}
          className={styles.map}
          width={290}
          height={160}
          src={ride.map_url}
        />
      </div>
      <div className={styles.rideinfo}>
        <div className={styles.ridedata}>
          <span>Ride Id : </span>
          {ride.id}
        </div>
        <div className={styles.ridedata}>
          <span>Origin Station : </span>
          {ride.origin_station_code}
        </div>
        <div className={styles.ridedata}>
          <span>station_path : </span>
          {getStationPath(ride)}
        </div>
        <div className={styles.ridedata}>
          <span>Date : </span>
          {ride.date}
        </div>
        <div className={styles.ridedata}>
          <span>Distance : </span>
          {ride.distance}
        </div>
      </div>
      <div className={styles.place}>
        <span className={styles.city}>{ride.city}</span>
        <span>{ride.state}</span>
      </div>
    </div>
  );
}

export default BodyItem;
