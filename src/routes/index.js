import DefaultLayout from '../components/layouts/DefaultLayout';
import DetailEvent from '../pages/DetailEvent';
import Home from '../pages/Home';

//private router
const privateRouter = [];
//public router
const publicRouter = [
    {
        path: '/',
        layout: DefaultLayout,
        component: Home,
    },
    {
        path: '/events/:id',
        component: DetailEvent,
    },
];
export { privateRouter, publicRouter };
