import FloatingMenu from './FloatingMenu';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const FloatingMenuContainer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { key, photo_id } = useParams();

    const onReturnClick = () => {
        const mappedRoutes = {
            '/your-gallery/photo': '/your-gallery',
            [`/event-gallery/photo/${key}`]: '/event-gallery',
            [`/your-gallery/photo/${key}/${photo_id}`]: `/your-gallery/${key}`,
            '/your-gallery': '/',
            '/your-gallery/not-found': '/',
            [`/your-gallery/${key}`]: '/',
            '/event-gallery': '/'
        };

        return mappedRoutes[location.pathname] && navigate(mappedRoutes[location.pathname]);
    };

	return (
		<FloatingMenu onReturnClick={onReturnClick}/>
	);
};

export default FloatingMenuContainer;
