import React from 'react'
import MeetingsTabs from './_components/MeetingsTabs'

const layout = ({children}) => {
    return (
        <div className='p-4 font-urbanist pl-11 pr-11'>
            <MeetingsTabs>{children}</MeetingsTabs>;
        </div>
    )
}

export default layout