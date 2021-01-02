import { existsSync, unlinkSync } from 'node:fs';
import { getFiles, compressFile } from '../utils/compress.js'

const files = getFiles(['.']);

try {
	const compressedFiles = await Promise.all(files.map(compressFile));

	if (files.length === compressedFiles.filter(existsSync).length) {
		console.info('[+] Test success');
	} else {
		console.warn('[-] Test fail');
	}

	compressedFiles.forEach(unlinkSync);
} catch (err) {
	throw err;
}
