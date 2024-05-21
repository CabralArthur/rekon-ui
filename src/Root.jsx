import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';

import { RouterProvider } from 'react-router-dom';

import '@mantine/carousel/styles.css';
import '@mantine/core/styles.css';

import store from './app/store'
import { createRouter } from './app/routes';

import 'dayjs/locale/pt-br';

import './Root.css';

dayjs.locale('pt-br');
dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

const Root = () => {
    const theme = [
        "#ffeaec",
        "#fdd4d6",
        "#f4a7ac",
        "#ec777e",
        "#e64f57",
        "#e3353f",
        "#e22732",
        "#c91a25",
        "#b31220",
        "#9e0419"
    ];

	const router = createRouter();

	return (
        <Provider store={store}>
            <MantineProvider theme={theme}>
                <ModalsProvider modalProps={{ centered: true }}>
                    <RouterProvider router={router} />
                </ModalsProvider>
            </MantineProvider>
        </Provider>
	);
};

export default Root;
