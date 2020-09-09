import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'

function StatBox({title, cases, total}) {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography className="infobox_title" color="textSecondary">
            {title}
          </Typography>
          <Typography className="infobox_title" color="textSecondary">
            Today: {cases}
          </Typography>
          <Typography className="infobox_title" color="textSecondary">
            Total: {total}
          </Typography>
        </CardContent>
      </Card>
      
    </div>
  )
}

export default StatBox
