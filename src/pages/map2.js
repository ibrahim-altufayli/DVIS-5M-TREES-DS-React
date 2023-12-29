import React from "react";

export default function Map2() {


    return (
        <>
            <div>
                <iframe title="Static HTML" src={process.env.PUBLIC_URL + "/maps/map2/index.html"} width="100%" height="1200" />
            </div>
        </>
    )
}