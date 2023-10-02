import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRouter } from './routes';
import DefaultLayout from './components/layouts/DefaultLayout';
import { Fragment } from 'react';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRouter.map((route, index) => {
                        let Page = route.component;
                        let Layout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else Layout = Fragment;

                        return (
                            <Route
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
