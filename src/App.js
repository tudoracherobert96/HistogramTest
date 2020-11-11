import React from 'react';
import {useQuery} from '@apollo/client'
import {gql} from '@apollo/client'
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';

const ALL_POSTS = gql`
    {
        allPosts(count:1000){
            id,
            createdAt
        }
    }
`

function App() {
    const { loading, error, data } = useQuery(ALL_POSTS);
    var postsMonthly = [{Month:"Jan",Posts:0},{Month:"Feb",Posts:0},{Month:"Mar",Posts:0},{Month:"Apr",Posts:0},{Month:"May",Posts:0},{Month:"Jun",Posts:0},{Month:"Jul",Posts:0},{Month:"Aug",Posts:0},{Month:"Sep",Posts:0},{Month:"Oct",Posts:0},{Month:"Nov",Posts:0},{Month:"Dec",Posts:0}]

    if (loading) return <p>Loading ...</p>
    if (error) return <p>There was an error!</p>

    if(data){
        data.allPosts.forEach((post) =>{
            postsMonthly[new Date(parseInt(post.createdAt)).getMonth()].Posts ++;
        })
    }

    const histo = postsMonthly;

    const width = 500;
    const height = 500;
    const margin = { top: 20, bottom: 20, left: 20, right: 20 };

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const x = d => d.Month;
    const y = d => +d.Posts;

    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: histo.map(x),
        padding: 0.4,
    });
    const yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...histo.map(y))],
    });

    const compose = (scale, accessor) => data => scale(accessor(data));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);


  return (
      <div><h1>Histogram of posts of 2019</h1>
      <svg width={width} height={height} style={{marginTop:"5px"}}>
          {histo.map((d, i) => {
              const barHeight = yMax - yPoint(d);
              return (
                  <Group key={`bar-${i}`}>
                      <Bar
                          x={xPoint(d)}
                          y={yMax - barHeight}
                          height={barHeight}
                          width={xScale.bandwidth()}
                          fill="orange"
                      />
                      <text
                          x={xPoint(d)}
                          y={yMax+30}
                          fill="black"
                          fontSize={12}
                          dx={"-.2em"}
                          dy={"-.33em"}
                          style={{ fontFamily: "arial" }}
                      >
                          {d.Month}
                      </text>
                      <text
                          x={xPoint(d) + 3}
                          y={yMax - barHeight + 15}
                          fill="black"
                          fontSize={12}
                          dx={"-.2em"}
                          dy={"-.33em"}
                          style={{ fontFamily: "arial" }}
                      >
                          {d.Posts}
                      </text>
                  </Group>
              );
          })}
      </svg>
     </div>
  );
}

export default App;
