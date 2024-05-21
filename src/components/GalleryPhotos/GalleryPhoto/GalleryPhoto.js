import {
    Box,
    Card,
    Image,
    Center,
    Overlay
} from '@mantine/core';

import PropTypes from 'prop-types';
import { useHover } from '@mantine/hooks';
import { IconEye } from '@tabler/icons-react';

import classes from './GalleryPhoto.module.css';

const GalleryPhoto = ({ imageUrl }) => {
    const { hovered, ref } = useHover();

    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder ref={ref}>
                <Card.Section>
                    <Image
                        src={imageUrl}
                        h={189}
                        className={classes.galleryImage}
                    />
                    {hovered ? (
                        <Overlay color="#000" backgroundOpacity={0.35} blur={3} style={{ cursor: 'pointer' }}>
                            <Center h={189}>
                                <Box c='white' ta='center'>
                                    <IconEye/><br/>
                                    Clique para ver
                                </Box>
                            </Center>
                        </Overlay>
                    ) : ''}
                </Card.Section>
            </Card>
        </>
    )
};

GalleryPhoto.propTypes = {
    imageUrl: PropTypes.string.isRequired
};

export default GalleryPhoto
