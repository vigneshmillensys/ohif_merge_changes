// import { DisplaySetService, ViewportGridService } from '@ohif/core';

// const IMAGE_SLICE_SYNC_NAME = 'IMAGE_SLICE_SYNC';
// const IMAGE_PAN_SYNC_NAME = 'IMAGE_PAN_SYNC';
// const IMAGE_VOI_SYNC_NAME = 'IMAGE_VOI_SYNC';

// export default function toggleImageSliceSync({
//   servicesManager,
//   viewports: providedViewports,
//   syncId,
// }: withAppTypes) {
//   const { syncGroupService, viewportGridService, displaySetService, cornerstoneViewportService } =
//     servicesManager.services;

//   syncId ||= IMAGE_SLICE_SYNC_NAME;

//   const viewports =
//     providedViewports || getReconstructableStackViewports(viewportGridService, displaySetService);

//   // Todo: right now we don't have a proper way to define specific
//   // viewports to add to synchronizers, and right now it is global or not
//   // after we do that, we should do fine grained control of the synchronizers
//   const someViewportHasSync = viewports.some(viewport => {
//     const syncStates = syncGroupService.getSynchronizersForViewport(
//       viewport.viewportOptions.viewportId
//     );

//     const imageSync = syncStates.find(syncState => syncState.id === syncId);

//     return !!imageSync;
//   });

//   if (someViewportHasSync) {
//     return disableSync(syncId, servicesManager);
//   }

//   // create synchronization group and add the viewports to it.
//   viewports.forEach(gridViewport => {
//     const { viewportId } = gridViewport.viewportOptions;
//     const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
//     if (!viewport) {
//       return;
//     }
//     syncGroupService.addViewportToSyncGroup(viewportId, viewport.getRenderingEngine().id, {
//       type: 'imageSlice',
//       id: syncId,
//       source: true,
//       target: true,
//     });
//   });
// }

// function disableSync(syncName, servicesManager: AppTypes.ServicesManager) {
//   const { syncGroupService, viewportGridService, displaySetService, cornerstoneViewportService } =
//     servicesManager.services;
//   const viewports = getReconstructableStackViewports(viewportGridService, displaySetService);
//   viewports.forEach(gridViewport => {
//     const { viewportId } = gridViewport.viewportOptions;
//     const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
//     if (!viewport) {
//       return;
//     }
//     syncGroupService.removeViewportFromSyncGroup(
//       viewport.id,
//       viewport.getRenderingEngine().id,
//       syncName
//     );
//   });
// }

// /**
//  * Gets the consistent spacing stack viewport types, which are the ones which
//  * can be navigated using the stack image sync right now.
//  */
// function getReconstructableStackViewports(
//   viewportGridService: ViewportGridService,
//   displaySetService: DisplaySetService
// ) {
//   let { viewports } = viewportGridService.getState();

//   viewports = [...viewports.values()];
//   // filter empty viewports
//   viewports = viewports.filter(
//     viewport => viewport.displaySetInstanceUIDs && viewport.displaySetInstanceUIDs.length
//   );

//   // filter reconstructable viewports
//   viewports = viewports.filter(viewport => {
//     const { displaySetInstanceUIDs } = viewport;

//     for (const displaySetInstanceUID of displaySetInstanceUIDs) {
//       const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);

//       // TODO - add a better test than isReconstructable
//       if (displaySet && displaySet.isReconstructable) {
//         return true;
//       }

//       return false;
//     }
//   });
//   return viewports;
// }
import { DisplaySetService, ViewportGridService } from '@ohif/core';

const IMAGE_SLICE_SYNC_NAME = 'IMAGE_SLICE_SYNC';
const IMAGE_PAN_SYNC_NAME = 'IMAGE_PAN_SYNC';
const IMAGE_VOI_SYNC_NAME = 'IMAGE_VOI_SYNC';

export default function toggleImageSliceSync({
  servicesManager,
  viewports: providedViewports,
  syncId,
}: withAppTypes) {
  const {
    syncGroupService,
    viewportGridService,
    displaySetService,
    cornerstoneViewportService,
  } = servicesManager.services;

  syncId ||= IMAGE_SLICE_SYNC_NAME;

  const viewports =
    providedViewports || getReconstructableStackViewports(viewportGridService, displaySetService);

  const someViewportHasSync = viewports.some(viewport => {
    const syncStates = syncGroupService.getSynchronizersForViewport(
      viewport.viewportOptions.viewportId
    );

    return syncStates.some(
      syncState =>
        [syncId, IMAGE_PAN_SYNC_NAME, IMAGE_VOI_SYNC_NAME].includes(syncState.id)
    );
  });

  if (someViewportHasSync) {
    return disableSync(syncId, servicesManager);
  }

  // Add syncs for slice, pan, voi
  viewports.forEach(gridViewport => {
    const { viewportId } = gridViewport.viewportOptions;
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (!viewport) {
      return;
    }

    const renderingEngineId = viewport.getRenderingEngine().id;

    syncGroupService.addViewportToSyncGroup(viewportId, renderingEngineId, {
      type: 'imageSlice',
      id: syncId,
      source: true,
      target: true,
    });

    syncGroupService.addViewportToSyncGroup(viewportId, renderingEngineId, {
      type: 'zoompan',
      id: IMAGE_PAN_SYNC_NAME,
      source: true,
      target: true,
    });

    syncGroupService.addViewportToSyncGroup(viewportId, renderingEngineId, {
      type: 'voi',
      id: IMAGE_VOI_SYNC_NAME,
      source: true,
      target: true,
    });
  });
}

function disableSync(syncId, servicesManager: AppTypes.ServicesManager) {
  const {
    syncGroupService,
    viewportGridService,
    displaySetService,
    cornerstoneViewportService,
  } = servicesManager.services;

  const viewports = getReconstructableStackViewports(viewportGridService, displaySetService);

  const syncIds = [syncId, IMAGE_PAN_SYNC_NAME, IMAGE_VOI_SYNC_NAME];

  viewports.forEach(gridViewport => {
    const { viewportId } = gridViewport.viewportOptions;
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (!viewport) {
      return;
    }

    const renderingEngineId = viewport.getRenderingEngine().id;

    syncIds.forEach(id => {
      syncGroupService.removeViewportFromSyncGroup(viewportId, renderingEngineId, id);
    });
  });
}

function getReconstructableStackViewports(
  viewportGridService: ViewportGridService,
  displaySetService: DisplaySetService
) {
  let { viewports } = viewportGridService.getState();
  viewports = [...viewports.values()].filter(
    viewport => viewport.displaySetInstanceUIDs?.length
  );

  return viewports.filter(viewport => {
    return viewport.displaySetInstanceUIDs.some(uid => {
      const displaySet = displaySetService.getDisplaySetByUID(uid);
      return displaySet?.isReconstructable;
    });
  });
}
