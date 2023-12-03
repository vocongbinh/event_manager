import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRouter } from './routes';
import DefaultLayout from './components/layouts/DefaultLayout';
import { Fragment } from 'react';
import MyEventLayout from './components/layouts/MyEventLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './utils/authContext';
const client = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <AuthProvider>
                    <div className="App">
                        <Routes>
                            {publicRouter.map((route, index) => {
                                let Page = route.component;
                                let props = {};
                                let Layout;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else Layout = Fragment;
                                if (route.sidebarItems) {
                                    props.sidebarItems = route.sidebarItems;
                                }
                                if (route.hasOwnProperty('index')) {
                                    props.index = route.index;
                                }
                                return (
                                    <Route
                                        path={route.path}
                                        element={
                                            <Layout {...props}>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
