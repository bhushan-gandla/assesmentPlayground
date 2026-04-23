import { useState } from "react"

const inputArray = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

function App() {

  function consolidateArrayItems(){
    const result = new Set();

    inputArray.map((a) => {

      if(result.has(a)){
        result[a] += 1;
      }else{
        result.add({a: 1})
      }
    })

  }
  

  return (
    
  )
}

export default App
