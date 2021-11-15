import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

export const MAX_FILE_SIZE = 2097152;

interface IUseFile {
  file: File | null;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  errorText: string;
  setFile: Dispatch<SetStateAction<File | null>>
}

export const useFile = ():IUseFile => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files?.length) {
      return;
    }
    const loadedFile = evt.target.files[0];
    if (loadedFile.size > MAX_FILE_SIZE && !error) {
      setError(true);
      setErrorText(`Превышен размер в ${MAX_FILE_SIZE / 1024 / 1024} Мб`)
    } else {
      setError(false);
      setErrorText('');
    }

    setFile(loadedFile);
  }

  return {file, onChange, error, errorText, setFile};
};
