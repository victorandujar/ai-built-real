export type ScanStatus = 'pass' | 'attention' | 'unavailable';
export interface PublicScanFinding {
  key:
    | 'https'
    | 'headers'
    | 'metadata'
    | 'sitemap'
    | 'robots'
    | 'performance'
    | 'accessibility';
  status: ScanStatus;
  evidence: string;
  limitation?: string;
}
export interface PublicScanResult {
  url: string;
  checkedAt: string;
  findings: PublicScanFinding[];
}
export interface PublicScanProvider {
  scan(url: URL): Promise<PublicScanResult>;
}
// Intentionally no provider or public fetch endpoint. Before implementation:
// DNS/IP allowlisting, private-network blocking, redirect revalidation,
// response/time/size limits, isolation, consent and honest unavailable results.
