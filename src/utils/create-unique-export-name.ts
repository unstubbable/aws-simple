import {createShortHash} from './create-short-hash';

export type ExportName = 'RestApiUrl' | 'S3BucketName';

export function createUniqueExportName(
  stackName: string,
  exportName: ExportName,
  legacy = false
): string {
  return legacy
    ? `R${createShortHash(exportName, stackName)}`
    : `${exportName}${createShortHash(stackName)}`;
}
