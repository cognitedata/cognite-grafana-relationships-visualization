import React, { useMemo } from 'react';
import { PanelProps } from '@grafana/data';
import Graph from 'react-graph-vis';
import { VisNodeGraphOptions } from './types';
import { createRelationshipsNode, createOptions } from './utils';

export const VisNodeGraphPanel: React.FC<PanelProps<VisNodeGraphOptions>> = ({
  data: { series },
  height,
  width,
  options: { visNodeGraph },
}) => {
  //console.log(visNodeGraph);
  return (
    <Graph
      {...{
        graph: useMemo(() => createRelationshipsNode(series), [series]),
        options: useMemo(() => createOptions({ visNodeGraph, height, width }), [visNodeGraph]),
        events: {
          select: (selected: { nodes: any; edges: any; event: any }) => {
            const {
              nodes,
              edges,
              event: {
                center: { x, y },
              },
            } = selected;
            if (nodes.length) {
              console.log('Selected nodes: ', nodes, '\nSelected edges: ', edges, '\ncenter: ', x, y);
            }
          },
        },
      }}
    />
  );
};
