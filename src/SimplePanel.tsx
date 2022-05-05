import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import Graph from "react-graph-vis";
import { forIn, map, uniqBy } from 'lodash'

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = (props) => {
  const { options, data, height, width } = props
  const { series } = data
  const [ n, e ] = series
  const nIds: string[] = []
  const eIds: string[] = []
  const titles: string[] = []
  const froms: string[] = []
  const tos: string[] = []
  const nStats: string[] = []
  const eStats: string[] = []
  map(n.fields, ({name, values}) => {
    forIn(values, (fieldValue) => {
      fieldValue.toString().split(',').filter(_ => _ !== '').map(value => {
        if(name === 'id') {
          nIds.push(value)
        }
        if(name === 'title') {
          titles.push(value)
        }
        if(name === 'mainStat') {
          nStats.push(value)
        }
      })
    })
  })
  map(e.fields, ({name, values}) => {
    forIn(values, (fieldValue) => {
      fieldValue.toString().split(',').filter(_ => _ !== '').map(value => {
        if(name === 'id') {
          eIds.push(value)
        }
        if(name === 'source') {
          froms.push(value)
        }
        if(name === 'target') {
          tos.push(value)
        }
        if(name === 'mainStat') {
          eStats.push(value)
        }
      })
    })
  })
  const t = uniqBy(map(nIds, (id, index) => ({ id, label: nStats[index] , title: titles[index]})), 'id')
  const r = uniqBy(map(eIds, (id, index) => ({ id, label: eStats[index] , to: tos[index], from: froms[index]})), 'id')
  
  const graph = {
    nodes: t,
    edges: r
  };

  const options1 = {
    layout: {
      hierarchical: options.hierarchical 
    },
    edges: {
      color: "#ffffff"
    },
    height: `${height}px`,
    width: `${width}px`,
  };

  return (
    <Graph
      graph={graph}
      options={options1}
    />
  );
};

