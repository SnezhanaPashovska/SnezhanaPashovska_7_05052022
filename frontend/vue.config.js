const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          data: `@import "@/styles/_variables.scss"`
        }

      }
    }
  }
};

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          data:
            `@import "@/styles/_mixins-signup.scss"`

        }

      }
    }
  }
};

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          data: `@import "@/styles/_mixins-login.scss"`
        }

      }
    }
  }
};

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          data: `@import "@/styles/_mixin-profile.scss"`
        }

      }
    }
  }
};
module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
};


