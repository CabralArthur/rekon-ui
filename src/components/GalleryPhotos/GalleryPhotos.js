import PropTypes from 'prop-types';
import {
    Grid,
    Title,
    Center,
    Skeleton,
    Flex
} from '@mantine/core';

import { IconPhotoOff } from '@tabler/icons-react';
import GalleryPhotoContainer from './GalleryPhoto';

const renderItem = (item, onPhotoClick) => {
    return item.data.map((item, index) => {
        return (
            <Grid.Col span={{ base: 6, sm: 6, md: 4 }} key={`PHOTO_${index}`} onClick={() => onPhotoClick(item)}>
                <GalleryPhotoContainer imageUrl={item.thumb_url} imageKey={item.key}/>
            </Grid.Col>
        )
    });
};

const renderEmpty = () => {
    return (
        <Grid.Col span={12} mt='xl'>
            <Center>
                <Flex direction='column' align='center'>
                    <IconPhotoOff width='40px' stroke={1.4}/>
                    <Title order={1} ta='center' fw='300'>
                        Não foi possível encontrar<br/> fotos para este evento
                    </Title>
                </Flex>
            </Center>
        </Grid.Col>
    );
};

const GalleryPhotos = ({
    onPhotoClick,
    scrollRef,
    reference,
    data,
    status,
    loadingPagination
}) => (
    <>
        {
            status === 'pending' ? (
                <Grid mt='xl' grow>
                    <Grid.Col span={{ base: 6 }}>
                         <Skeleton height={200} animate/>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6 }}>
                         <Skeleton height={200} animate/>
                    </Grid.Col>
                </Grid>
            ) : (
                <Grid mt='xl' grow={loadingPagination} pb='100px' ref={scrollRef}>
                    {data?.pages?.length ? data?.pages?.map(item => renderItem(item, onPhotoClick)) : renderEmpty()}
                    {
                        loadingPagination && (
                            <Grid.Col span={{ base: 6, sm: 6, md: 4 }}>
                                <Skeleton height={150} animate/>
                            </Grid.Col>
                        ) || (
                            <div ref={reference}></div>
                        )
                    }
                </Grid>
            )
        }
    </>
);

GalleryPhotos.propTypes = {
    onPhotoClick: PropTypes.func,
    scrollRef: PropTypes.object,
    reference: PropTypes.any,
    data: PropTypes.object,
    page: PropTypes.number,
    status: PropTypes.string,
    loadingPagination: PropTypes.bool
};

export default GalleryPhotos
