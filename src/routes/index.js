import CategoryLayout from '../components/layouts/CategoryLayout';
import DefaultLayout from '../components/layouts/DefaultLayout';

//private router
const privateRouter = [];
//public router
const publicRouter = [
    {
        path: '/',
        layout: DefaultLayout,
    },
    {
        path: '/events/:id',
        layout: CategoryLayout,
    },
];
export { privateRouter, publicRouter };
