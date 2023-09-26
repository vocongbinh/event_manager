import CategoryLayout from '../components/layouts/CategoryLayout';
import DefaultLayout from '../components/layouts/DefaultLayout';
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
        layout: CategoryLayout,
    },
];
export { privateRouter, publicRouter };
