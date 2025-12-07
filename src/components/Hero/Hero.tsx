import Link from "next/link"
import css from "./Hero.module.css"

export default function Hero() {
  return (
    <>
      <section className={css.section}>
        <div className="container">
          <div className={css.containerWrapper}>
            <h1 className={css.title}>Camper of your dream</h1>
            <h2 className={css.subTitle}>You can find everything you want in our catalog</h2>
            <Link href="/catalog" className={css.button}>View now</Link>
          </div>
        </div>
      </section>
    </>
  )
}