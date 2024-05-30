import PropTypes from 'prop-types';
import {
    Grid,
    Title,
    Center,
    Skeleton,
    Flex
} from '@mantine/core';

import { IconPhotoOff } from '@tabler/icons-react';
import YourPhotoContainer from './YourPhoto';

const renderItem = (item, onPhotoClick) => {
    return item.data.map((item, index) => {
        return (
            <Grid.Col span={{ base: 6, sm: 6, md: 4 }} key={`PHOTO_${index}`} onClick={() => onPhotoClick(item)}>
                <YourPhotoContainer imageUrl={item.thumb_url} imageKey={item.key}/>
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

const YourPhotos = ({
    onPhotoClick,
    reference,
    data,
    status,
    refetchIsPending,
    loadingPagination
}) => (
    <div >
        {
            (refetchIsPending || status === 'pending') ? (
                <Grid mt='xl' grow>
                    <Grid.Col span={{ base: 6 }}>
                         <Skeleton height={200} animate/>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6 }}>
                         <Skeleton height={200} animate/>
                    </Grid.Col>
                </Grid>
            ) : (
                <Grid mt='xl' grow={loadingPagination} pb='100px'>
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
    </div>
);

YourPhotos.propTypes = {
    onPhotoClick: PropTypes.func,
    scrollRef: PropTypes.object,
    reference: PropTypes.func,
    data: PropTypes.object,
    status: PropTypes.string,
    loadingPagination: PropTypes.bool,
    refetchIsPending: PropTypes.bool
};

export default YourPhotos