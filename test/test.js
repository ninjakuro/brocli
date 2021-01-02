import { existsSync, unlinkSync } from 'fs';
import { getFilesFromPaths, compressFile } from '../src/utils.js'

(async () => {
	const files = getFilesFromPaths(['.']);
	const compressedFiles = await Promise.all(files.map(compressFile));

	if (files.length === compressedFiles.filter(existsSync).length) {
		console.info('[+] Test success');
	} else {
		console.warn('[-] Test fail');
	}

	try {
		compressedFiles.forEach(unlinkSync);
	} catch {
		console.warn('[!] Something went wrong');
	}
})();
