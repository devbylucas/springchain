export default class Spring {
  constructor(stiffness, damping, mass) {
    this.stiffness = stiffness
    this.damping = damping
    this.mass = mass
    this.velocity = 0
    this.position = 0
    this.target = 0
    this.running = false
  }

  start(target, initialPosition, callback) {
    this.position = initialPosition
    this.target = target
    this.running = true
    return new Promise((resolve) => this.animate(callback, resolve))
  }

  animate(callback, resolve) {
    if (!this.running) return

    // why 1/60?
    // https://gafferongames.com/post/fix_your_timestep/

    const deltaTime = 1 / 60 // 60fps
    const force = -this.stiffness * (this.position - this.target)
    const dampingForce = -this.damping * this.velocity
    const acceleration = (force + dampingForce) / this.mass
    this.velocity += acceleration * deltaTime
    this.position += this.velocity * deltaTime

    if (callback) callback(this.position)

    if (Math.abs(this.position - this.target) < 0.01 && Math.abs(this.velocity) < 0.1) {
      this.position = this.target
      this.velocity = 0
      this.running = false
      resolve()
    } else requestAnimationFrame(() => this.animate(callback, resolve))
  }
}
