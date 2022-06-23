import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import Graph from 'react-graph-vis';
import { VisNodeGraphOptions } from './types';
import { createRelationshipsNode, createOptions, getSelectedNode } from './utils';
import 'vis/dist/vis-network.min';

export const VisNodeGraphPanel: React.FC<PanelProps<VisNodeGraphOptions>> = ({
  data: { series },
  height,
  width,
  options: { visNodeGraph },
}) => {
  const graph = createRelationshipsNode(series, visNodeGraph);
  const options = createOptions({ visNodeGraph, height, width });
  //@ts-ignore
  const [close, setClose] = useState(false);
  //@ts-ignore
  const [props, setProps] = useState(null);
  // const [isOpen, setIsOpen] = useState(false);
  // const onDismiss = () => setIsOpen(false);
  console.log(options);
  return (
    <Graph
      {...{
        graph,
        options,
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
              setProps(null);
              //setClose(true);
              // setIsOpen(true);
              // <ContextMenu></ContextMenu>
            }
          },
        },
      }}
    />
  );
};
