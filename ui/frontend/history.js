import { createBrowserHistory, createMemoryHistory } from 'history'

// - Calling createBrowserHistory w/no browser causes issues with tests, even using 'jsdom' and 'jsdom-global'.
// - This flag will never be set in prod because NODE_ENV would be undefined in our static bundle anyway.
// - Setting NODE_ENV to 'test' is done by the package.json test scripts, which actually utilize Node.js.
const isTest = process.env.NODE_ENV === 'test'
const history = isTest ? createMemoryHistory() : createBrowserHistory()
export default history
