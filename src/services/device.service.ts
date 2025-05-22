import db from '../libraries/database';
import type { Device } from '../types/device.type';

export async function deviceExists(uuid: string): Promise<boolean> {
	const result = await db<Device>('device').where('external_id', uuid).first();

	return !!result;
}
