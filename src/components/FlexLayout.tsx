import React, { useRef } from 'react';
import { Model, TabNode, Layout } from 'flexlayout-react';
import 'flexlayout-react/style/light.css';

const SplitLayout: React.FC<{ left: React.ReactNode; right: React.ReactNode }> = ({ left, right }) => {
  const layoutRef = useRef(null);

  const model = Model.fromJson({
    global: { tabEnableClose: false },
    layout: {
      type: 'row',
      children: [
        {
          type: 'tabset',
          weight: 50,
          children: [{ type: 'tab', name: 'Left Panel', component: 'left' }],
        },
        {
          type: 'tabset',
          weight: 50,
          children: [{ type: 'tab', name: 'Right Panel', component: 'right' }],
        },
      ],
    },
  });

  const factory = (node: TabNode) => {
    const component = node.getComponent();
    if (component === 'left') {
      return left;
    }
    if (component === 'right') {
      return right;
    }
    return null;
  };

  return <Layout ref={layoutRef} model={model} factory={factory} />;
};

export default SplitLayout;