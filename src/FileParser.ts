import fs from 'node:fs';
import readLine from 'node:readline';

export class FileParser {

    constructor(private path: fs.PathLike) {

        if (!fs.existsSync(this.path)) {
            throw new Error("Cannot find file");
        }
    }

    containsString(text: string, callback: any) {

        let contains: boolean = false;
        text = text.toLowerCase();

        let file: readLine.Interface = readLine.createInterface({
            input: fs.createReadStream(this.path),
            output: process.stdout,
            terminal: false
        });

        file.on('line', (line: string) => {

            if (line.toLowerCase() === text) {
                contains = true;
            }
        });

        file.on('close', () => {
            callback(contains);
        });
    }
}