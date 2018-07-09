const { getSVGOConfig } = require('./getSVGOConfig')

const fs = require('fs')
const path = require('path')
const SVGO = require('svgo')

const svgo = new SVGO(getSVGOConfig({ forIcons: true }))

const optimiseFile = async fileName => {
  const filePath = path.resolve(__dirname, '..', fileName)
  const contents = fs.readFileSync(filePath, 'utf8')

  const optimised = await svgo.optimize(contents, { path: filePath })

  fs.writeFile(filePath, optimised.data, 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
    console.log(`optimised ${fileName}`)
  })
}

fs.readdirSync('src/graphics/svgs')
  .filter(v => /\.svg$/.test(v))
  .map(v => optimiseFile(`src/graphics/svgs/${v}`))
