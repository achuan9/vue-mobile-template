const Mock = require('mockjs')
const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const requireContext = require('require-context')

const mockDir = path.join(process.cwd(), 'mock')

function getMocks() {
  let mocks = []
  const mock = requireContext(mockDir, false, /[^index]\.js$/)
  mock.keys().forEach(function(item) {
    const itemPath = path.join(mockDir, item)
    const moduleMock = require(itemPath).default
    mocks = mocks.concat(moduleMock)
  })

  const formatMock = mocks.map(function(route) {
    const respond = route.response
    return {
      url: new RegExp(`/mock${route.url}`),
      type: route.type || 'get',
      response(req, res) {
        res.json(
          Mock.mock(respond instanceof Function ? respond(req, res) : respond)
        )
      }
    }
  })
  return formatMock
}

function registerRoutes(app) {
  let mockLastIndex
  const mocks = getMocks()
  for (const mock of mocks) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  const mockRoutesLength = Object.keys(mocks).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

module.exports = app => {
  // es6 polyfill
  require('@babel/register')
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /index/,
      ignoreInitial: true
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // clear routes cache
        unregisterRoutes()
        const mockRoutes = registerRoutes(app)
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(
          chalk.magentaBright(
            `\n > Mock Server hot reload success! changed  ${path}`
          )
        )
      }
    })
}
