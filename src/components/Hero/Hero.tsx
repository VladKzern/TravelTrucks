import css from "./Hero.module.css"

export default function Hero() {
  return (
    <>
      <section className={css.section}>
        <div className="container">
          <h1>Camper of your dream</h1>
          <h2>You can find everything you want in our catalog</h2>
        </div>
      </section>
    </>
  )
}