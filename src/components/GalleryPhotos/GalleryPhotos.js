import {
    Grid
} from '@mantine/core';
import GalleryPhoto from './GalleryPhoto';

const GalleryPhotos = () => {
  return (
    <>
        <Grid mt='xl' grow>
            <Grid.Col span={{ base: 6, sm: 6, md: 4 }}>
                <GalleryPhoto imageUrl='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'/>
            </Grid.Col>
        </Grid>
    </>
  )
}

export default GalleryPhotos