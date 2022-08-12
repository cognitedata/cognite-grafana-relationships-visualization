import React, { useEffect, useRef, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SingleStatBaseOptions } from '@grafana/ui';
// import VisNetworkReactComponent from 'vis-network-react';
import { createRelationshipsNode, createOptions } from './utils';
import vis from 'vis';
import './style.css';
import { Network } from 'vis-network-react';

export const VisNodeGraphPanel: React.FC<PanelProps<SingleStatBaseOptions>> = ({
  data: { series },
  height,
  width,
  options,
}) => {
  const data = createRelationshipsNode(series, options);
  const graphOptions = createOptions({ options, height, width, series });
  const [loading, setLoading] = useState(true);
  const [widthFactor, setWidthFactor] = useState(0);
  const ref = useRef(null);
  const [network, setNetwork] = useState(() => (ref.current ? new vis.Network(ref.current, {}) : undefined));
  //console.log('graphOptions: ', graphOptions, '\noptions: ', options);
  useEffect(() => {
    setLoading(series[2]?.fields.length ? true : false);
    if (network) {
      network.setData(data);
      network.setOptions(graphOptions);
      network.stabilize();
    }
  }, [series[2], network, ref]);
  useEffect(() => {
    if (network) {
      network.setOptions(graphOptions);
    }
  }, [graphOptions, network]);
  useEffect(() => {
    let network = undefined;
    if (ref.current) {
      network = new vis.Network(ref.current, {});
      network.on('stabilizationProgress', function (params) {
        setWidthFactor(Math.round((params.iterations / params.total) * 100));
      });
      network.once('stabilizationIterationsDone', function () {
        setLoading(false);
        setWidthFactor(0);
      });
    }
    setNetwork(network as Network);
  }, [ref]);
  return (
    <div>
      <div className="outerBorder" style={{ display: loading ? 'block' : 'none' }}>
        <div id="text">${widthFactor} %</div>
        <div id="border">
          <div
            id="bar"
            style={{
              width: `${Math.max(20, widthFactor)}%`,
            }}
          ></div>
        </div>
      </div>
      <div ref={ref} />
    </div>
  );
};
