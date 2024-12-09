## Overview

ClickPix SDK is an Proof of Concept implemented to think an openpix SDK to use in clickpix, allowing users developers manipuling the states from orders and charges and hold the click event to create an charge with the hook `beforeCreateCharge`

This is evolued version from [v1](https://github.com/HallexCosta/clickpix) but with React and Rspack :)

## Techs

- [x] React
- [x] Vanilla
- [x] OpenPix
- [x] TailwindCSS
- [x] Rspack

## Important Concepts
- [x] Event Bus
- [x] Sync Memory with Fetch

## How to run

**Dev**
```sh
pnpm dev
```

**Build**
```sh
pnpm build
```

**Prod**
```sh
pnpm start
```

Access the url: http://localhost:4459

> If use `pnpm start` you can view in http://localhost:8085/examples/0.1.0/index.html or http://localhost:8085/build/index.html if already make build

## Rules for use
To work fine is need the following the requeriments below:

- [x] Have an `index.html` file
- [x] Have a tag div defined with the class `clickpix`
  - [x] You can defined `[data-value]` 
  - [x] You can defined `[data-product-id]`
  - [x] You can defined `[data-additional-info]` 
  - [x] You can defined `[data-additional-variant]` (beta)
  - [x] You can defined `[data-customer-fields]` (beta)
- [x] Tag div shall be have an attribute `[data-product-id]` with unique id
- [x] Once the `price` is added to the states, it cannot be changed.
- [x] Have a `/v1/openpix.js` plugin cdn
- [x] Have a tailwind cdn (it's needed because tailwind is not compiled into openpix-SDK yet)

Follow an example of implementation in [examples/index.html](./examples/0.1.0/index.html)


[rspack-boilerplate](https://github.com/sibelius/rspack-boilerplate)