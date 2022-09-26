import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AppEvent, eventFactory, PanelProps } from '@grafana/data';
import { SingleStatBaseOptions } from '@grafana/ui';
import { SystemJS } from '@grafana/runtime';
import { createRelationshipsNode, createOptions } from './utils';
import vis from 'vis';
import './style.css';
interface QueryWarning {
  nodes: string[];
}
const appEventsLoader = SystemJS.load('app/core/app_events');
const visNodeGraphPanelClickEvent = eventFactory<QueryWarning>('vis-node-graph-panel-click-event');

export const VisNodeGraphPanel: React.FC<PanelProps<SingleStatBaseOptions>> = ({
  data: { series },
  height,
  width,
  options,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const data = createRelationshipsNode(series, options);
  const graphOptions = createOptions({ options, height, width, series });
  const [loading, setLoading] = useState(true);
  const [widthFactor, setWidthFactor] = useState(0);
  const [refVisible, setRefVisible] = useState(false);
  const network = useMemo(() => {
    let network;
    if (ref.current) {
      network = new vis.Network(ref.current, {});
    }
    return network;
  }, [refVisible]);

  useEffect(() => {
    setLoading(series[2]?.fields.length ? true : false);
    if (network) {
      network.setData(data);
      network.setOptions(graphOptions);
      network.stabilize();
      network.on('stabilizationProgress', function (params) {
        setWidthFactor(Math.round((params.iterations / params.total) * 100));
      });
      network.once('stabilizationIterationsDone', function () {
        setLoading(false);
        setWidthFactor(0);
      });
    }
  }, [series[2], network]);
  useEffect(() => {
    if (network) {
      network.setOptions(graphOptions);
    }
  }, [graphOptions, network]);
  async function emitEvent<T>(event: AppEvent<T>, payload: T): Promise<void> {
    const appEvents = await appEventsLoader;
    return appEvents.emit(event, payload);
  }
  const eventsSubscribe = async () => {
    network?.on('selectNode', ({ nodes }) => {
      emitEvent(visNodeGraphPanelClickEvent, { nodes });
    });
  };
  const eventsUnsubscribe = async () => {
    network?.off('selectNode', ({ nodes }) => {
      console.log('e off', nodes);
    });
  };
  useEffect(() => {
    eventsSubscribe();
    return () => {
      eventsUnsubscribe();
    };
  }, [network]);
  return (
    <div>
      <div className="outerBorder" style={{ display: loading ? 'block' : 'none' }}>
        <div id="text">{widthFactor} %</div>
        <div id="border">
          <div
            id="bar"
            style={{
              width: `${Math.max(0, widthFactor)}%`,
            }}
          ></div>
        </div>
      </div>
      <div
        ref={(el) => {
          ref.current = el;
          setRefVisible(!!el);
        }}
      />
    </div>
  );
};
