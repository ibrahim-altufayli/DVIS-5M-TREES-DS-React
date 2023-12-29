import React from "react";

export default function Map3() {


    return (
        <>
            <div>
                <iframe title="Static HTML" src={process.env.PUBLIC_URL + "/maps/map3.html"} width="100%" height="1200" />
            </div>
        </>
    )
}