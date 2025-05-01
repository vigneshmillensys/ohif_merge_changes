
export const tableColumns = [
    {
      accessorKey: 'PatientId',
      header: 'Patient ID',
      size: 100,
      order: 0
    },
    {
      accessorKey: 'ReportStatus',
      header: 'Status',
      size: 100,
      order: 1,
    },
    {
      accessorKey: 'PatientName',
      header: 'Name',
      size: 200,
      order: 2
    },
    {
      accessorKey: 'AccessionNumber',
      header: 'Accession #',
      size: 100,
      order: 3
    },
    {
      accessorKey: 'StudyDate',
      header: 'Study Date',
      size: 150,
      order: 4
    },
    {
      accessorKey: 'Modality',
      header: 'Modality',
      size: 100,
      order: 5
    },
    {
      accessorKey: 'StudyDescription',
      header: 'Description',
      size: 230,
      order: 6
    },
    {
      accessorKey: 'ProcedureName',
      header: 'Branch',
      size: 200,
      order: 7
    },
    {
      accessorKey: 'PriorityName',
      header: 'Priority',
      size: 100,
      order: 8
    }, {
      accessorKey: 'CountDown',
      header: 'Count Down',
      size: 20,
      order: 9
    },
    {
      accessorKey: 'StudyInstanceUID',
      header: 'StudyInstanceUID',
      size: 10,
      order: 9,
      notshow: true
    },
  
  ];
  export const options = [
    { value: 'MR', label: 'MR' },
    { value: 'AR', label: 'AR' },
    { value: 'ASMT', label: 'ASMT' },
    { value: 'AU', label: 'AU' },
    { value: 'BDUS', label: 'BDUS' },
    { value: 'BI', label: 'BI' },
    { value: 'BMD', label: 'BMD' },
    { value: 'CR', label: 'CR' },
    { value: 'CT', label: 'CT' },
    { value: 'CTPROTOCOL', label: 'CTPROTOCOL' },
    { value: 'DG', label: 'DG' },
    { value: 'DOC', label: 'DOC' },
    { value: 'DX', label: 'DX' },
    { value: 'ECG', label: 'ECG' },
    { value: 'EPS', label: 'EPS' },
    { value: 'ES', label: 'ES' },
    { value: 'FID', label: 'FID' },
    { value: 'GM', label: 'GM' },
    { value: 'HC', label: 'HC' },
    { value: 'HD', label: 'HD' },
    { value: 'IO', label: 'IO' },
    { value: 'IOL', label: 'IOL' },
    { value: 'IVOCT', label: 'IVOCT' },
    { value: 'IVUS', label: 'IVUS' },
    { value: 'KER', label: 'KER' },
    { value: 'KO', label: 'KO' },
    { value: 'LEN', label: 'LEN' },
    { value: 'LS', label: 'LS' },
    { value: 'MG', label: 'MG' },
    { value: 'MR', label: 'MR' },
    { value: 'M3D', label: 'M3D' },
    { value: 'NM', label: 'NM' },
    { value: 'OAM', label: 'OAM' },
    { value: 'OCT', label: 'OCT' },
    { value: 'OP', label: 'OP' },
    { value: 'OPM', label: 'OPM' },
    { value: 'OPT', label: 'OPT' },
    { value: 'OPTBSV', label: 'OPTBSV' },
    { value: 'OPTENF', label: 'OPTENF' },
    { value: 'OPV', label: 'OPV' },
    { value: 'OSS', label: 'OSS' },
    { value: 'OT', label: 'OT' },
    { value: 'PLAN', label: 'PLAN' },
    { value: 'PR', label: 'PR' },
    { value: 'PT', label: 'PT' },
    { value: 'PX', label: 'PX' },
    { value: 'REG', label: 'REG' },
    { value: 'RESP', label: 'RESP' },
    { value: 'RF', label: 'RF' },
    { value: 'RG', label: 'RG' },
    { value: 'RTDOSE', label: 'RTDOSE' },
    { value: 'RTIMAGE', label: 'RTIMAGE' },
    { value: 'RTINTENT', label: 'RTINTENT' },
    { value: 'RTPLAN', label: 'RTPLAN' },
    { value: 'RTRAD', label: 'RTRAD' },
    { value: 'RTRECORD', label: 'RTRECORD' },
    { value: 'RTSEGANN', label: 'RTSEGANN' },
    { value: 'RTSTRUCT', label: 'RTSTRUCT' },
    { value: 'RWV', label: 'RWV' },
    { value: 'SEG', label: 'SEG' },
    { value: 'SM', label: 'SM' },
    { value: 'SMR', label: 'SMR' },
    { value: 'SR', label: 'SR' },
    { value: 'SRF', label: 'SRF' },
    { value: 'STAIN', label: 'STAIN' },
    { value: 'TEXTUREMAP', label: 'TEXTUREMAP' },
    { value: 'TG', label: 'TG' },
    { value: 'US', label: 'US' },
    { value: 'VA', label: 'VA' },
    { value: 'XA', label: 'XA' },
    { value: 'XC', label: 'XC' },
  ];
  export const NoteStudyColumns = [
    {
      accessorKey: 'Note',
      header: 'Note',
      size: 250,
      order: 0
    },
    {
      accessorKey: 'isCritical',
      header: 'Critical',
      size: 30,
      order: 1,
    },
    {
      accessorKey: 'action',
      header: 'Action',
      size: 15,
      order: 1,
    },
  ]
  export const VoiceReportColumns = [
    {
      accessorKey: 'ReportName',
      header: 'Report Name',
      size: 200,
      order: 0
    },
    {
      accessorKey: 'ReportDateTime',
      header: 'DateTime',
      size: 50,
      order: 1,
    },
    {
      accessorKey: 'action',
      header: 'Action',
      size: 10,
      order: 1,
    },
  ]
  