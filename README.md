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

#### 引入 css module less

npm i less -D
