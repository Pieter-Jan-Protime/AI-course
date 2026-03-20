import Clock from "./components/Clock/Clock";
import styles from "./App.module.scss";

export default function App() {
  return (
    <main className={styles.layout}>
      <Clock />
    </main>
  );
}
