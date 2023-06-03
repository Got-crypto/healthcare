export default async function handleArrayBuffer(arrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer);
  const base64Url = await convertUint8ArrayToBase64(uint8Array);

  return base64Url;
}

function convertUint8ArrayToBase64(arrayBuffer) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([arrayBuffer]);
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const base64Url = fileReader.result;
      resolve(base64Url);
    };

    fileReader.onerror = () => {
      reject(new Error('Failed to convert Uint8Array to base64.'));
    };

    fileReader.readAsDataURL(blob);
  });
}