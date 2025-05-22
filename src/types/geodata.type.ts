export interface GeoData {
	timestamp: Date;
	device_id: number;
	created_at: Date;
	location: string; // Use 'string' for POINT if using raw WKT or WKB — can customize if needed
}
