import React from 'react'

import { TrendData } from '../ProfileDummyData/TrendData'

import './ProfileTrendCard.css'

interface ProfileTrendCardProps {
  
}

const ProfileTrendCard: React.FC<ProfileTrendCardProps> = () => {
    return (
      <div className="ProfileTrendCard">
          <div>
              <h3>Interesting Trends</h3>

              {TrendData &&TrendData.map((trend, id) => {
              return( 
                      <div key={id} className='trend'>
                          <span>#{trend?.name}</span>
                          <span>{trend?.shares}k shares</span>
                      </div>
                  )
              })}
          </div>
      </div>
    )
}

export default ProfileTrendCard