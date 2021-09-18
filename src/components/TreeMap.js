import { treemap } from 'd3-hierarchy';
import React, { Component } from 'react';
import tableau from 'tableau-api';
 
 
class TreeMap extends Component {
  componentDidMount() {
    this.initViz()
  }
 
 
  initViz() {
    const vizUrl = 'https://public.tableau.com/views/Assignment_1_16317869301710/AccidentRoadZones?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link';
    const vizContainer = this.vizContainer;
    let viz = new window.tableau.Viz(vizContainer, vizUrl)
  }
 
 
  render() {
    return (
      <div ref={(div) => { this.vizContainer = div }}>
      </div>
    )
  }
}
 
 
export default TreeMap;