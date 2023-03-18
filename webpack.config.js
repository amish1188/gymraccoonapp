const path = require('path');

module.exports = {
 entry: './src/index.tsx',
 devtool: 'inline-source-map',
 mode: 'prod',
 module: {
  rules: [
   {
    test: /\.tsx?$/,
    use: {
     loader: 'ts-loader',
     options: {
      compilerOptions: {
       noEmit: false // this option will solve the issue
      }
     }
    },
    exclude: /node_modules/
   },
   {
    test: /\.s[ac]ss$/i,
    use: [
     // Creates `style` nodes from JS strings
     'style-loader',
     // Translates CSS into CommonJS
     'css-loader',
     // Compiles Sass to CSS
     'sass-loader'
    ]
   },
   {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader']
   }
  ]
 },
 resolve: {
  extensions: ['.tsx', '.ts', '.js']
 },
 output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist')
 }
};
