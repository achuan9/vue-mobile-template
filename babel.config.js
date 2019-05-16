module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      '@nutui/babel-plugin-separate-import',
      {
        libraryName: '@nutui/nutui',
        libraryDirectory: 'dist/packages',
        style: 'scss'
      }
    ]
  ]
}
