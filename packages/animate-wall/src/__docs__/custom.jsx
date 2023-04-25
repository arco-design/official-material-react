import React from 'react';
import AnimateWall from '@arco-materials/animate-wall';

const colorMap = [
  '#F76560',
  '#F99057',
  '#FF9A2E',
  '#F9CC45',
  '#FBE842',
  '#B5E241',
  '#23C343',
  '#37D4CF',
  '#57A9FB',
];

const customDivs = colorMap.map((color, index) => {
  return () => (
    <div style={{ width: '30px', display: 'flex', flexWrap: 'wrap' }} key={index}>
      {new Array(9).fill(0).map((_, _index) => {
        return (
          <div
            className="custom-div"
            style={{
              width: '10px',
              height: '10px',
              background: _index % 2 === 0 ? color : 'transplant',
            }}
            key={`${index}-${_index}`}
          />
        );
      })}
    </div>
  );
});

export default () => {
  return <AnimateWall elementList={customDivs} atomSelector=".custom-div" />;
};
