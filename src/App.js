import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRouter } from './routes';
import DefaultLayout from './components/layouts/DefaultLayout';
import { Fragment } from 'react';
import MyEventLayout from './components/layouts/MyEventLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './utils/authContext';
import { NewEventFormProvider, NewEventStepProvider } from './utils/newEventContext';
import NewStageChart from './components/layouts/NewEventLayout/NewStage/NewStageChart';
import NewEventLayout from './components/layouts/NewEventLayout/NewEventLayout';
import EventTypeList from './components/layouts/NewEventLayout/EventTypeList';
import Tickets from './components/layouts/NewEventLayout/Tickets/Tickets';
import ShowTimes from './components/layouts/NewEventLayout/ShowTimes/ShowTimes';
import NewEventForm from './components/layouts/NewEventLayout/NewEventForm/NewEventForm';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import OrganizerProfile from './components/layouts/NewEventLayout/OrganizerProfile/OrganizerProfile';

const client = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={client}>
            <ReactQueryDevtools initialIsOpen={true} />

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
                            <Route path="/organizer/profile" element={<OrganizerProfile />} />

                            <Route
                                path="/newEvent"
                                element={
                                    <NewEventStepProvider>
                                        <NewEventFormProvider>
                                            <NewEventLayout />
                                        </NewEventFormProvider>
                                    </NewEventStepProvider>
                                }
                            >
                                <Route index element={<EventTypeList />}></Route>
                                <Route path="eventInfo" element={<NewEventForm />} />
                                <Route path="tickets" element={<Tickets />} />
                                <Route path="showtimes" element={<ShowTimes />} />
                                <Route path="stage" element={<NewStageChart />} />
                            </Route>
                        </Routes>
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
