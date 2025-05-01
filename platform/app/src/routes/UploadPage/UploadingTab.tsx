/* eslint-disable prettier/prettier */
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';
import { useStyles } from './styles';
import { FileData } from './types/index';
import FileRow from './FileRow';

interface Props {
  selectedFiles: FileData[];
}

export default function UploadingTab(props: Props) {
  const { selectedFiles } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Card style={{ height: '100%', marginTop: '8px', display: 'flex', margin: "8px", flexDirection: 'column' }}>
        <CardContent style={{ height: '100%', padding: '0px' }}>
          <Typography
            variant="h2"
            gutterBottom
            className={classes.titleText}
          >
            {`Uploading ${selectedFiles.length} files`}
          </Typography>
          <Box className={classes.uploadingTab}>
            <Box className={classes.uploaderTab}>
              <Stack
                width={'100%'}
                height={'100%'}
                spacing={2}
              >
                {selectedFiles.map((file: FileData, index: number) => {
                  return (
                    <FileRow
                      key={index}
                      file={file}
                    />
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Typography
        variant="body1"
        gutterBottom
        className={classes.titleText}
      >
        {`${([...selectedFiles]).filter(file => file.status === 'Success').length} files uploaded successfully`}
      </Typography>
    </>
  );
}
