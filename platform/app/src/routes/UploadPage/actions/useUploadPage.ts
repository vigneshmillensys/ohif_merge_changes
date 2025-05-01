import { useEffect, useState, useCallback } from 'react';
import { FileData } from '../types';
import axios from 'axios';
import { config } from '../../../../../i18n/src/config';

const mockFile1 = new File(['Mock file content'], 'mockfile.txt', { type: 'text/plain' });
const mockFile2 = new File(['Mock file content'], 'mockfile.txt', { type: 'text/plain' });
const mockFile3 = new File(['Mock file content'], 'mockfile.txt', { type: 'text/plain' });

export function UseUploadPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [branches, setBranches] = useState<string[]>(['Branch 1', 'Branch 2', 'Branch 3']);
  const [selectedBranch, setSelectedBranch] = useState<string>('Branch 1');
  const [isSelectingFiles, setIsSelectingFiles] = useState<boolean>(true);
  const [selectedFiles, setSelectedFiles] = useState<FileData[]>([
    // { id: 'vvvvv', file: mockFile1, status: 'InProgress' },
    // { id: 'vvvvv', file: mockFile1, status: 'InQueue' },
    // { id: 'vvvvv', file: mockFile1, status: 'Success' },
    // { id: 'vvvvv', file: mockFile1, status: 'Fail' },
  ]);

  const handleOnSelectBranch = useCallback((newBranch: string) => {
    setSelectedBranch(newBranch);
  }, []);

  const uploadDicomDocument = useCallback(async (formData: FormData): Promise<boolean> => {
    const configHeader = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    return axios
      .post(`${config.baseUrl}/Upload/UploadDicomFile`, formData, configHeader)
      .then((response: { data: boolean }) => {
        return response.data;
      });
  }, []);

  const uploadFiles = useCallback(
    async (files: FileData[]) => {
      const loginUser = JSON.parse(localStorage.getItem('loginUser'));
      const userId = loginUser.UserId;
      const branchId = loginUser.Branches[0];

      for (const file of files) {
        //
        const formData = new FormData();
        formData.append('file', file.file);
        formData.append('fileName', file.file.name);
        formData.append('userId', userId);
        formData.append('branchId', branchId);

        const result = await uploadDicomDocument(formData);

        setSelectedFiles(prev => {
          const selectedFileIndex = prev.findIndex(_file => _file.id === file.id);
          prev[selectedFileIndex].status = result ? 'Success' : 'Fail';
          if (selectedFileIndex < files.length - 1) {
            prev[selectedFileIndex + 1].status = 'InProgress';
          }
          return [...prev];
        });
      }
    },
    [uploadDicomDocument]
  );

  const handleOnSelectFiles = useCallback(
    (files: FileData[]) => {
      setSelectedFiles(files);
      setIsSelectingFiles(false);
      uploadFiles(files);
    },
    [uploadFiles]
  );

  return {
    isLoading,
    branches,
    selectedBranch,
    selectedFiles,
    isSelectingFiles,
    handleOnSelectBranch,
    handleOnSelectFiles,
  };
}
