# Icomoon loader


## Description

The package is used as a loader for Webpack on production environment only. It downloads the icomoon development link
css contents, the fonts in the @font-face urls and copies them in the Webpack build. **Use only on production build, not 
for development.**


## Install

```bash
npm install --save-dev icomoon-loader
```
also, you need to install [raw-loader](https://github.com/webpack-contrib/raw-loader):
```bash
npm install --save-dev raw-loader
```


## Usage

Create a ``icomoon.css`` file with the contents:
```css
@import url('https://i.icomoon.io/public/2sjsfls6lf/ProjectName/style.css');
```

In the webpack config, **DEVELOPMENT** environment use css loader or what you use for all css files (icomoon.css included):
```js
{
   test: /\.css$/,
   use: ['css-loader']
}
```

And on **PRODUCTION** environment, exclude the ``icomoon.css`` file from regular CSS rules and create a separate rule only for it:
```js
{
   test: /\.css$/,
   use: ['css-loader'],
   exclude: ['path/to/icomoon.css']
},
{
   test: /\.css$/,
   use: ['raw-loader!icomoon-loader'],
   include: ['path/to/icomoon.css']
}
```
**If you don't exclude it from the rest of css files, it will be loaded both on icomoon link and locally.**


## Config
By default, the loader will copy font files on ``fonts`` folder on build path. To change this, add ``fontsPath`` config
property to the loader:
```js
{
   test: /\.css$/,
   use: ['raw-loader!icomoon-loader?fontsPath=assets'],
   include: ['path/to/icomoon.css']
}
```


## Conclusion
Use icomoon development link locally and this icomoon loader when you create the build for production, preventing
icomoon changes to be reflected in the production build.


## License

#### [MIT](./LICENCE)