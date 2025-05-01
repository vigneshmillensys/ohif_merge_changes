// export default {
//   measurementsContextMenu: {
//     inheritsFrom: 'ohif.contextMenu',
//     menus: [
//       // Get the items from the UI Customization for the menu name (and have a custom name)
//       {
//         id: 'forExistingMeasurement',
//         selector: ({ nearbyToolData }) => !!nearbyToolData,
//         items: [
//           {
//             label: 'Delete measurement',
//             commands: 'removeMeasurement',
//           },
//           {
//             label: 'Add Label',
//             commands: 'setMeasurementLabel',
//           },
          
//         ],
//       },
//     ],
//   },
// };
export default {
  measurementsContextMenu: {
    inheritsFrom: 'ohif.contextMenu',
    menus: [
      {
        id: 'forExistingMeasurement',
        selector: ({ nearbyToolData }) => !!nearbyToolData,
        items: [
          {
            label: 'Delete measurement',
            commands: 'deleteMeasurement',
          },
          {
            label: 'Add Label',
            commands: 'setMeasurementLabel',
          },
        ],
      },
      {
        id: 'generalmenu',
        items: [
          {
            label: 'Flip Vertical',
            commands: 'flipViewportVertical',
          },
          {
            label: 'Flip Horizontal',
            commands: 'flipViewportHorizontal',
          },
          {
            label: 'Rotate Right',
            commands: 'rotateViewportCW',
          },
          {
            label: 'Rotate Left',
            commands: 'rotateViewportCCW',
          },
          {
            label: 'Fit',
            commands: 'fitViewportToWindow',
          },
          
        ],
      },
    ],
  },
};
