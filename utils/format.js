import { statSync } from 'node:fs';

export const sizeOf = file => {
	const size = statSync(file).size || 0;
	const e = Math.floor(Math.log(size) / Math.log(1024));
	return (size / Math.pow(1024, e)).toFixed(2) + ' KMGTP'.charAt(e).trim() + 'B';
}

export const diff = (file, file2) => {
	return 100 - Math.round(statSync(file2).size/statSync(file).size*100) + '%';
};
