import fs from 'fs'

export default {
  psd: {
    typeOf: 'string',
    satisfy(val) {
      return fs.exitsSync(val)
    }
  },
  src: {
    coerce(val) {
      return [].concat(val)
    }
  }
}
