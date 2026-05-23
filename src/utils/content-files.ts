import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

function countMarkdownFiles(dirPath: string): number {
    return readdirSync(dirPath, { withFileTypes: true }).reduce((count, entry) => {
        const entryPath = join(dirPath, entry.name);

        if (entry.isDirectory()) {
            return count + countMarkdownFiles(entryPath);
        }

        if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
            return count + 1;
        }

        return count;
    }, 0);
}

export function hasContentFiles(directoryPath: string) {
    return countMarkdownFiles(resolve(directoryPath)) > 0;
}
