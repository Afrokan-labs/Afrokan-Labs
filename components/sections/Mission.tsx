import { mission } from "@/content/home";
import shared from "@/styles/shared.module.css";
import styles from "./Mission.module.css";

export function Mission() {
  return (
    <section className={`${shared.section} ${shared.dark}`} aria-labelledby="mission-title">
      {/* DESIGN: soft green gradient streak behind the mission statement (originally .hero-streak--soft). */}
      <div className={`${shared.container} ${styles.inner}`}>
        <h2 id="mission-title" className={styles.title}>
          {mission.title}
        </h2>
        <p className={`${shared.mutedDark} ${styles.body}`}>{mission.body}</p>
      </div>
    </section>
  );
}
