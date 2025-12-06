import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.containerWrapper}>
          <Link href="/" aria-label="home" className={css.logoLink}>
          <svg width={136} height={16} aria-hidden="true">
             <use href="/symbol-defs.svg#logo"></use>
          </svg>
        </Link>

        <div className={css.navСontainer}>
          <nav className={css.navList}>
            <ul className={css.list}>
              <li className={css.listItem}>
                <Link href="/" className={css.listItemLink}>Home</Link>
              </li>
              <li className={css.listItem}>
                <Link href="/Catalog" className={css.listItemLink}>Catalog</Link>
              </li>
            </ul>
          </nav>
        </div>
        </div>
      </div>
    </section>
  )
}