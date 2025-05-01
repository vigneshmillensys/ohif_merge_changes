/* eslint-disable prettier/prettier */
import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Select, FormControl, Typography, Divider, MenuItem, Card, CardContent, InputLabel } from '@mui/material';
import { useAppConfig } from '@state';
import SelectingFilesTab from './SelectingFilesTab';
import UploadingTab from './UploadingTab';
import i18n from '@ohif/i18n';
import { Header, AboutModal, useModal, UserPreferences } from '@ohif/ui';
import { UseUploadPage } from './actions/useUploadPage';
import { useStyles } from './styles';

const steps = ['Select your files', 'Uploading'];
const versionNumber = process.env.VERSION_NUMBER;
const buildNumber = process.env.BUILD_NUM;
const { availableLanguages, defaultLanguage, currentLanguage } = i18n as any;

export default function UploadPage(props) {
    const { t } = useTranslation();
    const { show, hide } = useModal();
    const [appConfig] = useAppConfig();
    const classes = useStyles();
    const { isSelectingFiles, branches, selectedBranch, selectedFiles, handleOnSelectBranch, handleOnSelectFiles } = UseUploadPage();

    const renderTabs = useMemo(() => {
        switch (isSelectingFiles) {
            case true:
                return <SelectingFilesTab onSelectFiles={handleOnSelectFiles} />;
            default:
                return <UploadingTab selectedFiles={selectedFiles} />;
        }
    }, [handleOnSelectFiles, isSelectingFiles, selectedFiles]);

    const menuOptions = [
        {
            title: t('Header:About'),
            icon: 'info',
            onClick: () =>
                show({
                    content: AboutModal,
                    title: 'About Millensys Viewer',
                    contentProps: { versionNumber, buildNumber },
                }),
        },
        {
            title: t('Header:Preferences'),
            icon: '',
            onClick: () => { },
        },
        {
            title: t('Header:Profile'),
            icon: 'settings',
            onClick: () => { },
        },
    ];

    return (
        <>
            <Header
                isSticky
                menuOptions={menuOptions}
                isReturnEnabled={false}
                WhiteLabeling={appConfig.whiteLabeling}
                {...props}
            />
            <Box className={classes.pageWrraper} >
                <Typography variant="h2" gutterBottom className={classes.titleText}>
                    Upload Files
                </Typography>
                <Divider className={classes.divider} />
                <Card style={{ height: "100%", margin: "32px 24px", padding: "26px" }}>
                    <CardContent style={{ height: "100%", padding: "0px" }}>
                        <Box height={"100%"} display={"flex"} flexDirection={"column"}>
                            {/* <Typography variant="subtitle2" gutterBottom className={classes.titleText}>
                            </Typography> */}
                            <FormControl fullWidth style={{ marginTop: "8px", color: "white" }}>
                                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                                <Select
                                    className={classes.selectWrraper}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Branch"
                                    value={selectedBranch}
                                    color='primary'
                                    disabled={!isSelectingFiles}
                                    onChange={(e) => { handleOnSelectBranch(e.target.value) }}
                                >
                                    {branches.map((branch, index) => {
                                        return <MenuItem key={index} value={branch}>{branch}</MenuItem>

                                    })}
                                </Select>
                            </FormControl>
                            {renderTabs}
                        </Box>
                    </CardContent>
                </Card>

            </Box>
        </>
    );
}
