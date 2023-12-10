import React from "react";
import Header from "../components/header"
import Footer from "../components/footer"

export default function Assignment2() {


    return (
        <>
        <Header></Header>
            <div>
                <iframe title="Static HTML" src={process.env.PUBLIC_URL + "/sankey/sankey.html"} width="100%" height="1200" />
            </div>
        </>
    )
}