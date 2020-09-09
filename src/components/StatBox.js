import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core';
import '../css/stats.css';

function StatBox({title, cases, total}) {
  return (
    <div className='stat-card'>
      <Card>
        <CardContent>
          <Typography className="stat_title" color="textSecondary">
            {title}
          </Typography>
          <h3 className="stat_cases">
            {cases}
          </h3>
          <Typography className="stat_total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
      
    </div>
  )
}

export default StatBox
