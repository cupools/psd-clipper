import PSD from 'psd'
import minimatch from 'minimatch'
import pngjs from 'pngjs'
import checkin from 'checkin'

import lint from './lint'

function process(option) {
  const { psd } = checkin(option, lint)
  const src = option.src.splice ? option.src : [option.src]
  const file = PSD.fromFile(psd)

  file.parse()

  const tree = file.tree()
  const nodes = collect(tree, src)

  const data = nodes.map(node => {
    const buffer = read(node)
    const name = node.name

    return {
      ...node.layer,
      name,
      buffer
    }
  })

  return {
    psd: {
      size: {
        width: tree.layer.right,
        height: tree.layer.bottom
      }
    },
    data
  }
}

function collect(tree, src) {
  return src.reduce(
    (ret, pattern) => {
      const descendants = tree.descendants()
      const mm = new minimatch.Minimatch(pattern)
      const childrens = descendants.filter(node => mm.match(node.name))

      return ret.concat(childrens.filter(node => !node.isGroup() && !node.hidden()))
    },
    []
  )
}

function read(node) {
  let png = node.toPng()
  return pngjs.PNG.sync.write(png)
}

export default process
