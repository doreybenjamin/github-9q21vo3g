const runFormeHeroDraw = async () => {
  const svg = document.querySelector(".forme-hero")
  if (!svg) return

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const paths = svg.querySelectorAll(".forme-hero__path")

  const gsapModule = await import("gsap")
  const drawSvgPluginModule = await import("gsap/DrawSVGPlugin")
  const gsap = gsapModule.gsap
  const DrawSVGPlugin = drawSvgPluginModule.DrawSVGPlugin
  gsap.registerPlugin(DrawSVGPlugin)

  if (prefersReducedMotion) {
    gsap.set(paths, { drawSVG: "0% 100%" })
    return
  }

  gsap.fromTo(
    paths,
    { drawSVG: "0% 0%" },
    {
      drawSVG: "0% 100%",
      duration: 1.2,
      stagger: 0.12,
      ease: "power2.out",
      delay: 0.4,
    }
  )
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runFormeHeroDraw)
} else {
  runFormeHeroDraw()
}
