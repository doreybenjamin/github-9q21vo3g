const runContactReveal = async () => {
  const section = document.querySelector("#contact")
  if (!section) return

  const gsapModule = await import("gsap")
  const scrollTriggerModule = await import("gsap/ScrollTrigger")
  const gsap = gsapModule.gsap
  const ScrollTrigger = scrollTriggerModule.ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)

  const contactTitle = section.querySelector(".contact_title")
  const contactSpan = contactTitle?.querySelector("span")
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (contactSpan && !prefersReducedMotion) {
    gsap.to(contactTitle, {
      "--contact-reveal": "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
    })
  } else if (contactTitle) {
    gsap.set(contactTitle, { "--contact-reveal": "100%" })
  }
}

document.addEventListener("DOMContentLoaded", runContactReveal)
