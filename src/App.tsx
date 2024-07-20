import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Helmet} from 'react-helmet';
import Menu from "./components/utils/menu/Menu";
import {NewsPage} from "./components/pages/News/News";
import {EventsPage} from "./components/pages/Events/Events";
import {Event} from "./components/pages/Event/Event";
import {AchievementsPage} from "./components/pages/Achievements/Achievements";
import {PartnersPage} from "./components/pages/Partners/Partners";
import {ContactsPage} from "./components/pages/Contacts/Contacts";
import {HomePage} from "./components/pages/Home/Home";
import {HardathonPage} from "./components/pages/Hardathon/Hardathon";
import {ProjectDetails} from "./components/pages/Hardathon/ProjectDetails/ProjectDetails";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Helmet>
                    <title>Центр молодежной робототехники</title>
                </Helmet>
                <Menu/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/news" element={<NewsPage/>}/>
                    <Route path="/events" element={<EventsPage/>}/>
                    <Route path="/events/:id" element={<Event/>}/>
                    <Route path="/achievements" element={<AchievementsPage/>}/>
                    <Route path="/partners" element={<PartnersPage/>}/>
                    <Route path="/contacts" element={<ContactsPage/>}/>
                    <Route path="/hardathons" element={<HardathonPage/>}/>
                    {/*<Route path="/hardathons/:id/partners" element={<PartnersHardathon/>} />*/}
                    <Route path="/hardathons/:id/details" element={<ProjectDetails/>}/>

                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
