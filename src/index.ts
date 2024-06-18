#!/usr/bin/env node

import yargs from "yargs";
import { FileParser } from "./FileParser";

const options: any = yargs
    .usage("Usage: -n <name>")
    .option("n", { alias: "name", describe: "Founder name", type: "string", demandOption: true })
    .option("f", { alias: "file", describe: "Filename with list of founders", type: "string", demandOption: false })
    .argv;

(function run() {

    try {

        let filename = options.file ? options.file : "founders.txt";

        let foundersFile = new FileParser(filename);

        foundersFile.containsString(options.name, (contains: boolean) => {
            if (contains) {
                console.log("File contains founder name");
            }
            else {
                console.log("File does not contain founder name");
            }
        });
    }
    catch (e: any) {
        let error: Error = e;
        console.log(error.message);
    }

})();