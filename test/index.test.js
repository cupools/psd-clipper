/* eslint-env mocha */

import Chai from 'chai'
import fs from 'fs-extra'
import images from 'images'
import glob from 'glob'
import path from 'path'
import chaiCss from 'chai-css'
import sizeOf from 'image-size'

import psdClipper from '../index'

Chai.should()
Chai.use(chaiCss)

describe('psd-clipper', () => {
  it('should works with layer', () => {
    const opt = {
      src: '1',
      psd: 'test/fixtures/demo.psd'
    }

    const { data, psd } = psdClipper(opt)
    psd.size.width.should.equal(256)
    psd.size.height.should.equal(512)
    data.should.have.lengthOf(2)
  })
})
