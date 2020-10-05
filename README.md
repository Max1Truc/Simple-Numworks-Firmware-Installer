# Simple Numworks Firmware Web Installer

Just a simple website to install some custom firmware on your NumWorks.

It is a bit messy, but intended to be understandable to people who want to create a new firmware, like me ;-).

## Building

First, you'll have to clone this repository: `git clone https://github.com/Max1Truc/Simple-Numworks-Firmware-Installer numworks-installer`.

Then, go in it with `cd numworks-installer`.

Finally, run `npm install` and `npm start`.

The installer is now available at this URL: `http://localhost:8080`.

## Credits

Thanks to:

- The [Omega](https://getomega.dev/) fork of [Epsilon](https://github.com/numworks/epsilon/) for its [template to create native apps](https://github.com/Omega-Numworks/Omega-App-Template).
- The [NumWorks.js](https://www.npmjs.com/package/numworks.js) npm library, to let everyone upload firmwares through the browser.
