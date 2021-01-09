import { existsSync, unlinkSync } from 'fs';
import { getFilesFromPaths, compressFile } from '../src/utils.js'

const files = getFilesFromPaths(['.']);

Promise.all(files.map(compressFile)).then(compressedFiles => {
	if (files.length === compressedFiles.filter(existsSync).length) {
		console.info('[+] Test success');
	} else {
		console.warn('[-] Test fail');
	}

	try {
		compressedFiles.forEach(unlinkSync);
	} catch {
		console.warn('[!] cannot delete compressed files');
	}
}).catch(console.warn)
