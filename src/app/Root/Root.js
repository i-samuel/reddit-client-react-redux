import React from "react";
import Subreddits from "../../features/subreddits/Subreddits";
import { Outlet,ScrollRestoration } from "react-router-dom";
import Header from "../../components/Header/Header";
import './root.css';

export default function Root() {
    return(
        <>
            <Header />
            <main>
                <section className="archive">
                    <Outlet/>
                </section>
                <section className="sidebar">
                    <Subreddits />
                </section>
            </main>
            <ScrollRestoration />
      </>
    );
}