import React from "react";
import Header from "../components/header"

export default function Linechart() {


    return (
        <>
            <div>
                <iframe title="Static HTML" src={process.env.PUBLIC_URL + "/linechart/line.html"} width="100%" height="1200" />
            </div>
        </>
    )
}