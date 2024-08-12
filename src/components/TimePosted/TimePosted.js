import React from "react";
import ReactTimeAgo from "react-time-ago";

export default function TimePosted({date}) {
    return(
        <div>
            <ReactTimeAgo date={date} locale="en"/>
        </div>
    )
}