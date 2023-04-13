import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicView = lazy(() => import('../pages/singleComicView/SingleComicView'));
const SingleCharView = lazy(() => import('../pages/singleCharView/SingleCharView'));
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () =>  {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage />
                            </Route>
                            <Route exact path="/comics">
                                <ComicsPage />
                            </Route>
                            <Route exact path="/comics/:id">
                                <SinglePage renderComponent={data => <SingleComicView data={data} />} type="comic"/>
                                {/* <SinglePage Component={SingleComicView} type='comic'/> */}
                            </Route>
                            <Route exact path="/chars/:id">
                                <SinglePage renderComponent={data => <SingleCharView data={data} />} type="char"/>
                                {/* <SinglePage Component={SingleCharView} type='char'/> */}
                            </Route>
                            <Route path="*">
                                <Page404 />
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;