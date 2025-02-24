// import React from 'react'
// import Timeline from '@mui/lab/Timeline'
// import TimelineItem from '@mui/lab/TimelineItem'
// import TimelineSeparator from '@mui/lab/TimelineSeparator'
// import TimelineConnector from '@mui/lab/TimelineConnector'
// import TimelineContent from '@mui/lab/TimelineContent'
// import TimelineDot from '@mui/lab/TimelineDot'
// import Typography from '@mui/material/Typography'

// const PastActivity = ({ data }) => {
//   return (
//     <Timeline position="left">
//       {data.map((item, index) => (
//         <TimelineItem key={index}>
//           <TimelineSeparator>
//             <TimelineDot color="primary" />
//             {index < data.length - 1 && <TimelineConnector />}
//           </TimelineSeparator>
//           <TimelineContent>
//             <Typography variant="subtitle2" className="whitespace-nowrap">
//               {item.label}
//             </Typography>
//             <Typography variant="body2">
//               {item.children}
//             </Typography>
//           </TimelineContent>
//         </TimelineItem>
//       ))}
//     </Timeline>
//   )
// }

// export default PastActivity

import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

export default function PastActivity({ data }) {
  return (
    <Timeline position="right">
      {data.map((item, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent color="text.secondary">
          {item.label}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            {index < data.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent> {item.children}</TimelineContent>
        </TimelineItem>
      ))}

    </Timeline>
  );
}
