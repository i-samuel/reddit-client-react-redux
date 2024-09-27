import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons';
import './VoteCard.css';
import { displayCount } from '../../utils/displayCount';

export default function VoteCard({ count }) {
    const [ vote, setVote ] = useState(null);
    const [ vCount, setvCount ] = useState(count);

    let voteDisplay = displayCount(vCount);

    //handle upvote
    const handleClickUp = (e) => {
        if(vote === 'up') {            
            setvCount(c => c-1);
            setVote(null);
        } else if (vote === 'down'){
            setvCount(c => c+2);
            setVote('up');
        } else {            
            setvCount(c => c+1);
            setVote('up');
        }
    }

    //handle downVote
    const handleClickDown = (e) => {
        if(vote === 'down') {            
            setvCount(c => c+1);
            setVote(null);
        } else if (vote === 'up'){
            setvCount(c => c-2);
            setVote('down');
        } else {            
            setvCount(c => c-1);
            setVote('down');
        }
    }

    return(
        <div className="vote-card">
            <FontAwesomeIcon className={vote==='up'? 'up-vote': 'vote up-before'} id="up" onClick={handleClickUp} icon={faUpLong} />
            <span className={!vote ? 'no-vote' : `${vote}-vote`}>{voteDisplay}</span>
            <FontAwesomeIcon className={vote==='down'? 'down-vote': 'vote down-before'} id="down" onClick={handleClickDown} icon={faDownLong} />
        </div>
    )
}