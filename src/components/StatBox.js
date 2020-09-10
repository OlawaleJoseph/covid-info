import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core';
import '../css/stats.css';

function StatBox({title, cases, active, total, onClick, green, yellow, caseType}) {
  return (
    <Card className={`stat-card ${active && 'active-'}${caseType}`}
      onClick={onClick}>
      <CardContent>
        <Typography className="stat_title" color="textSecondary">
          {title}
        </Typography>
        <h3 className={`stat_cases ${green && 'recovered'} ${yellow && 'cases'}`}>
          {cases}
        </h3>
        <Typography className="stat_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  )
}

export default StatBox
