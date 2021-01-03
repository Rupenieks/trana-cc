import React, { useEffect } from 'react'
import authHeader from '../services/auth-header';
import { useRouter } from 'next/router';

export default function notesIndex() {
    const router = useRouter();

    useEffect(() => {
        // Check if user object exists
        if (authHeader() === {}) {
            router.push('/');
        }
        return;
    }, []);
    
    return (
        <div className="nodesIndex-container">
            <div className="sidepanel-container">
                <div className="username-wrapper">
                        Username
                </div>
                <div className="search-bar-wrapper">
                    <input type="text"></input>
                </div>
                <div className="button-wrapper">
                    <button>Add</button>
                </div>
                <div className="button-wrapper">
                    <button>Update</button>
                </div>
                <div className="button-wrapper">
                    <button>Remove</button>
                </div>
            </div>
            <div className="list-board">

            </div>

            <style jsx>
                {`
                
                .nodesIndex-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                }

                .sidepanel-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid black;
                }

                .list-board {
                    flex: 5;
                    border: 1px solid black;
                }
                
                `}
            </style>
        </div>
    )
}
