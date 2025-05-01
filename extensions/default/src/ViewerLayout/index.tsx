// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import PropTypes from 'prop-types';

// import { InvestigationalUseDialog } from '@ohif/ui-next';
// import { HangingProtocolService, CommandsManager } from '@ohif/core';
// import { useAppConfig } from '@state';
// import ViewerHeader from './ViewerHeader';
// import SidePanelWithServices from '../Components/SidePanelWithServices';
// import { Onboarding, ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@ohif/ui-next';
// import useResizablePanels from './ResizablePanelsHook';

// const resizableHandleClassName = 'mt-[1px] bg-black';

// function ViewerLayout({
//   // From Extension Module Params
//   extensionManager,
//   servicesManager,
//   hotkeysManager,
//   commandsManager,
//   // From Modes
//   viewports,
//   ViewportGridComp,
//   leftPanelClosed = false,
//   rightPanelClosed = false,
//   leftPanelResizable = false,
//   rightPanelResizable = false,
// }: withAppTypes): React.FunctionComponent {
//   const [appConfig] = useAppConfig();

//   const { panelService, hangingProtocolService, customizationService } = servicesManager.services;
//   const [showLoadingIndicator, setShowLoadingIndicator] = useState(appConfig.showLoadingIndicator);

//   const hasPanels = useCallback(
//     (side): boolean => !!panelService.getPanels(side).length,
//     [panelService]
//   );

//   const [hasRightPanels, setHasRightPanels] = useState(hasPanels('right'));
//   const [hasLeftPanels, setHasLeftPanels] = useState(hasPanels('left'));
//   const [leftPanelClosedState, setLeftPanelClosed] = useState(leftPanelClosed);
//   const [rightPanelClosedState, setRightPanelClosed] = useState(rightPanelClosed);

//   const [
//     leftPanelProps,
//     rightPanelProps,
//     resizablePanelGroupProps,
//     resizableLeftPanelProps,
//     resizableViewportGridPanelProps,
//     resizableRightPanelProps,
//     onHandleDragging,
//   ] = useResizablePanels(
//     leftPanelClosed,
//     setLeftPanelClosed,
//     rightPanelClosed,
//     setRightPanelClosed,
//     hasLeftPanels,
//     hasRightPanels
//   );

//   const handleMouseEnter = () => {
//     (document.activeElement as HTMLElement)?.blur();
//   };

//   const LoadingIndicatorProgress = customizationService.getCustomization(
//     'ui.loadingIndicatorProgress'
//   );

//   /**
//    * Set body classes (tailwindcss) that don't allow vertical
//    * or horizontal overflow (no scrolling). Also guarantee window
//    * is sized to our viewport.
//    */
//   useEffect(() => {
//     document.body.classList.add('bg-black');
//     document.body.classList.add('overflow-hidden');

//     return () => {
//       document.body.classList.remove('bg-black');
//       document.body.classList.remove('overflow-hidden');
//     };
//   }, []);

//   const getComponent = id => {
//     const entry = extensionManager.getModuleEntry(id);

//     if (!entry || !entry.component) {
//       throw new Error(
//         `${id} is not valid for an extension module or no component found from extension ${id}. Please verify your configuration or ensure that the extension is properly registered. It's also possible that your mode is utilizing a module from an extension that hasn't been included in its dependencies (add the extension to the "extensionDependencies" array in your mode's index.js file). Check the reference string to the extension in your Mode configuration`
//       );
//     }

//     return { entry };
//   };

//   useEffect(() => {
//     const { unsubscribe } = hangingProtocolService.subscribe(
//       HangingProtocolService.EVENTS.PROTOCOL_CHANGED,

//       // Todo: right now to set the loading indicator to false, we need to wait for the
//       // hangingProtocolService to finish applying the viewport matching to each viewport,
//       // however, this might not be the only approach to set the loading indicator to false. we need to explore this further.
//       () => {
//         setShowLoadingIndicator(false);
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, [hangingProtocolService]);

//   const getViewportComponentData = viewportComponent => {
//     const { entry } = getComponent(viewportComponent.namespace);

//     return {
//       component: entry.component,
//       isReferenceViewable: entry.isReferenceViewable,
//       displaySetsToDisplay: viewportComponent.displaySetsToDisplay,
//     };
//   };

//   useEffect(() => {
//     const { unsubscribe } = panelService.subscribe(
//       panelService.EVENTS.PANELS_CHANGED,
//       ({ options }) => {
//         setHasLeftPanels(hasPanels('left'));
//         setHasRightPanels(hasPanels('right'));
//         if (options?.leftPanelClosed !== undefined) {
//           setLeftPanelClosed(options.leftPanelClosed);
//         }
//         if (options?.rightPanelClosed !== undefined) {
//           setRightPanelClosed(options.rightPanelClosed);
//         }
//       }
//     );

//     return () => {
//       unsubscribe();
//     };
//   }, [panelService, hasPanels]);

//   const viewportComponents = viewports.map(getViewportComponentData);

//   return (
//     <div>
//       <ViewerHeader
//         hotkeysManager={hotkeysManager}
//         extensionManager={extensionManager}
//         servicesManager={servicesManager}
//         appConfig={appConfig}
//       />
//       <div
//         className="relative flex w-full flex-row flex-nowrap items-stretch overflow-hidden bg-black"
//         style={{ height: 'calc(100vh - 52px' }}
//       >
//         <React.Fragment>
//           {showLoadingIndicator && <LoadingIndicatorProgress className="h-full w-full bg-black" />}
//           <ResizablePanelGroup {...resizablePanelGroupProps}>
//             {/* LEFT SIDEPANELS */}
//             {hasLeftPanels ? (
//               <>
//                 <ResizablePanel {...resizableLeftPanelProps}>
//                   <SidePanelWithServices
//                     side="left"
//                     isExpanded={!leftPanelClosedState}
//                     servicesManager={servicesManager}
//                     {...leftPanelProps}
//                   />
//                 </ResizablePanel>
//                 <ResizableHandle
//                   onDragging={onHandleDragging}
//                   disabled={!leftPanelResizable}
//                   className={resizableHandleClassName}
//                 />
//               </>
//             ) : null}
//             {/* TOOLBAR + GRID */}
//             <ResizablePanel {...resizableViewportGridPanelProps}>
//               <div className="main-v flex h-full flex-1 flex-col">
//                 <div
//                   className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
//                   onMouseEnter={handleMouseEnter}
//                 >
//                   <ViewportGridComp
//                     servicesManager={servicesManager}
//                     viewportComponents={viewportComponents}
//                     commandsManager={commandsManager}
//                   />
//                 </div>
//               </div>
//             </ResizablePanel>
//             {hasRightPanels ? (
//               <>
//                 <ResizableHandle
//                   onDragging={onHandleDragging}
//                   disabled={!rightPanelResizable}
//                   className={resizableHandleClassName}
//                 />
//                 <ResizablePanel {...resizableRightPanelProps}>
//                   <SidePanelWithServices
//                      side="right"
//                     isExpanded={!rightPanelClosedState}
//                     servicesManager={servicesManager}
//                     {...rightPanelProps}
//                   />
//                 </ResizablePanel>
//               </>
//             ) : null}
//           </ResizablePanelGroup>
//         </React.Fragment>
//       </div>
//       <Onboarding tours={customizationService.getCustomization('ohif.tours')} />
//       <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} />
//     </div>
//   );
// }

// ViewerLayout.propTypes = {
//   // From extension module params
//   extensionManager: PropTypes.shape({
//     getModuleEntry: PropTypes.func.isRequired,
//   }).isRequired,
//   commandsManager: PropTypes.instanceOf(CommandsManager),
//   servicesManager: PropTypes.object.isRequired,
//   // From modes
//   leftPanels: PropTypes.array,
//   rightPanels: PropTypes.array,
//   leftPanelClosed: PropTypes.bool.isRequired,
//   rightPanelClosed: PropTypes.bool.isRequired,
//   /** Responsible for rendering our grid of viewports; provided by consuming application */
//   children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
//   viewports: PropTypes.array,
// };

// export default ViewerLayout;
import React, { useEffect, useState, useCallback , useRef } from 'react';
import PropTypes from 'prop-types';

import { ErrorBoundary, LoadingIndicatorProgress, InvestigationalUseDialog } from '@ohif/ui';
import { HangingProtocolService, CommandsManager } from '@ohif/core';
import { useAppConfig } from '@state';
import ViewerHeader from './ViewerHeader';
import SidePanelWithServices from '../Components/SidePanelWithServices';

function ViewerLayout({
  // From Extension Module Params
  extensionManager,
  servicesManager,
  hotkeysManager,
  commandsManager,
  // From Modes
  viewports,
  ViewportGridComp,
  leftPanelClosed = false,
  rightPanelClosed = false,
}: withAppTypes): React.FunctionComponent {
  const [appConfig] = useAppConfig();

  const { panelService, hangingProtocolService } = servicesManager.services;
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(appConfig.showLoadingIndicator);

  const hasPanels = useCallback(
    (side): boolean => !!panelService.getPanels(side).length,
    [panelService]
  );
  //================================== resizing screen
  // const [isGreaterThan740px, setIsGreaterThan740px] = useState(true);
  //====================

  const [hasRightPanels, setHasRightPanels] = useState(hasPanels('right'));
  const [hasLeftPanels, setHasLeftPanels] = useState(hasPanels('left'));
  const [leftPanelClosedState, setLeftPanelClosed] = useState(window.innerWidth === 740 ||  window.innerWidth <740 );
  const [rightPanelClosedState, setRightPanelClosed] = useState(rightPanelClosed);



  /**
   * Set body classes (tailwindcss) that don't allow vertical
   * or horizontal overflow (no scrolling). Also guarantee window
   * is sized to our viewport.
   */
  useEffect(() => {
    document.body.classList.add('bg-black');
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('bg-black');
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  //============================== //setLeftPanelClosed //make it on small screen true
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth === 740 ||  window.innerWidth <740 ) {
        setLeftPanelClosed(true);
      } else {
        setLeftPanelClosed(false);
      }
    }
    // handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //=============================make it true here
  const ref = useRef(null)
  //============================
  // useEffect(() => {
  //   const portal = document.getElementById('portal___');

  //   const disablePinchZoom = (e) => {
  //     const firstTouch = e.touches[0];
  //     const event = new MouseEvent('mousedown', {
  //       bubbles: true,
  //       cancelable: true,
  //       view: firstTouch?.view,
  //       screenX: firstTouch?.screenX,
  //       screenY: firstTouch?.screenY,
  //       clientX: firstTouch?.clientX,
  //       clientY: firstTouch?.clientY,
  //     });

  //     console.log('manakhly', e, event);

  //     portal.dispatchEvent(event);
  //   };

  //   portal.addEventListener('touchstart', disablePinchZoom);

  //   return () => {
  //     portal.removeEventListener('touchstart', disablePinchZoom);
  //   };
  // }, []);

  // //============================
  // useEffect(() => {
  //   // const target = ref.current
  //   // if (!target) return
  //     //     if (e.touches.length === 1) {
  //     //   e.preventDefault()
  //     //   console.log('do somthing here')
  //     // }
  //   const portal = document.getElementById('portal___');
  //   const disablePinchZoom = (e) => {
  //     let first =   e.touches[0]
  //     const event = new MouseEvent('mousemove',{
  //       bubbles: true,
  //       cancelable : true,
  //       view: first?.view,
  //       screenX : first?.screenX, screenY : first?.screenY,
  //       clientX : first?.clientX, clientY: first?.clientY,
  //     })
  //     console.log('manakhly' , e , event)

  //     portal.dispatchEvent(event);
  //   }
  //   portal.addEventListener("touchmove", disablePinchZoom)
  //   return () => {
  //     portal.removeEventListener("touchmove", disablePinchZoom)
  //   }
  // }, [])
  // useEffect(() => {
  //   // const target = ref.current
  //   // if (!target) return
  //     //     if (e.touches.length === 1) {
  //     //   e.preventDefault()
  //     //   console.log('do somthing here')
  //     // }
  //   const portal = document.getElementById('portal___');
  //   const disablePinchZoom = (e) => {
  //     let first =   e.touches[0]
  //     const event = new MouseEvent('mouseup',{
  //       bubbles: true,
  //       cancelable : true,
  //       view: first?.view,
  //       screenX : first?.screenX, screenY : first?.screenY,
  //       clientX : first?.clientX, clientY: first?.clientY,
  //     })
  //     console.log('manakhly' , e , event)

  //     portal.dispatchEvent(event);
  //   }
  //   portal.addEventListener("touchend", disablePinchZoom)
  //   return () => {
  //     portal.removeEventListener("touchend", disablePinchZoom)
  //   }
  // }, [])
  //=================================================

  const getComponent = id => {
    const entry = extensionManager.getModuleEntry(id);

    if (!entry || !entry.component) {
      throw new Error(
        `${id} is not valid for an extension module or no component found from extension ${id}. Please verify your configuration or ensure that the extension is properly registered. It's also possible that your mode is utilizing a module from an extension that hasn't been included in its dependencies (add the extension to the "extensionDependencies" array in your mode's index.js file). Check the reference string to the extension in your Mode configuration`
      );
    }

    return { entry, content: entry.component };
  };

  useEffect(() => {
    const { unsubscribe } = hangingProtocolService.subscribe(
      HangingProtocolService.EVENTS.PROTOCOL_CHANGED,

      // Todo: right now to set the loading indicator to false, we need to wait for the
      // hangingProtocolService to finish applying the viewport matching to each viewport,
      // however, this might not be the only approach to set the loading indicator to false. we need to explore this further.
      () => {
        setShowLoadingIndicator(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [hangingProtocolService]);

  const getViewportComponentData = viewportComponent => {
    const { entry } = getComponent(viewportComponent.namespace);

    return {
      component: entry.component,
      displaySetsToDisplay: viewportComponent.displaySetsToDisplay,
    };
  };

  useEffect(() => {
    const { unsubscribe } = panelService.subscribe(
      panelService.EVENTS.PANELS_CHANGED,
      ({ options }) => {
        setHasLeftPanels(hasPanels('left'));
        setHasRightPanels(hasPanels('right'));
        if (options?.leftPanelClosed !== undefined) {
          setLeftPanelClosed(options.leftPanelClosed);
        }
        if (options?.rightPanelClosed !== undefined) {
          setRightPanelClosed(options.rightPanelClosed);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [panelService, hasPanels]);

  const viewportComponents = viewports.map(getViewportComponentData);


  return (
    <div>
      <ViewerHeader
        hotkeysManager={hotkeysManager}
        extensionManager={extensionManager}
        servicesManager={servicesManager}
        appConfig={appConfig}
        // ref={ref}
      />
      <div
        className="relative flex w-full flex-row flex-nowrap items-stretch overflow-hidden bg-black"
        style={{ height: 'calc(100vh - 52px' }}
      >
        <React.Fragment>
          {showLoadingIndicator && <LoadingIndicatorProgress className="h-full w-full bg-black" />}
          {/* LEFT SIDEPANELS */}
          {hasLeftPanels ? (
            <ErrorBoundary context="Left Panel">
              <SidePanelWithServices
                side="left"
                activeTabIndex={leftPanelClosedState ? null : 0}
                servicesManager={servicesManager}
              />
            </ErrorBoundary>
          ) : null}
          {/* TOOLBAR + GRID */}
          <div className="main-v flex h-full flex-1 flex-col" >
            {/* onTouchMove={touchmoveHandler}  onMouseMove={()=>{console.log('YEH')}} */}
            <div className="relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black" ref={ref} id='portal___' >
              <ErrorBoundary context="Grid">
                <ViewportGridComp
                  servicesManager={servicesManager}
                  viewportComponents={viewportComponents}
                  commandsManager={commandsManager}
                />
              </ErrorBoundary>
            </div>
          </div>
          {hasRightPanels ? (
            <ErrorBoundary context="Right Panel">
              <SidePanelWithServices
                side="right"
                activeTabIndex={rightPanelClosedState ? null : 0}
                servicesManager={servicesManager}
                // ref={ref}
              />
            </ErrorBoundary>
          ) : null}
        </React.Fragment>
      </div>

      {/* <InvestigationalUseDialog dialogConfiguration={appConfig?.investigationalUseDialog} /> */}
    </div>
  );
}

ViewerLayout.propTypes = {
  // From extension module params
  extensionManager: PropTypes.shape({
    getModuleEntry: PropTypes.func.isRequired,
  }).isRequired,
  commandsManager: PropTypes.instanceOf(CommandsManager),
  servicesManager: PropTypes.object.isRequired,
  // From modes
  leftPanels: PropTypes.array,
  rightPanels: PropTypes.array,
  leftPanelClosed: PropTypes.bool.isRequired,
  rightPanelClosed: PropTypes.bool.isRequired,
  /** Responsible for rendering our grid of viewports; provided by consuming application */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  viewports: PropTypes.array,
};

export default ViewerLayout;
