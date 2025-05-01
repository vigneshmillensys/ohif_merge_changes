import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
// @ts-ignore
import { FileUploader } from 'react-drag-drop-files';
import { useStyles } from './styles';
import { FileData } from './types';

interface Props {
  onSelectFiles: (fileList: FileData[]) => void;
}
export default function SelectingFilesTab(props: Props) {
  const { onSelectFiles } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const handleChange = (files: FileList) => {
    const selectedFiles: FileData[] = [];
    const fileArray = Array.from(files);
    fileArray.forEach((file, index) => {
      selectedFiles.push({
        id: `${file.name + Math.random() * 100}`,
        file: file,
        status: index === 0 ? 'InProgress' : 'InQueue',
      });
    });
    onSelectFiles(selectedFiles);
  };

  return (
    <>
      <Box className={classes.selectFilesTab}>
        <Typography
          variant="h4"
          gutterBottom
          className={classes.titleText}
          mt={2}
        >
          Start uploading your files
        </Typography>
        <FileUploader
          classes={classes.fileUploader}
          label="Drag and drop dcm,dcn or dic files"
          multiple={true}
          handleChange={handleChange}
          name="file"
        // types={fileTypes}
        />
        {/* <p>{file ? `File name: ${file[0].name}` : 'no files uploaded yet'}</p> */}
      </Box>
    </>
  );
}
