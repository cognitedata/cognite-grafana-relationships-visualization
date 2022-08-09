import React from 'react';
import { PanelProps } from '@grafana/data';
import { SingleStatBaseOptions } from '@grafana/ui';
import VisNetworkReactComponent from 'vis-network-react';
import { createRelationshipsNode, createOptions, getSelectedNode } from './utils';
import 'vis';

export const VisNodeGraphPanel: React.FC<PanelProps<SingleStatBaseOptions>> = ({
  data: { series },
  height,
  width,
  options,
}) => {
  const data = createRelationshipsNode(series, options);
  const graphOptions = createOptions({ options, height, width, series });
  // console.log(graphOptions);
  return (
    <VisNetworkReactComponent
      {...{
        options: graphOptions,
        data,
        events: {
          configChange: (obj: any) => {
            console.log('obj', obj);
          },
          showPopup: (id: any) => {
            console.log('showPopup', id);
          },
          hoverNode: (obj: any) => {
            console.log('hoverNode', obj);
          },
          select: (selected: { nodes: any; edges: any; event: any }) => {
            const { nodes, edges } = selected;
            if (nodes.length) {
              const selectedNode = getSelectedNode(data.nodes, nodes[0]);
              console.log('selected nodes: ', nodes[0], '\nselected edges: ', edges[0], '\n', selectedNode);
            }
          },
        },
      }}
    />
  );
};
