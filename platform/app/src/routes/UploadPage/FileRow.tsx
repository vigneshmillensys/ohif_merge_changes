import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Typography, LinearProgress, useTheme } from '@mui/material';
import { useStyles } from './styles';
import { FileData } from './types/index';

interface Props {
  file: FileData;
}

export default function FileRow(props: Props) {
  const { file } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();

  const fileStatus = useMemo(() => {
    switch (file.status) {
      default:
      case 'InQueue':
        return 'info';
      case 'InProgress':
        return 'primary';
      case 'Fail':
        return 'error';
      case 'Success':
        return 'success';
    }
  }, [file.status]);

  return (
    <Box className={classes.fileRow}>
      <Box className={classes.fileRowContent}>
        <Box className={classes.rowTitleWrraper}>
          <Box>
            <Typography
              variant="body2"
              gutterBottom
            >
              {file.file.name}
            </Typography>
            <Typography
              variant="caption"
              gutterBottom
            >
              {file.file.size}
            </Typography>
          </Box>
          <Box key={file.status}>
            <Chip
              label={file.status}
              // style={{ backgroundColor: fileStatus }}
              color={fileStatus}
              size="medium"
            />
          </Box>
        </Box>
        <Box
          sx={{ width: '100%' }}
          mt={0.5}
          key={file.status}
        >
          <LinearProgress
            color={fileStatus}
            variant={file.status === 'InProgress' ? 'indeterminate' : 'determinate'}
            value={(file.status === 'Success' && 100) || (file.status === 'Fail' && 100)}
          />
        </Box>
      </Box>
    </Box>
  );
}
