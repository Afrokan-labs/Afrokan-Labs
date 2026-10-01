import { services, servicesIntro } from "@/content/services";
import shared from "@/styles/shared.module.css";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section id="services" className={`${shared.section} ${shared.gray}`} aria-labelledby="services-title">
      <div className={`${shared.container} ${shared.split}`}>
        <div className={`${shared.splitHead} ${styles.head}`}>
          <h2 id="services-title" className={shared.h2}>
            {servicesIntro.title}
          </h2>
          <p className={shared.muted}>{servicesIntro.body}</p>
        </div>
        <ul className={styles.list}>
          {services.map((s) => (
            <li key={s.title} className={styles.service}>
              <h3 className={shared.h3}>{s.title}</h3>
              <p>{s.body}</p>
              <p className={styles.examples}>{s.examples}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
