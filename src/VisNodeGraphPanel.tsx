import React, { useEffect, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { VisNodeGraphOptions } from './types';
import Graph from 'react-graph-vis';
import _ from 'lodash';

type Props = PanelProps<VisNodeGraphOptions>;

export const VisNodeGraphPanel: React.FC<Props> = (props) => {
  const {
    options: { hierarchical, edgesColor, nodesColor, shape, length },
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

  const regenerateNodesAndEdges = () => {
    const nIds: string[] = [];
    const eIds: string[] = [];
    const titles: string[] = [];
    const froms: string[] = [];
    const tos: string[] = [];
    const nStats: string[] = [];
    const eStats: string[] = [];

    const fields = _.get(nodes, 'fields');
    const titleFileds = _.find(fields, { name: 'title' });
    const statsField = _.find(fields, { name: 'mainStat' });
    // @ts-ignore
    _.map(_.head(_.values(nodes?.first)), (id, index) => {
      _.map(fields, ({ name, values }) => {
        _.forIn(values, (fieldValues: any | undefined[]) => {
          const fieldValue = fieldValues[index];
          if (name === 'id') {
            nIds.push(fieldValue);
          }
          if (name === 'title') {
            // @ts-ignore
            titles.push(fieldValue ? fieldValue : _.values(statsField?.values)[0][index]);
          }
          if (name === 'mainStat') {
            // @ts-ignore
            nStats.push(fieldValue ? fieldValue : _.values(titleFileds?.values)[0][index]);
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
  };
  useEffect(() => {
    regenerateNodesAndEdges();
  }, [nodes, edges]);

  return (
    // @ts-ignore
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
            shape: shape.id ? shape.id : 'ellipse',
            title: 'titles',
          },
          edges: {
            color: edgesColor ?? '#fff',
            length,
          },
          height: `${height}px`,
          width: `${width}px`,
        },
        events: {
          // @ts-ignore
          select: (selected: { nodes: any; edges: any }, ...rest) => {
            const { nodes, edges, ...all } = selected;
            console.log('Selected nodes: ', nodes, '\nSelected edges: ', edges, rest, all);
          },
        },
      }}
    />
  );
};
