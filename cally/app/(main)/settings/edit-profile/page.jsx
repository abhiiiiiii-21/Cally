import React from 'react'
import ProfileHeader from './_components/ProfileHeader'
import ProfileTabs from './_components/ProfileTabs'


const page = () => {

    return (
        <div className='p-4 font-urbanist pl-11 pr-11 mx-auto max-w-4xl space-y-6'>
            {/* <MyProfileForm /> */}
            <ProfileHeader/>
            <ProfileTabs/>
        </div>
    )
}

export default page
