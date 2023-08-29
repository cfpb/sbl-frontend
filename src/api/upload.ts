export default async function upload(
  files: FileList,
  token: string
): Promise<any> {
  const formData = new FormData();

  for (const file of files) {
    formData.append('file', file);
  }

  const headers = {
    Accept: 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const request = await fetch(import.meta.env.VITE_UPLOAD_URI as string, {
    method: 'POST',
    mode: 'cors',
    body: formData,
    headers
  });

  return request.json();
}
