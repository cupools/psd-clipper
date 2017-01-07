import fs from 'fs'

export default {
  psd: {
    typeOf: 'string',
    satisfy(val) {
      return fs.existsSync(val)
    }
  },
  src: {
    coerce(val) {
      return [].concat(val)
    }
  }
}
