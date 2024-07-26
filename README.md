# springchain

## Description

This is a simple library that allows you to chain multiple animations together in a Spring-like fashion. It uses Hooke's law to calculate the spring force and the damping force. The library is written in vanilla JavaScript and can be used in any project as long as you include or import the script in your HTML file.

## Installation

To install the library, you can either download the script from the `dist` folder or use the npm package manager to install it. To install the library using npm, run the following command:

```bash
# Using npm package manager
npm install spring-chain

# Using yarn package manager
yarn add spring-chain
```

## Usage

To use the library, you need to include the script in your HTML file or import `import 'spring-chain'` it in your JavaScript file. Here is an example of how you can use the library to chain multiple animations together in vanilla JavaScript:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SpringChain Example</title>
  </head>

  <body>
    <div id="box" style="width: 100px; height: 100px; background-color: red;"></div>

    <script>
      const box = document.getElementById("box")

      // Rotation animation
      box.motion({
        spring: {
          stiffness: 20, // Lower stiffness means more springy
          damping: 5, // Lower damping means more bouncy
          mass: 1, // Lower mass means more bouncy
        },
        rotate: 360, // Rotate 360 degrees
        delay: 500, // Delay (x)ms before starting this animation
      })

      // Scale animation
      box.motion({
        spring: {
          stiffness: 20,
          damping: 5,
          mass: 1,
        },
        scale: 2, // Scale to 2x
      })
    </script>
    <script src="path/to/springChain.umd.js"></script>
  </body>
</html>
```

### Using ES Module Import

Example:

```javascript
import "spring-chain"

// Use the library function
document.querySelector("div").motion({ x: 100, y: 100, scale: 1.5 })
```

## API

The library provides a single method called `motion` that you can use to chain multiple animations together. The `motion` method takes an object as an argument with the following properties:

- `spring`: An object that contains the spring properties such as `stiffness`, `damping`, and `mass`.
- `...keyframes`: The keyframes can be any CSS properties such as `rotate`, `scale`, `x`, `y`, etc.
- `delay`: The delay (in milliseconds) before starting the animation.

Here is an example of how you can use the `motion` method:

```javascript
const box = document.getElementById("box")

box.motion({
  spring: {
    stiffness: 20,
    damping: 5,
    mass: 1,
  },
  rotate: 360,
  delay: 500,
})
```

## Chain API

You can chain multiple animations together by calling the `motion` method multiple times. The library will automatically chain the animations together in a Spring-like fashion. Here is an example of how you can chain multiple animations together:

```javascript
const box = document.getElementById("box")

box
  .motion({
    rotate: 360,
    delay: 500,
  })
  .motion({
    spring: {
      stiffness: 20,
      damping: 5,
      mass: 1,
    },
    scale: 2,
  })
  .motion({
    spring: {
      stiffness: 20,
      damping: 5,
      mass: 1,
    },
    x: 360,
  })
```

## License

This library is licensed under the MIT license. You can find the full license text in the `LICENSE` file.

## Author

This library is created by [Dev ByLucas](https://devbylucas.vercel.app/).

## Contributing

If you would like to contribute to this library, feel free to create a pull request or open an issue on the GitHub repository.
