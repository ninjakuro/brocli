import { getFilesFromPaths, compressFile, sizeOf } from './utils.js'

if (process.argv.length <= 2) {
	console.warn('Usage: npm start path/to or path/to/file');
	process.exit(0);
}

const files = getFilesFromPaths(process.argv.splice(2));

Promise.all(files.map(compressFile)).then(compressedFiles => {
	const logs = files.map((file, i) => `${file} (${sizeOf(file)}) => ${compressedFiles[i]} (${sizeOf(compressedFiles[i])})`);
	console.log(logs);
}).catch(console.warn);
