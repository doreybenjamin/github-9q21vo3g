import Lenis, { type LenisOptions } from "lenis"

let lenis: Lenis | null = null

const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

let scrollTriggerUpdate: (() => void) | null = null
let scrollTriggerRefresh: (() => void) | null = null

function initScrollTriggerSync(): void {
  void import("gsap").then(({ gsap }) =>
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger)
      scrollTriggerUpdate = () => ScrollTrigger.update()
      scrollTriggerRefresh = () => ScrollTrigger.refresh()
      ScrollTrigger.refresh()
    })
  )
}

function initLenis(): void {
  lenis = new Lenis({
    duration: 1.2,
    easing: LENIS_EASING,
    smooth: true,
  } as LenisOptions)

  initScrollTriggerSync()

  function raf(time: number) {
    if (lenis) {
      lenis.raf(time)
      scrollTriggerUpdate?.()
      requestAnimationFrame(raf)
    }
  }

  requestAnimationFrame(raf)
}

function initLenisAnchors(): void {
  const initAnchors = () => {
    const anchorsHash = document.querySelectorAll('a[href^="#"]')
    const anchorsRelative = document.querySelectorAll('a[href*="#"]')
    const uniqueAnchors = [...new Set([...anchorsHash, ...anchorsRelative])]

    uniqueAnchors.forEach((anchor) => {
      if (anchor.hasAttribute("data-lenis-initialized")) return
      anchor.setAttribute("data-lenis-initialized", "true")

      anchor.addEventListener("click", async function (e: Event) {
        try {
          const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href") ?? ""
          if (!href) return

          const isInternalLink =
            href.startsWith("#") ||
            href.startsWith("/#") ||
            (href.includes("#") && href.split("#")[0] === window.location.pathname)
          if (!isInternalLink) return

          e.preventDefault()
          const hash = href.includes("#") ? href.split("#")[1] : href.replace(/^.*#/, "")
          if (!hash.trim()) return

          const selector = `#${hash}`
          lenis?.scrollTo(selector, {
            duration: 1.2,
            easing: LENIS_EASING,
          })
        } catch (error) {
          console.warn("Anchor scroll error:", error)
        }
      })
    })
  }

  setTimeout(initAnchors, 250)

  let scrollTimeout: ReturnType<typeof setTimeout> | null = null
  const handleResize = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      if (lenis) {
        lenis.resize()
        scrollTriggerRefresh?.()
      }
    }, 150)
  }

  window.addEventListener("resize", handleResize, { passive: true })
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initLenis()
      initLenisAnchors()
    })
  } else {
    initLenis()
    initLenisAnchors()
  }
}
