import db from '../libraries/database';

export function deviceExists(uuid: string): boolean {
	const result = db.select('id').from('device').where('uuid', uuid).first();

	return !!result;
}
