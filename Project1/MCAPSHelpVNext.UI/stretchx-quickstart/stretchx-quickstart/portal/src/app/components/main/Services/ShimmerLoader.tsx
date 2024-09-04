import React from 'react';
import { Shimmer, ShimmerElementType, Stack } from '@fluentui/react';

const ShimmerLoader = ({ count }) => {
  const generateUniqueKey = () => {
    return Math.random().toString(36).slice(2, 11); 
  };

  return (
    <Stack styles={{ root: { width: '97%', paddingLeft: 4, paddingTop: 20 } }}>
      <Stack>
        <Shimmer
          shimmerElements={[
            { type: ShimmerElementType.line, height: 30, width: '100%' },
          ]}
        />
      </Stack>
      <Stack styles={{ root: { width: '100%', marginBottom: '16px' } }}>
      </Stack>
      <Stack>
        {[...Array(count)].map(() => (
          <Stack key={generateUniqueKey()} horizontal styles={{ root: { width: '100%', marginBottom: '16px' } }}>
            {[...Array(4)].map(() => (
              <Stack key={generateUniqueKey()} styles={{ root: { minWidth: '230px', width: '230px', marginRight: '16px' } }}>
                <Shimmer
                  shimmerElements={[
                    { type: ShimmerElementType.line, height: 135, width: 230 },
                    { type: ShimmerElementType.gap, width: 16 },
                  ]}
                />
              </Stack>
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ShimmerLoader;
