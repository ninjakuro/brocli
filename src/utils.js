import { readdirSync, statSync, createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress, constants } from 'zlib';

const ext = '.br';

export const getFilesFromPaths = paths => {
	return paths.reduce((acc, path) => {
		if (statSync(path).isDirectory()) {
			const files = readdirSync(path)
				.filter(filename => !statSync(`${path}/${filename}`).isDirectory())
				.map(filename => `${path}/${filename}`)
			;
			return [...acc, ...files];
		}
		return [...acc, path];
	}, []).filter(file => !file.endsWith(ext));
}

export const compressFile = file => new Promise((resolve, reject) => {
	const input = createReadStream(file);
	const output = createWriteStream(`${file}${ext}`);
	const params = {
		[constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
		[constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY,
	};
	const compress = createBrotliCompress({ params });

	input.pipe(compress).pipe(output);
	output.on('finish', () => resolve(`${file}${ext}`));
	output.on('error', reject);
});

export const sizeOf = file => {
	const b = statSync(file).size || 0;
	const e = Math.floor(Math.log(b) / Math.log(1024));
	return `${(b / Math.pow(1024, e)).toFixed(2)} ${' KMGTP'.charAt(e)}B`;
}

export default { getFilesFromPaths, compressFile };
