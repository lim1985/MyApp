const path = require('path')
//全局文件路径
// const glob = require("glob-all");
//用于生产环境去除多余的css
// const PurgecssPlugin = require("purgecss-webpack-plugin");
//压缩代码并去掉console
 const TerserPlugin = require("terser-webpack-plugin");
//代码打包zip
 const CompressionWebpackPlugin = require("compression-webpack-plugin");
 const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
//
 const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  /*
    Vue-cli3:
    Crashed when using Webpack `import()` #2463
    https://github.com/vuejs/vue-cli/issues/2463

   */
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */
 //打包配置开始
 configureWebpack: config => {
  const plugins = [];

 // 启用代码压缩
  plugins.push(
    new TerserPlugin({
      terserOptions: {
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: false,
          pure_funcs: ["console.log"] //移除console
        }
      },
      sourceMap: false,
      parallel: true
    })
  ),
   // 代码压缩打包
    // plugins.push(
    //   new CompressionWebpackPlugin({
    //     filename: "[path].gz[query]",
    //     algorithm: "gzip",
    //     test: productionGzipExtensions,
    //     threshold: 10240,
    //     minRatio: 0.8
    //   })
    // );
    plugins.push(
      new BundleAnalyzerPlugin()
    );
  config.plugins = [...config.plugins, ...plugins];
},
//显示项目架构
 
//  configureWebpack: {
    // performance: {
    //   hints:false
    // }
    // // 或者
    // // 警告 webpack 的性能提示
    // performance: {
    //   hints:'warning',
    //   //入口起点的最大体积
    //   maxEntrypointSize: 50000000,
    //   //生成文件的最大体积
    //   maxAssetSize: 30000000,
    //   //只给出 js 文件的性能提示
    //   assetFilter: function(assetFilename) {
    //     return assetFilename.endsWith('.js');
    //   }
    // }
  // },  
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true,
      }
    }
  },
  devServer: {
    open: true,
    port: 8080,
    proxy: {
        '/apis': {
            target: 'http://zwfw.hunan.gov.cn/hnvirtualhall/yzCertificatenodo.jsp',  // target host
            ws: true,  // proxy websockets 
            changeOrigin: true,  // needed for virtual hosted sites
            pathRewrite: {
                '^/apis': ''  // rewrite path
            }
        },
      //   '/ProxyLogin': {
      //     target: 'http://172.20.8.28:3001/api/login',  // target host
      //     ws: true,  // proxy websockets 
      //     changeOrigin: true,  // needed for virtual hosted sites
      //     pathRewrite: {
      //         '^/ProxyLogin': ''  // rewrite path
      //     }
      // },
    }


    // proxy: {
    //   '/api': {
    //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
    //     ws: false,
    //     changeOrigin: true
    //   },
    //   '/banns': {
    //     target: 'http://www.dxzc.gov.cn/Category_1188/Index.aspx',
    //     ws: false,
    //     changeOrigin: true
    //     // changeOrigin: true,
    //     // pathRewrite: {
    //     //   '^/banns': '/api'
    //     // }
    //   },
    //   '/IDcard': {
    //     target: 'http://zwfw.hunan.gov.cn/hnvirtualhall/yzCertificatenodo.jsp',
    //     ws: false,
    //     changeOrigin: true
    //     // pathRewrite: {
    //     //   '^/IDcard': '/api'
    //     // }
    //   },
    //   // '/gateway': {
    //   //   target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
    //   //   changeOrigin: true,
    //   //   pathRewrite: {
    //   //     '^/gateway': '/api'
    //   //   }
    //   // }
    // }
  }
}