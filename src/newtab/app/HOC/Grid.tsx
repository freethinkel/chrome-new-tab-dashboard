import { useStore } from 'nanostores/react';
import React, { FC } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { settings } from '../store';

const GridLayout = WidthProvider(RGL);

type GridProps = {};

export const Grid: FC<GridProps> = ({ children }) => {
	const { layout } = useStore(settings.store);
	return (
		<GridLayout
			cols={12}
			onLayoutChange={(newLayout) =>
				settings.updateSetting({
					layout: newLayout,
				})
			}
			useCSSTransforms={true}
			layout={layout}
		>
			{children}
		</GridLayout>
	);
};
