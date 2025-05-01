import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  pageWrraper: {
    padding: '16px 0px',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 55px)',
    backgroundColor: 'rgb(32, 35, 42)',
  },
  divider: {
    borderColor: 'rgb(255 255 255 / 34%) !important',
  },
  titleText: {
    color: 'white',
    marginTop: '8px !important',
    marginLeft: '16px !important',
  },
  stepWrraper: {
    marginTop: '56px',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 55px)',
    backgroundColor: 'rgb(32, 35, 42)',
  },
  selectWrraper: {
    '& .MuiSelect-select': {
      color: 'white',
    },
  },
  //
  selectFilesTab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
  },
  fileUploader: {
    height: '80% !important',
    width: '60% !important',
    display: 'flex !important',
    alignItems: 'center !important',
    justifycontent: 'center !important',
    maxWidth: '60% !important',
    border: '2px dashed rgb(239 150 64) !important',
    margin: '16px',
  },
  //
  uploadingTab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc( 100% - 40px)',
    flexDirection: 'column',
    marginTop: '8px',
  },
  uploaderTab: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    overflow: 'auto',
    padding: '0px 16px',
  },
  fileRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90px',
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#33373e',
    padding: '8px 32px',
    borderRadius: '32px',
    border: '1px solid #fff',
  },
  fileRowContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowTitleWrraper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
