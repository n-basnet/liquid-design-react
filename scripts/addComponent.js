const fs = require('fs-extra')
const inquirer = require('inquirer')
const camelcase = require('camelcase')

const storybookComponents = require('../example/storybook/components.json')
const fileTemplates = require('./addComponentTemplates.js')

const QUESTIONS = [
  {
    type: 'input',
    name: 'name',
    message: 'Name of the new component:',
    validate: str => {
      if (!str.length) {
        return 'please provide a name'
      }
      return true
    },
  },
]

const saveFile = (path, content) => {
  fs.outputFile(path, `${content.trim()}\n`, (err) => {
    if (err) {
      return console.log(err)
    }
    console.log(`Saved ${path}`)
  })
}

inquirer.prompt(QUESTIONS).then(({name}) => {
  const canonisedName = camelcase(name, {pascalCase: true})

  ;[
    {
      path: `src/components/${canonisedName}/index.js`,
      content: fileTemplates.jsFileTemplate({name: canonisedName}),
    },
    {
      path: `src/components/${canonisedName}/test.js`,
      content: fileTemplates.testFileTemplate({name: canonisedName}),
    },
    {
      path: `example/storybook/components/${canonisedName}.js`,
      content: fileTemplates.storybookFileTemplate({name: canonisedName}),
    },
  ].map(file => {
    saveFile(file.path, file.content)
  })

  // add to index.js
  const indexFilePath = 'src/index.js'
  const indexFile = fs.readFileSync(indexFilePath, 'utf8')
  saveFile(indexFilePath, `
${indexFile.trim()}
export { default as ${canonisedName} } from '~/components/${canonisedName}'
`)

  // add to storybook
  const newStorybookComponents = [...storybookComponents, canonisedName]
  saveFile('example/storybook/components.json', JSON.stringify(newStorybookComponents, null, 2))
})
