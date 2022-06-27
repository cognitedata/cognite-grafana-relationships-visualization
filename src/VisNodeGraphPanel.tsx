import React, { useMemo } from 'react';
import { PanelProps } from '@grafana/data';
import Graph from 'react-graph-vis';
import { VisNodeGraphOptions } from './types';
import { createRelationshipsNode, createOptions, getSelectedNode } from './utils';

export const VisNodeGraphPanel: React.FC<PanelProps<VisNodeGraphOptions>> = (props) => {
  const {
    data: { series },
    height,
    width,
    options,
  } = props;
  const graph = useMemo(() => createRelationshipsNode(series, options), [options, series]);
  const graphOptions = useMemo(() => createOptions({ options, height, width }), [options]);
  console.log(graphOptions);
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
