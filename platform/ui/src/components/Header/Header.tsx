// import React, { ReactNode } from 'react';
// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import classNames from 'classnames';
// import { config } from '../../../../i18n/src/config';
// import NavBar from '../NavBar';
// import IconButton from '../IconButton';
// import Dropdown from '../Dropdown';
// import HeaderPatientInfo from '../HeaderPatientInfo';
// import { PatientInfoVisibility } from '../../types/PatientInfoVisibility';
// import { Icons } from '@ohif/ui-next';
// function Header({
//   children,
//   menuOptions,
//   isReturnEnabled = true,
//   onClickReturnButton,
//   isSticky = false,
//   WhiteLabeling,
//   showPatientInfo = PatientInfoVisibility.VISIBLE_COLLAPSED,
//   servicesManager,
//   Secondary,
//   appConfig,
//   ...props
// }: withAppTypes): ReactNode {
//   const { t } = useTranslation('Header');

//   // TODO: this should be passed in as a prop instead and the react-router-dom
//   // dependency should be dropped
//   const onClickReturn = () => {
//     if (isReturnEnabled && onClickReturnButton) {
//       onClickReturnButton();
//     }
//   };

//   return (
//     <NavBar
//       isSticky={isSticky}
//       {...props}
//     >
//       <div className="relative h-[48px] items-center">
//         <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
//           <div
//             className={classNames(
//               'mr-3 inline-flex items-center',
//               isReturnEnabled && 'cursor-pointer'
//             )}
//             onClick={onClickReturn}
//             data-cy="return-to-work-list"
//           >
//             {isReturnEnabled && <Icons.ChevronClosed className="text-primary-active w-8" />}
//             <div className="ml-1">
//               {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Icons.OHIFLogo />}
//             </div>
//           </div>
//         </div>
//         <div className="absolute top-1/2 left-[250px] h-8 -translate-y-1/2">{Secondary}</div>
//         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
//           <div className="flex items-center justify-center space-x-2">{children}</div>
//         </div>
//         <div className="absolute right-0 top-1/2 flex -translate-y-1/2 select-none items-center">
//           {showPatientInfo !== PatientInfoVisibility.DISABLED && (
//             <HeaderPatientInfo
//               servicesManager={servicesManager}
//               appConfig={appConfig}
//             />
//           )}
//           <div className="border-primary-dark mx-1.5 h-[25px] border-r"></div>
//           <div className="flex-shrink-0">
//             <Dropdown
//               id="options"
//               showDropdownIcon={false}
//               list={menuOptions}
//               alignment="right"
//             >
//               <IconButton
//                 id={'options-settings-icon'}
//                 variant="text"
//                 color="inherit"
//                 size="initial"
//                 className="text-primary-active hover:bg-primary-dark h-full w-full"
//               >
//                 <Icons.ByName name="icon-settings" />
//               </IconButton>
//             </Dropdown>
//           </div>
//         </div>
//       </div>
//     </NavBar>
//   );
// }

// Header.propTypes = {
//   menuOptions: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       icon: PropTypes.string,
//       onClick: PropTypes.func.isRequired,
//     })
//   ),
//   children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
//   isReturnEnabled: PropTypes.bool,
//   isSticky: PropTypes.bool,
//   onClickReturnButton: PropTypes.func,
//   WhiteLabeling: PropTypes.object,
//   showPatientInfo: PropTypes.string,
//   servicesManager: PropTypes.object,
// };

// export default Header;
import React, { ReactNode, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { config } from '../../../../i18n/src/config';
import NavBar from '../NavBar';
import IconButton from '../IconButton';
import Dropdown from '../Dropdown';
import HeaderPatientInfo from '../HeaderPatientInfo';
import { PatientInfoVisibility } from '../../types/PatientInfoVisibility';
import { Icons } from '@ohif/ui-next';

function Header({
  children,
  menuOptions,
  isReturnEnabled = true,
  onClickReturnButton,
  isSticky = false,
  WhiteLabeling,
  showPatientInfo = PatientInfoVisibility.VISIBLE_COLLAPSED,
  servicesManager,
  Secondary,
  appConfig,
  ...props
}): ReactNode {
  const { t } = useTranslation('Header');
  const [closed, setClosed] = useState(true);

  const onClickReturn = () => {
    if (isReturnEnabled && onClickReturnButton) {
      onClickReturnButton();
    }
  };

  const LaunchClientApp = (url: string) => {
    window.open(url, '_blank', 'noreferrer');
  };

  const OpenReport = () => {
    const query = new URLSearchParams(window.location.search);
    const param = query.get('param');
    if (!param) return;

    const paramList = param.split(';');
    const ClientProtocol = 'milunchVNA';
    let url = `${ClientProtocol}://mrpt-${config.reportUrl}ReportService.asmx$D$@${paramList[0]}@`;
    url += `-${paramList[1]}-${paramList[2]}-0-0-0-0-`;

    LaunchClientApp(url);
    console.log('Launching report:', url);
  };

  const ToggleReport = () => {
    const query = new URLSearchParams(window.location.search);
    const param = query.get('creport');
    if (!param) return;

    const iframe = document.getElementById('reportIframe');
    const div = document.getElementById('reportDiv');
    const root = document.getElementById('root');

    if (iframe?.getAttribute('src') === '') {
      iframe.setAttribute(
        'src',
        `${config.reportUrl}ReportPopup/CReport.Millensys?data=${encodeURIComponent(param)}`
      );
    }

    if (div && iframe && root) {
      div.style.display = div.style.display === 'none' ? 'inline' : 'none';
      iframe.style.height = root.clientHeight + 'px';
    }
  };

  useEffect(() => {
    ToggleReport();
    const user = localStorage.getItem('loginUser');
    if (!user) return;
    // Optional: setInterval for message notifications
  }, []);

  return (
    <NavBar isSticky={isSticky} {...props}>
      <div className="relative h-[48px] items-center">
        <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center">
          <div
            className={classNames('mr-3 inline-flex items-center', isReturnEnabled && 'cursor-pointer')}
            onClick={onClickReturn}
            data-cy="return-to-work-list"
          >
            {isReturnEnabled && <Icons.ChevronClosed className="text-primary-active w-8" />}
            <div className="ml-1">
              {WhiteLabeling?.createLogoComponentFn?.(React, props) || <Icons.OHIFLogo />}
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-[250px] h-8 -translate-y-1/2">{Secondary}</div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="flex items-center justify-center space-x-2">{children}</div>
        </div>

        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 select-none items-center">
          {showPatientInfo !== PatientInfoVisibility.DISABLED && (
            <HeaderPatientInfo servicesManager={servicesManager} appConfig={appConfig} />
          )}

          <div className="border-primary-dark mx-1.5 h-[25px] border-r"></div>

          <div className="flex-shrink-0">
            <IconButton
              id="options-toggle-report"
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active hover:bg-primary-dark h-full w-full"
              onClick={ToggleReport}
            >
              <Icons.ByName name="toggle-dicom-overlay" />
            </IconButton>
          </div>

          <div className="flex-shrink-0">
            <IconButton
              id="options-launch-report"
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active hover:bg-primary-dark h-full w-full"
              onClick={OpenReport}
            >
              <Icons.ByName name="tool-stack-scroll" />
            </IconButton>
          </div>

          <div className="flex-shrink-0">
            <Dropdown
              id="options"
              showDropdownIcon={false}
              list={menuOptions}
              alignment="right"
            >
              <IconButton
                id="options-settings-icon"
                variant="text"
                color="inherit"
                size="initial"
                className="text-primary-active hover:bg-primary-dark h-full w-full"
              >
                <Icons.ByName name="icon-settings" />
              </IconButton>
            </Dropdown>
          </div>
        </div>
      </div>
    </NavBar>
  );
}

Header.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    })
  ),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isReturnEnabled: PropTypes.bool,
  isSticky: PropTypes.bool,
  onClickReturnButton: PropTypes.func,
  WhiteLabeling: PropTypes.object,
  showPatientInfo: PropTypes.string,
  servicesManager: PropTypes.object,
};

export default Header;
