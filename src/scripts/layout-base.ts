import Lenis, { type LenisOptions } from "lenis"

let lenis: Lenis | null = null

const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

function initLenis(): void {
  lenis = new Lenis({
    duration: 1.2,
    easing: LENIS_EASING,
    smooth: true,
  } as LenisOptions)

  function raf(time: number) {
    if (lenis) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
  }

  requestAnimationFrame(raf)
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLenis)
  } else {
    initLenis()
  }
}
