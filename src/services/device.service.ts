import db from '@/libraries/database';
import type { Device } from '@/types/device.type';

export async function deviceByID(id: number): Promise<Device | undefined> {
	return await db<Device>('device').where('id', id).first();
}

export async function deviceByUUID(uuid: string): Promise<Device | undefined> {
	return await db<Device>('device').where('external_id', uuid).first();
}

export async function deviceExists(uuid: string): Promise<boolean> {
	return !!(await deviceByUUID(uuid));
}
