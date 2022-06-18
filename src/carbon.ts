#!/usr/bin/env node

import { program } from 'commander'
import runInit from './utils/init'
import { runInstall, runInstallNoVersion } from './utils/install'

let cli = program

let name  = 'carbon'
let version = '1.0.0'
let description = 'an agnostic, blazing fast, modern, and powerful package manager'

cli.name(name)
    .version(version)
    .description(description)

cli.command("init")
    .description("initstailizes the project")
    .action(async() => {
        await runInit()
    })

cli.command('add <package>')
    .description("install the package")
    .action(async (pkg: string) => {
        if (pkg.split('@')[1] === undefined) {
            let user = pkg.split('/')[0]
            let userPkg = pkg.split('/')[1]
            await runInstallNoVersion(user, userPkg)
        } else {
            await runInstall(pkg.split('/')[0], pkg.split('/')[1].split('@')[0], pkg.split('@')[1])
        }
    })

cli.parse(process.argv)