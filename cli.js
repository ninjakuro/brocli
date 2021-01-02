import { basename } from 'node:path';
import { getFiles, compressFile } from './utils/compress.js'
import { sizeOf, diff } from './utils/format.js';

const [, filename, ...args] = process.argv;

const files = getFiles(args);

if (files.length === 0) {
	console.warn(`Usage: node ${basename(filename)} path/to/dir or path/to/file`);
	process.exit(0);
}

const compressedFiles = await Promise.all(files.map(compressFile));

const result = files.map((input, i) => {
	const output = compressedFiles[i];
	const result = `${sizeOf(input)} -> ${sizeOf(output)} (${diff(input, output)})`;
	return { input, output, result };
});

console.table(result);
