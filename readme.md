# esri-webpack demo extended (Includes HMR + React)

Extends the great work done here lobsteropteryx/esri-webpack, but adds:

- HMR)
- React support
- More concrete examples of using the Esri JS api with React.

ESRI JSAPI with Webpack demo

Generates separate app and vendor bundles via webpack, while pulling in the ESRI JSAPI and dojo via CDN.

```
npm install
typings install
npm run build
npm run test
```

Issues
-----------

- To get HMR working, I had to disable bundle splitting.
- I'm unable to get HMR working when loading the bundle using require() (i.e. the AMD require bundled with the Esri JS api.)