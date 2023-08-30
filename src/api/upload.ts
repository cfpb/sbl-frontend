import { BASE_URL } from "./common";

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

  const request = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    mode: 'cors',
    body: formData,
    headers
  });

  return request.json();
}
