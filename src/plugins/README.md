# Plugins

This is where we can extend the functionalities of the latent browser
by adding more components.

Those components have to be React components, however they do not have
to be visual HTML elements (for instance see the "music" plugin).

## List of plugins

Note: all the plugins are a work in progress.

### Core

For the moment this plugin doesn't do much, but I will use it
to deploy core elements (services etc)

### UI

Simple UI elements such as buttons, navbar, typography etc.

### Flowbite

This plugin exposes some components from the Flowbite design system.

### Music

This plugin uses Reactronica (which itself uses Tone.js) to generate sounds.

### PDF

This plugin uses @react-pdf/renderer to generate PDF files.

### Fiber

This plugin uses @react-three-fiber to generate WebGL scenes.

## Wishlist

TODO: put some more themes!

### More themes

I would like to add better themes however this will take some work..

Here is a list of themes: https://www.tailwindawesome.com/?price=free

And here is a list of possible candidates:

- https://treact.owaiskhan.me (already in React, but there is no NPM package)
- https://preline.co/ (looking nice, but there is no React package yet)
- https://xtendui.com/
- https://flowrift.com/c/footer/lJxNF?view=preview

### Icon plugins

Note: for icons we cannot put then app in the API obviously.. but we can use a wrapper and simple semantic search perhaps

- Lucide.dev (nice icons)
- Material Symbols

## Creating a custom plugin

Do not hesitate to contact me on Discord or Twitter, or submit pull requests!

### Call for ideas

We can get wild here:

- Want to add a React web3 wallet plugin?
- a gateway to a control your home automation?

Everything is possible (well, see below), so go try it!

### Limitations

Just keep in mind the following limitations:

- for the moment a plugin need to be merged to the repo (it is not possible to install "wild" plugins yet)
- plugins have no configuration settings for now (but I will be happy to add that if there is demand!)
