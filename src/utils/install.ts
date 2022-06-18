import yaml from 'yaml'
import fs from 'fs'
import { cwd } from 'process'

export async function runInstall(user: string, pkg: string, version: any) {
    let conf = fs.readFileSync(`${cwd()}/Carbonfile`, 'utf-8')
    let config = yaml.parse(conf)
    config.dependencies[`${user}/${pkg}`] = version
    console.log(`user: ${user} package: ${pkg} version: ${version}`)
    fs.writeFileSync(`${cwd()}/Carbonfile`, yaml.stringify(config))
}
export async function runInstallNoVersion(user: string, pkg: string) {
    let conf = fs.readFileSync(`${cwd()}/Carbonfile`, 'utf-8')
    let config = yaml.parse(conf)
    config.dependencies[`${user}/${pkg}`] = 'latest'
    console.log(`user: ${user} package: ${pkg}`)
    fs.writeFileSync(`${cwd()}/Carbonfile`, yaml.stringify(config))
}
