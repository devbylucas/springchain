import Spring from "./spring.class.js"

// Ensure the code is executed when the library is imported
;(function () {
  if (!Element.prototype.springState) {
    Element.prototype.springState = { x: 0, y: 0, scale: 1, rotate: 0 }
    Element.prototype.springInstances = {}
    Element.prototype.animationQueue = []

    Element.prototype.enqueueAnimation = function (animation, delay = 0) {
      this.animationQueue.push(() => {
        return new Promise((resolve) => setTimeout(resolve, delay)).then(animation)
      })

      if (this.animationQueue.length === 1) {
        this.dequeueAndRunNextAnimation()
      }
    }

    Element.prototype.dequeueAndRunNextAnimation = function () {
      if (this.animationQueue.length === 0) return

      const nextAnimation = this.animationQueue[0]
      nextAnimation().then(() => {
        this.animationQueue.shift()
        this.dequeueAndRunNextAnimation()
      })
    }

    Element.prototype.motion = function (animateProps) {
      const { spring, delay = 0, ...keyframes } = animateProps

      this.enqueueAnimation(() => {
        if (spring) {
          const promises = Object.keys(keyframes).map((property) => {
            if (!this.springInstances[property]) {
              this.springInstances[property] = new Spring(spring.stiffness, spring.damping, spring.mass)
            }
            const targetValue = keyframes[property]
            const initialPosition = this.springState[property] || 0
            return this.springInstances[property].start(targetValue, initialPosition, (value) => {
              this.springState[property] = value

              if (["x", "y", "scale", "rotate"].includes(property)) {
                let transformString = ""
                if (this.springState.x !== undefined) transformString += `translateX(${this.springState.x}px) `
                if (this.springState.y !== undefined) transformString += `translateY(${this.springState.y}px) `
                if (this.springState.scale !== undefined) transformString += `scale(${this.springState.scale}) `
                if (this.springState.rotate !== undefined) transformString += `rotate(${this.springState.rotate}deg) `
                this.style.transform = transformString.trim()
              } else {
                this.style[property] = value + (typeof targetValue === "number" ? "px" : "")
              }
            })
          })

          return Promise.all(promises)
        } else {
          const formattedKeyframes = {}
          Object.keys(keyframes).forEach((property) => {
            const value = keyframes[property]
            if (property === "rotate") {
              formattedKeyframes[property] = `${value}deg`
            } else if (property === "scale") {
              formattedKeyframes[property] = value
            } else {
              formattedKeyframes[property] = value + (typeof value === "number" ? "px" : "")
            }
          })

          return new Promise((resolve) => {
            this.animate(formattedKeyframes, {
              duration: 1000,
              iterations: 1,
              fill: "forwards",
              easing: "ease-in-out",
            }).onfinish = resolve
          })
        }
      }, delay)

      return this // enable chaining
    }

    Element.prototype.stopMotion = function () {
      this.animationQueue = [] // Clear the animation queue
      // Stop any ongoing spring animations
      {
        Object.keys(this.springInstances).forEach((property) => {
          if (this.springInstances[property].running) {
            this.springInstances[property].running = false
          }
        })

        // reset original element
        this.removeAttribute("style")
        // remove all Web Animations API animations
        this.getAnimations().forEach((animation) => animation.cancel())
      }

      // Reset spring state to initial values
      this.springState = { x: 0, y: 0, scale: 1, rotate: 0 }

      return this
    }
  }
})()
