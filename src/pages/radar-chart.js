import React from "react";
import Header from "../components/header"

export default function RadarChart() {


    return (
        <>
            <div>
                <iframe title="Static HTML" src={process.env.PUBLIC_URL + "/radarchart/index.html"} width="100%" height="1200" />
            </div>
        </>
    )
}