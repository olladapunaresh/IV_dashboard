import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as BarIcons from 'react-icons/bi';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Incident Map',
    path: '/Map',
    icon: <FaIcons.FaMapMarkedAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Accidents weekly',
    path: '/barchart',
    icon: <BarIcons.BiBarChartAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Accidents Timeline',
    path: '/chart',
    icon: <MdIcons.MdTimeline />,
    cName: 'nav-text'
  },
  {
    title: 'Dangerous Roads',
    path: '/treemap',
    icon: <FaIcons.FaTree />,
    cName: 'nav-text'
  }
];
