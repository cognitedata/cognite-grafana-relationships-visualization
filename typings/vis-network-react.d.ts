/* eslint-disable @typescript-eslint/naming-convention */
//You must first install the vis and react types 'npm install --save-dev @types/vis @types/react'
declare module 'vis-network-react' {
  import { Network, NetworkEvents, Options, Node, Edge, DataSet } from 'vis';
  import { Component } from 'react';

  export { Network, NetworkEvents, Options, Node, Edge, DataSet } from 'vis';

  export interface graphEvents {
    [event: NetworkEvents]: (params?: any) => void;
  }

  //Doesn't appear that this module supports passing in a vis.DataSet directly. Once it does graph can just use the Data object from vis.
  export interface graphData {
    nodes: Node[];
    edges: Edge[];
  }

  export interface NetworkGraphProps {
    data: graphData;
    options?: Options;
    events?: graphEvents;
  }

  export interface NetworkGraphState {
    identifier: string;
  }

  export default class NetworkGraph extends Component<NetworkGraphProps, NetworkGraphState> {
    render();
  }
}