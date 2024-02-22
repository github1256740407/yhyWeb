/**
 * eslint 核心理念
 * env 运行环境
 * rules 配置规则
 * key:value [val1,val2]
 * val1['off 0','warn 1','error 2']
 * extends 解析器
 * plugins npm插件
 * globals 全局变量不提醒
 */
module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    globals: {
      __dirname: true,
      process: true,
      require: true,
      module: true,
      // element-plus
      ElMessage: true,
      ElMessageBox: true,
      ElNotification: true,
      ElLoading: true
    },
    extends: [
      'eslint:recommended',
      // 'plugin:vue/vue3-essential', // 只检查基本的、最重要的语法
      // 'plugin:vue/vue3-strongly-recommended', // 最严格 语法和规范
      'plugin:vue/vue3-recommended', // 推荐的语法检查规范
      './.eslintrc-auto-import.json' // 引入autoimport中的配置配置
    ],
    overrides: [
      {
        env: {
          node: true,
        },
        files: ['.eslintrc.{js,cjs}'],
        parserOptions: {
          sourceType: 'script',
        },
      },
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['vue', 'eslint-plugin-vue'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      // 缩进风格
      indent: 'off', // 缩进为0
      'space-before-function-paren': [2, 'never'],
      'vue/script-indent': [ // 脚本缩进2空格
        2,
        2,
        {
          baseIndent: 1,
        },
      ],
      eqeqeq: [1, 'always'], // 要求使用 === 和 !==
      quotes: [1, 'single'], // 单引号
      semi: [1, 'never'], // 去除分号结尾
      'vue/multi-word-component-names': 'off', // 关闭组件命名规则
      'space-before-blocks': [1, 'always'], // {前面不要空格
      // 'space-before-function-paren': [2, 'never'],
      'space-in-parens': [1, 'never'], // 小括号里面要不要有空格
      'space-infix-ops': 1, // 中缀操作符周围要不要有空格
      'space-unary-ops': [1, { // 一元运算符的前/后要不要加空格
        'words': true,
        'nonwords': false
      }],
      'spaced-comment': [1, 'always', { // 注释风格要不要有空格什么的
        'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }],
      'switch-colon-spacing': [1, { // switch 语句中 case 和 default 子句的冒号周围的间距
        'after': true,
        'before': false
      }],
      'key-spacing': [1, {  // 对象 key 和 value 之间的间距 
        'beforeColon': false,
        'afterColon': true
      }],
      'object-curly-spacing': [2, 'always'], // 大括号内是否允许不必要的空格
      'no-unused-vars': [1, { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }], // 未使用过的参数警告
    },
  }
  