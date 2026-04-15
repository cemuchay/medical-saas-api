export interface JwtPayload {
  sub: string; // User ID
  email: string;
  tenantId: string; // The "Multi-tenant" magic
  role: 'Admin' | 'Staff' | 'Viewer';
}
