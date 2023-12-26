import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRouter } from './routes';
import DefaultLayout from './components/layouts/DefaultLayout';
import { Fragment } from 'react';
import MyEventLayout from './components/layouts/MyEventLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './utils/authContext';
import { NewEventFormProvider, NewEventStepProvider } from './utils/newEventContext';
import { EditEventFormProvider, EditEventStepProvider } from './utils/editEventContext';
import NewStageChart from './components/layouts/NewEventLayout/NewStage/NewStageChart';
import NewEventLayout from './components/layouts/NewEventLayout/NewEventLayout';
import EventTypeList from './components/layouts/NewEventLayout/EventTypeList';
import Tickets from './components/layouts/NewEventLayout/Tickets/Tickets';
import ShowTimes from './components/layouts/NewEventLayout/ShowTimes/ShowTimes';
import NewEventForm from './components/layouts/NewEventLayout/NewEventForm/NewEventForm';
import EditEventForm from './components/layouts/EditEventLayout/EditEventForm/EditEventForm';
import EditTickets from './components/layouts/EditEventLayout/EditTickets/EditTickets';
import EditShowTimes from './components/layouts/EditEventLayout/EditShowtimes/EditShowtimes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import OrganizerProfile from './components/layouts/NewEventLayout/OrganizerProfile/OrganizerProfile';
import BookingResult from './pages/BookEvent/bookContent/BookingResult/bookingResult';
import EditEventLayout from './components/layouts/EditEventLayout/EditEventLayout';
import OrganizerWrapper from './components/layouts/NewEventLayout/OrganizerProfile/OrganizerWrapper';

import 'react-toastify/dist/ReactToastify.css';
const client = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={client}>
            {/* <ReactQueryDevtools initialIsOpen={true} /> */}

            <BrowserRouter>
                <AuthProvider>
                    <div className="App">
                        <Routes>
                            {publicRouter.map((route, index) => {
                                if (route.path === '/' || !route.path.includes('admin')) {
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
                                } else {
                                    if (localStorage.getItem('user')) {
                                        const user = JSON.parse(localStorage.getItem('user'));
                                        if (user.role === 'admin') {
                                            const Page = route.component;
                                            return <Route path={route.path} element={<Page />} />;
                                        }
                                    }
                                }
                            })}
                            <Route path="/organizer/profile" element={<OrganizerWrapper />} />
                            <Route path="/bookingResult/:paymentId" element={<BookingResult />} />
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
                            <Route
                                path="/editEvent/:id"
                                element={
                                    <EditEventStepProvider>
                                        <EditEventFormProvider>
                                            <EditEventLayout />
                                        </EditEventFormProvider>
                                    </EditEventStepProvider>
                                }
                            >
                                <Route index element={<EditEventForm />} />
                                <Route path="tickets" element={<EditTickets />} />
                                <Route path="showtimes" element={<EditShowTimes />} />
                            </Route>
                        </Routes>
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
