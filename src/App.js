import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRouter } from './routes';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {publicRouter.map((route, index) => {
                        let Page = route.component;
                        return <Route path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
