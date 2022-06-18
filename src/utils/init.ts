import inquirer from "inquirer"
import fs from 'fs'
import { basename } from 'path'
import { cwd } from 'process'; 
import { stringify, parse } from 'yaml'

inquirer.registerPrompt('search-list', require('inquirer-search-list'));
let exsitingConfig = fs.existsSync(cwd() + '/Carbonfile')

let languages = [
    "typescript",
    "javascript",
    "python",
    "ruby",
    "go",
    "java",
    "c",
    "c++",
    "c#",
    "php",
    "swift",
    "kotlin",
    "rust",
    "elixir",
    "haskell",
    "clojure",
    "scala",
    "erlang",
    "ocaml",
    "lua",
    "dart",
    "elm",
    "crystal",
    "d",
    "r",
    "perl",
]


export default async function runInit() {
        if (exsitingConfig) {
        inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'overwrite',
                message: 'Carbonfile already exists would you like to overwite it',
                default: false
            }
        ])
        .then((answer: any) => {
            if (answer.overwrite) {
                init()
            } else {
                console.log('Bye 👋')
            }
        });
    } else {
        init()
    }
    
}
function getEntry() {
    return `${'index' || 'main'}`
}

function init() {
    inquirer
    .prompt([
        {
            type: 'text',
            name: 'pname',
            message: 'what is your project name',
            default: basename(cwd())
        },
        {
            type: 'text',
            name: 'pdescription',
            message: 'what is your project description',
        },
        {
            type: 'text',
            name: 'pversion',
            message: 'what is your project version',
            default: '1.0.0',
            validate: async (pversion: any) => {
                if (!/\d{1,3}\.\d{1,2}\.\d{1,3}/.test(pversion)) {
                    console.log(" invalid version")
                    return
                } else {
                    return /\d{1,3}\.\d{1,2}\.\d{1,3}/.test(pversion)
                }   
            }
        },
        {
            type: 'text',
            name: 'pentry',
            message: 'what is your project entry point',
            default: getEntry() +'.js'
        },
        {
            type: 'search-list',
            name: 'planguage',
            message: 'what is your project language',
            choices: languages
        }
    ])
    .then((answer: any) => {
        let json = JSON.parse(`{"name": "${answer.pname}", "language": "${answer.planguage}", "description": "${answer.pdescription}", "version": "${answer.pversion}", "main": "${answer.pentry}", "scripts": {}, "dependencies": {}}`)
        fs.writeFileSync(cwd() + '/Carbonfile', stringify(json, null, 2))
    });
}

