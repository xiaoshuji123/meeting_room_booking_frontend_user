# React + TypeScript + Vite + React Router + Redux Toolkit + Eslint + Prettier + Husky

## 项目搭建

#### 创建项目

- npm create vite@latest 命令可以用于选择需要使用的框架
- npm create vite@latest project-name -- --template react-ts 通过附加的命令行选项直接指定项目名称和你想要使用的模板
- 具体可以看 [vite 官网](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

#### 配置 Prettier

- npm i prettier -D
- 在根目录创建 .prettierrc.js 配置文件

```
// .prettierrc.js
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾需要有逗号
  trailingComma: 'all',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  bracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  // 每个文件格式化的范围是文件的全部内容
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'auto',
};

```

#### 配置 Prettier，Eslint

- eslint 在创建项目时已经引入了，这里就不需要下载 eslint
- npm i eslint-config-prettier eslint-plugin-prettier -D

```
// eslint.config.js
{
  extends: [..., 'plugin:prettier/recommended'],
  plugins: {
    ...,
    'prettier': eslintPluginPrettier,
  },
},

```

`格式化时 js 文件时，会发现 prettier 报错，是因为 vite 项目使用了 esModule 模块，需要将后缀名改成 .mjs，如需要继续使用 commonjs，则后缀名改成 .cjs，或者直接删除 package.json 中的 type 属性`

#### CSS 代码检查器

- npm install --save-dev stylelint stylelint-config-standard stylelint-config-prettier
- 创建一个 styleLint 文件

```
module.exports = {
  defaultSeverity: 'error',
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  customSyntax: 'postcss-less',
  plugins: ['stylelint-less'],
  rules: {
    'max-empty-lines': 1,
    'number-leading-zero': 'always',
  },
};

```

#### 配置脚本执行 Prettier

```
// package.json
{
  ...,
  scripts: {
    ....
    "format": "prettier --write \"./src/**/*.{tsx,ts,css,less}\"", // prettier 进行格式化 --write 直接修改文件进行格式化
    "lint": "npm run lint:ts && npm run lint:css",
    "lint:ts": "eslint . --max-warnings 0 --ext .ts,.tsx --fix", // --max - warnings 0 表示不允许有任何警告，如果有警告也会被视为错误；-ext .ts,.tsx：指定只检查扩展名为 .ts 和 .tsx 的文件。值得注意的是，这个 --ext 仅在 eslintrc 命名的文件生效，eslint.config.js 直接在文件里配置即可，不用命令
    "lint:css": "stylelint \"./src/**/*.{css,less}\" --fix" // 用于对 CSS 和 LESS 文件进行风格检查并且修复
  }
}
```

#### 安装 lint-staged

由于检查代码命令是对整个项目代码有效，有时候我们只想对自己改动的代码进行检查，而忽略项目其他代码。我们可以使用lint-staged，它可以让我们执行检查命令只对 git 缓存区的文件有效。

- npm i lint-staged -D

```package.json
  "scripts": {
    "lint-staged": "lint-staged"
  },
  "lint-staged": {
		"src/**/*.{ts,tsx,json,css,less}": [
			"prettier --write"
		],
		"src/**/*.{css,less}": [
			"stylelint --fix"
		],
		"src/**/*.{ts,tsx}": [
			"eslint --fix"
		]
	},
```

#### 安装 husky

由于前面都是需要手动操作的，husky 可以让我们在 git 提交的时候自动执行命令。

- npm i husky -D

```
  "scripts": {
    "prepare": "husky install"
  }
```

然后执行这条命令yarn prepare，husky 执行初始化，可以发现我们的项目目录多了.husky文件夹，代表初始化成功。然后在 pre-commit 文件下添加 npx lint-staged 命令

#### 重置 css

- npm i normalize.css 并引入

#### css module

- npm i less -D
- 在 vite.config.ts 中配置一下 css

```
const CSS_MODULE_LOCAL_IDENT_NAME = '[local]_[hash:base64:5]'

{
  ...
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 如需自定义组件其他 token, 在此处配置
        },
      }
    },
    modules: {
      generateScopedName: generateScopedNameFactory(CSS_MODULE_LOCAL_IDENT_NAME), // 自定义生成的类名
      localsConvention: 'camelCase',
    },
  }
}
```

- 如果想要更方便的引入类名，而不是通过【style.\*\*\*】的方式写法可以使用一个插件 babel-plugin-react-css-modules

#### 配置 babel-plugin-react-css-modules 插件，使用 styleName 引入样式

- npm i babel-plugin-react-css-modules postcss-less -D
- 然后再 vite.config.ts 里配置一下插件
- 如果你使用的是 vite，你需要使用 @dr.pogodin/babel-plugin-react-css-modules 插件，具体可以参考 https://github.com/vitejs/vite/discussions/2307
- 这里还需要引入 @types/react-css-modules 类型文件，否则 html 元素上会因为没有 styleName 属性而报错

```
import { generateScopedNameFactory } from '@dr.pogodin/babel-plugin-react-css-modules/utils';

defineConfig({
  plugins: [
      react({
        babel: {
          plugins: [
            [
              '@dr.pogodin/babel-plugin-react-css-modules',
              {
                generateScopedName: generateScopedNameFactory(CSS_MODULE_LOCAL_IDENT_NAME),
                attributeNames: { activeStyleName: 'activeClassName' },
                filetypes: {
                  '.less': {
                    syntax: 'postcss-less',
                  },
                },
                webpackHotModuleReloading: true,
                exclude: 'node_modules',
                handleMissingStyleName: 'warn',
              },
            ],
          ],
        },
      }),
  ],
})

```

#### react-router

- 该项目的路由是通过声明式模式来配置的，利用传统的 Routes Route 组件来配置，这里组件拆分的比较细，便于处理异常情况

### 问题

#### import path from "path" -> 找不到模块“path”或其相应的类型声明

npm i @types/node -D

#### 引入类型文件时，需要加上前缀 type 比较麻烦

```
compilerOptions: {
  "verbatimModuleSyntax": false,
}
```
