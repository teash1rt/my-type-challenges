import fs from 'fs-extra'
import path from 'node:path'
import process from 'node:process'

const questionsName: string | undefined = process.argv[2];

if (!questionsName) {
    throw new Error('missing problem name')
}

const questionsPath = path.resolve('questions', questionsName)

fs.ensureDir(questionsPath).then(() => {
    fs.ensureFile(path.resolve(questionsPath, 'template.ts'))
    fs.ensureFile(path.resolve(questionsPath, 'test-cases.ts'))
})
