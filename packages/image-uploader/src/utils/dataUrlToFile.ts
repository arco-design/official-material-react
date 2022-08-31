export default function dataUrlToFile(dataURL: string, fileType: string): File {
  if (!dataURL) {
    return null;
  }

  const binary = atob(dataURL.split(',')[1]);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  const fileBlob = new Blob([new Uint8Array(array)], { type: fileType });
  return new File([fileBlob], 'croppedimage', {
    type: fileType || 'image/*',
  });
}
