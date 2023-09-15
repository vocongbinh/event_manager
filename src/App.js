import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRouter } from './routes';
import DefaultLayout from './components/layouts/DefaultLayout';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRouter.map((route, index) => {
                        let Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        }
                        return <Route path={route.path} element={<Layout></Layout>} />;
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
