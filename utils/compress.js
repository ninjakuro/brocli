import { readdirSync, statSync, createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, constants } from 'node:zlib';

const ext = '.br';

const getFilesFromPath = path => {
	if (!statSync(path).isDirectory()) {
		return [path];
	}

	return readdirSync(path).reduce((acc, filename) => {
		const file = `${path}/${filename}`;

		if (!file.endsWith(ext) && !statSync(file).isDirectory()) {
			acc.push(file);
		}

		return acc;
	}, []);
}

export const getFiles = paths => {
	return paths.reduce((acc, path) => acc.concat(getFilesFromPath(path)), []);
}

export const compressFile = file => new Promise((resolve, reject) => {
	const result = [file, ext].join``;
	const input = createReadStream(file);
	const output = createWriteStream(result);
	const params = {
		[constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
		[constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY,
	};
	const compress = createBrotliCompress({ params });

	input.pipe(compress).pipe(output);
	output.on('finish', () => resolve(result));
	output.on('error', reject);
});
