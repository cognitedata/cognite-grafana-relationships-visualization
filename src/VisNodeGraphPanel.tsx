import React from 'react';
import { PanelProps } from '@grafana/data';
import Graph from 'react-graph-vis';
import { VisNodeGraphOptions } from './types';
import { createRelationshipsNode, createOptions, getSelectedNode } from './utils';

export const VisNodeGraphPanel: React.FC<PanelProps<VisNodeGraphOptions>> = ({
  data: { series },
  height,
  width,
  options: { visNodeGraph },
}) => {
  const graph = createRelationshipsNode(series, visNodeGraph);
  const options = createOptions({ visNodeGraph, height, width });
  // const [isOpen, setIsOpen] = useState(false);
  // const onDismiss = () => setIsOpen(false);
  return (
    <Graph
      {...{
        graph,
        options,
        events: {
          select: (selected: { nodes: any; edges: any; event: any }) => {
            const { nodes, edges } = selected;
            if (nodes.length) {
              const selectedNode = getSelectedNode(graph.nodes, nodes[0]);
              console.log('selected nodes: ', nodes[0], '\nselected edges: ', edges[0], '\n', selectedNode);
              // setIsOpen(true);
            }
          },
        },
      }}
    />
  );
};
