# Electron build:web 打包问题

Module not found: Error: Can't resolve 'fs'

github -> https://github.com/webpack-contrib/css-loader/issues/447

加上了
```
node: {
  fs: 'empty'
}
```

这样 build:web 就不会报错，但是打开页面后会有 error

在 ***\<renderer path\>/store/index.js*** 里注释掉 plugin 打包即可：
```
import Vue from 'vue'
import Vuex from 'vuex'

// import { createPersistedState/*,  createSharedMutations */ } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    // createPersistedState(),
    // createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})

```

但是打包成 PC 端应用时，需要取消注释