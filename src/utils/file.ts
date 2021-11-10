import last from 'lodash/last';

export function invokeFileDownloadFromBlob(blob: Blob, fileNameAndExtension: string): void {
  const href = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.download = fileNameAndExtension;
  link.href = href;
  link.click();

  URL.revokeObjectURL(link.href);
}

export function dataURLtoFile(dataURI: string, filename: string, meme: string): File {
  const byteString = atob(dataURI);

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new File([ab], filename, { type: meme });
}

export function getFileExtension(file: File): string {
  const fileParts = file.name.split('.');
  const fileExtension = file.type || (last(fileParts) ?? '');

  return fileExtension;
}
