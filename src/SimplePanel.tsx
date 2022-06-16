import React, { useEffect, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from './types';
import Graph from 'react-graph-vis';
import _ from 'lodash';

type Props = PanelProps<SimpleOptions>;

export const SimplePanel: React.FC<Props> = (props) => {
  const {
    options: { hierarchical, edgesColor, nodesColor },
    data: {
      series: [nodes, edges],
    },
    height,
    width,
  } = props;
  const [nIds, setNids] = useState(['']);
  const [eIds, setEids] = useState(['']);
  const [titles, setTitles] = useState(['']);
  const [froms, setFroms] = useState(['']);
  const [tos, setTos] = useState(['']);
  const [nStats, setNStats] = useState(['']);
  const [eStats, setEStats] = useState(['']);
  useEffect(() => {
    const nIds: string[] = [];
    const eIds: string[] = [];
    const titles: string[] = [];
    const froms: string[] = [];
    const tos: string[] = [];
    const nStats: string[] = [];
    const eStats: string[] = [];

    console.log(props);
    _.map(_.get(nodes, 'fields'), ({ name, values }) => {
      _.forIn(values, (fieldValue) => {
        fieldValue
          .toString()
          .split(',')
          .filter((_) => _ !== '')
          .map((value) => {
            if (name === 'id') {
              nIds.push(value);
            }
            if (name === 'title') {
              titles.push(value);
            }
            if (name === 'mainStat') {
              nStats.push(value);
            }
          });
      });
    });
    _.map(_.get(edges, 'fields'), ({ name, values }) => {
      _.forIn(values, (fieldValue) => {
        fieldValue
          .toString()
          .split(',')
          .filter((_) => _ !== '')
          .map((value) => {
            if (name === 'id') {
              eIds.push(value);
            }
            if (name === 'source') {
              froms.push(value);
            }
            if (name === 'target') {
              tos.push(value);
            }
            if (name === 'mainStat') {
              eStats.push(value);
            }
          });
      });
    });

    setNids(nIds);
    setEids(eIds);
    setTitles(titles);
    setFroms(froms);
    setTos(tos);
    setNStats(nStats);
    setEStats(eStats);
  }, [nodes, edges]);
  return (
    <Graph
      {...{
        graph: {
          nodes: _.uniqBy(
            _.map(nIds, (id, index) => ({ id, label: nStats[index], title: titles[index] })),
            'id'
          ),
          edges: _.uniqBy(
            _.map(eIds, (id, index) => ({ id, label: eStats[index], to: tos[index], from: froms[index] })),
            'id'
          ),
        },
        options: {
          layout: {
            hierarchical,
          },
          nodes: {
            color: nodesColor ?? '#eee',
          },
          edges: {
            color: edgesColor ?? '#fff',
          },
          height: `${height}px`,
          width: `${width}px`,
        },
        events: {
          select: (selected: { nodes: any; edges: any }) => {
            const { nodes, edges } = selected;
            console.log('Selected nodes: ', nodes, '\nSelected edges: ', edges);
          },
        },
        getNetwork: (network: any) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
          console.log('network: ', network);
        },
      }}
    />
  );
};
