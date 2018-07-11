const fs = require('fs-extra')
const inquirer = require('inquirer')
const camelcase = require('camelcase')

const storybookModules = require('../storybook/modules.json')
const fileTemplates = require('./addComponentTemplates.js')

const COMPONENT_TYPES = ['component', 'element', 'module']
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
  {
    type: 'list',
    name: 'type',
    message: 'What is the component type?',
    choices: COMPONENT_TYPES,
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

inquirer.prompt(QUESTIONS).then(({ name, type }) => {
  const canonisedName = camelcase(name, { pascalCase: true })

  ;[
    {
      path: `src/${type}s/${canonisedName}/index.js`,
      content: fileTemplates.jsFileTemplate({ name: canonisedName }),
    },
    {
      path: `src/${type}s/${canonisedName}/test.js`,
      content: fileTemplates.testFileTemplate({ name: canonisedName }),
    },
    {
      path: `storybook/${type}s/${canonisedName}.js`,
      content: fileTemplates.storybookFileTemplate({ name: canonisedName, type }),
    },
  ].map(file => {
    saveFile(file.path, file.content)
  })

  // add to index.js
  const indexFilePath = 'src/index.js'
  const indexFile = fs.readFileSync(indexFilePath, 'utf8')
  saveFile(indexFilePath, `
${indexFile.trim()}
export { default as ${canonisedName} } from '~/${type}s/${canonisedName}'
`)

  // add to storybook
  const newStorybookModules = [...storybookModules, { name: canonisedName, type }]
  saveFile('storybook/modules.json', JSON.stringify(newStorybookModules, null, 2))
})
