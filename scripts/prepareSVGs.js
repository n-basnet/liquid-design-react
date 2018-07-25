const { getSVGOConfig } = require('./getSVGOConfig')

const glob = require('glob')
const fs = require('fs')
const path = require('path')
const SVGO = require('svgo')

const svgo = new SVGO(getSVGOConfig({ forIcons: true }))

const optimiseFile = async fileName => {
  const filePath = path.resolve(__dirname, '..', fileName)
  const contents = fs.readFileSync(filePath, 'utf8')

  const optimised = await svgo.optimize(contents, { path: filePath })

  fs.writeFile(filePath, optimised.data, 'utf8', err => {
    if (err) {
      console.log(err)
    }
    console.log(`optimised ${fileName}`)
  })
}

glob('src/graphics/svgIcons/**/*.svg', {}, (error, files) => {
  if (!error) {
    files.map(optimiseFile)
  }
})
