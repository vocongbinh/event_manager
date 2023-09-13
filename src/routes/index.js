import Following from '../pages/Following';
import Home from '../pages/Home';
//private router
const privateRouter = [];
//public router
const publicRouter = [
    {
        path: '/',
        component: Home,
    },
];
export { privateRouter, publicRouter };
