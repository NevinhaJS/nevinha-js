# NevinhaJS

## What's NevinhaJS?
A component render as [React](https://reactjs.org/)  that goes beyond of static methods and component lifecycles, including state, props,  improving the way you make meaningful animations and providing an amazing experience.


> 🚨 Importants Notes
> - **NevinhaJS uses the virtual DOM as base of  their diff.**
> - **NevinhaJS uses CSS Typed OM API, wich improves arround 30% of the performance of your browser css manipulations. You can see more details in this [google article](https://developers.google.com/web/updates/2018/03/cssom#customprops)**

Actually we're implementing new features and animations to make this framework more powerful and sexy for using it in your projects.


<p align="center">
  <a href="https://github.com/NevinhaJS/nevinha-js"><img src="https://img.shields.io/github/last-commit/NevinhaJS/nevinha-js.svg" alt="GitHub last commit"></a>
  <a href="https://github.com/NevinhaJS/nevinha-js"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="GitHub last commit"></a>
  <a href="https://github.com/NevinhaJS/nevinha-js/"><img src="https://img.shields.io/github/license/NevinhaJS/nevinha-js.svg" alt="License"></a>
</p>
<p align="center">Create components fast for <b>motion</b> animation.</p>


> 🤔 **What's Missing?**
> - Web Animations API
> - Parallax animations
> - Include animations of [All Animation CSS3](http://all-animation.github.io)
> - Unit tests
> - Pre-commit tasks
> - ...

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Examples](https://github.com/NevinhaJS/nevinha-js-examples)
- [License](#license)

## Install
We'll put NevinhaJS in [NPM](https://www.npmjs.com/) as son as possible.

## Usage

With a bundler module as a [rollup](https://rollupjs.org/) or [webpack](https://webpack.js.org/), use:

```javascript
// using ES6 modules
import {NevinhaComponent, render} from 'nevinha-js';

class App extends NevinhaComponent {
  constructor(){
    super();
    this.state.name = "NevinhaJS"
  }

  customEvent(){
    console.log('this is a custom event')
  }

  render() {
    const {name} = this.state;
    const {customEvent} = this.props;

    return (
      <div>
          <SomeNevinhaComponent />

          <AnotherComponent>
            <p>Don't forget to declare this component, because it wasn't declared yet</p>
          </AnotherComponent>

          // Yeah it has some effects inside our architecture,
          // you just need to call the effect name  😉
          <h1 fadeIn>
            <p>Hello! This is the new: {name}</p>
            {name}
          </h1>

          <AnotherComponentWithProps myEvent={customEvent} myProp="anything" />
      </div>
    );
  }
}
```

You can see more details of how to use NevinhaJs in the [Nevinha Js Examples repo](https://github.com/NevinhaJS/nevinha-js-examples)

**We are taking care with the browser animations performance and we are allways following the google developers documentation and developers group to ensure our performance compatibility**

## Contribute

First of all, thank you for your contribution. If you want to contribute, feel free to search for [open issues](../../issues) or our [project roadmap](../..//projects/1), we have a lot of work to do, and of course we'll need you.

### Reporting Issues
Did you find a problem? Do you want a new feature? First check if your problem or idea [has been reported](../../issues).
If there is a [new question](../../issues/new), please be clear and descriptive.

> 🚨 Check issue open and closed.

### Submitting pull requests

Make sure your pull requests are within scope and that you follow the project assumptions.

> 🚨 Submit your pull solipsies with tests if necessary.

-   Fork it!
-   Clone your fork: `git clone https://github.com/<your-username>/NevinhaJS`
-   Navigate to the newly cloned directory: `cd NevinhaJS`
-   Create a new branch for the new feature: `git checkout -b new-feature`
-   Install the tools necessary for development: `yarn`
-   Make your changes.
-   `yarn run build` to verify your change doesn't increase output size.
-   Commit your changes: `git commit -am 'Add new feature'`
-   Push to the branch: `git push origin new-feature`
-   Submit a pull request with full remarks documenting your changes.

## License

[MIT License](LICENSE.md) © NevinhaJS
