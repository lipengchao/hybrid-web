const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //   } else {
  //     return {
  //       resolve: {
  //         alias: {
  //           '@js': resolve('./src/assets/js'),
  //           '@css': resolve('./src/assets/css'),
  //           '@img': resolve('./src/assets/imgs'),
  //           '@c': resolve('./src/components')
  //         }
  //       }
  //     }
  //   }
  // }
  chainWebpack (config) {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@js', resolve('src/assets/js'))
      .set('@css', resolve('src/assets/css'))
      .set('@imgs', resolve('src/assets/imgs'))
      .set('@c', resolve('src/components'))
  }
}
