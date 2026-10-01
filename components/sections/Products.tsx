import { Mark } from "@/components/Mark";
import { products, productsIntro } from "@/content/products";
import shared from "@/styles/shared.module.css";
import styles from "./Products.module.css";

export function Products() {
  return (
    <section id="products" className={`${shared.section} ${shared.gray}`} aria-labelledby="products-title">
      <div className={shared.container}>
        <div className={`${shared.splitHead} ${styles.head}`}>
          <h2 id="products-title" className={shared.h2}>
            {productsIntro.title}
          </h2>
          <p className={shared.muted}>{productsIntro.body}</p>
        </div>

        <div className={styles.grid}>
          {products.map((p) =>
            p.comingSoon ? (
              <article key={p.name} className={`${styles.product} ${styles.soon}`}>
                <Mark className={styles.soonMark} />
                <h3 className={shared.h3}>{p.name}</h3>
                <p className={shared.muted}>{p.body}</p>
              </article>
            ) : (
              <article key={p.name} className={`${styles.product} ${shared.dark}`}>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={shared.mutedDark}>{p.body}</p>
                {p.link && (
                  <a href={p.link.href} className={shared.link}>
                    {p.link.label}
                  </a>
                )}
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
