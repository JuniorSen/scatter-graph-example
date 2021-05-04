import React, { useState, useEffect } from "react";
import ScatterChart from "./ScatterChart";

export default function App(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData([{'a':1,'b':2},
                {'a':4,'b':1},
                {'a':2,'b':3},
                {'a':1,'b':3}])
    },[])
    if (!data) {
      return null
  }

    return (
        <div style={{height:'50%',width:'50%',marginTop:10,display:'inline-block'}}>   
            <ScatterChart data={data} xVal={'a'} yVal={'b'}/>
        </div>
    )  
}
