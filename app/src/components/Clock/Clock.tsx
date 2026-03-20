import { useCurrentTime } from "../../hooks/useCurrentTime";
import styles from "./Clock.module.scss";

export default function Clock() {
  const time = useCurrentTime();
  return <time className={styles.clock}>{time}</time>;
}
