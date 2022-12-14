import fs from 'fs'

const Package = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
const ProductionPackage = {
    name: Package.name,
    version: Package.version,
    description: Package.description,
    main: 'index.js',
    repository: Package.repository,
    dependencies: Package.dependencies
}

fs.writeFileSync('./dist/package.json', JSON.stringify(ProductionPackage, null, '\t'))