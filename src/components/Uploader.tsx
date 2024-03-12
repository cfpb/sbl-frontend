import { useMutation } from '@tanstack/react-query';
import Form from 'components/Form';
import { Label } from 'design-system-react';
import type { ChangeEvent, ReactElement } from 'react';
import upload from '../api/upload';
import { FileInput } from './FileInput';

export interface IUploaderProperties {
  token: string;
  setter: React.Dispatch<React.SetStateAction<[]>>;
}

export default function Uploader({
  token,
  setter,
}: IUploaderProperties): ReactElement {
  const mutation = useMutation(async (files: FileList) => upload(files, token));
  const onChange = async (event: ChangeEvent): Promise<void> => {
    const { files } = event.target as HTMLInputElement;
    if (files) {
      const resp = await mutation.mutateAsync(files);
      setter(resp.data);
    }
  };
  return (
    <Form>
      <Label htmlFor='file-input-specific'>Upload your files</Label>
      <div id='file-input-specific-hint'>Select one or more CSV files</div>
      <FileInput
        id='file-input-specific'
        name='file-input-specific'
        accept='.csv'
        aria-describedby='file-input-specific-hint'
        multiple
        onChange={onChange}
      />
    </Form>
  );
}
