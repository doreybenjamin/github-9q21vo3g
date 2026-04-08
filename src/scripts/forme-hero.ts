const runFormeHeroDraw = async () => {
    const svg = document.querySelector(".forme-hero")
    if (!svg) return
  
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const paths = svg.querySelectorAll(".forme-hero__path")
  
    if (prefersReducedMotion) return
  
    paths.forEach((path) => {
      path.setAttribute("data-test", "ok")
    })
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runFormeHeroDraw)
  } else {
    runFormeHeroDraw()
  }
  