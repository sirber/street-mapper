import { error, json } from '@sveltejs/kit';
import Papa from 'papaparse';
import { validate as uuidValidate } from 'uuid';
import type { RequestHandler } from './$types';
import { deviceExists } from '../../services/device.service';

export const POST: RequestHandler = async ({ request }) => {
	// Validate device
	const deviceId = request.headers.get('deviceid');
	if (!deviceId) {
		throw error(400, 'Missing deviceid header');
	}

	if (!uuidValidate(deviceId)) {
		throw error(400, 'Invalid deviceid format');
	}

	if (!(await deviceExists(deviceId))) {
		throw error(404, 'Device not found');
	}

	// Handle upload
	const contentType = request.headers.get('content-type') ?? '';
	if (!contentType.includes('multipart/form-data')) {
		throw error(400, 'Expected multipart/form-data');
	}

	const formData = await request.formData();
	const file = formData.get('file');
	if (!(file instanceof File)) {
		throw error(400, 'Missing file');
	}

	const text = await file.text();

	// parse CSV with PapaParse
	const { data, errors } = Papa.parse<Record<string, string>>(text, {
		header: false,
		skipEmptyLines: true
	});

	if (errors.length) {
		console.error(errors);
		throw error(400, 'Invalid CSV format');
	}

	// validate UUIDs using uuid package
	for (const row of data) {
		// TODO: import CSV data
		console.log(row);
	}

	return json({ status: 'ok', rows: data.length });
};
