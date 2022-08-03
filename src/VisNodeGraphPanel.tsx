import React from 'react';
import { PanelProps } from '@grafana/data';
import { SingleStatBaseOptions } from '@grafana/ui';
import Graph from 'react-graph-vis';
import { createRelationshipsNode, createOptions, getSelectedNode } from './utils';

export const VisNodeGraphPanel: React.FC<PanelProps<SingleStatBaseOptions>> = (props) => {
  const {
    data: { series },
    height,
    width,
    options,
  } = props;
  const graph = createRelationshipsNode(series, options);
  const graphOptions = createOptions({ options, height, width, series });
  // console.log(series, options);
  return (
    <Graph
      {...{
        graph,
        options: graphOptions,
        events: {
          showPopup: (id: any) => {
            console.log('showPopup', id);
          },
          hoverNode: (obj: any) => {
            console.log('hoverNode', obj);
          },
          select: (selected: { nodes: any; edges: any; event: any }) => {
            const { nodes, edges } = selected;
            if (nodes.length) {
              const selectedNode = getSelectedNode(graph.nodes, nodes[0]);
              console.log('selected nodes: ', nodes[0], '\nselected edges: ', edges[0], '\n', selectedNode);
            }
          },
        },
      }}
    />
  );
};
