
import React, { useState, useEffect } from "react";

function Utils() {
function useWindowSize() {
  const [width, setWidth] = React.useState(document.documentElement.clientWidth);
  const [height, setHeight] = React.useState(document.documentElement.clientHeight);
  React.useEffect(() => {
    const setSize = () => {
      setWidth(document.documentElement.clientWidth);
      setHeight(document.documentElement.clientHeight);
    };
    window.addEventListener('resize', setSize);
    window.addEventListener('orientationchange', setSize);
    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('orientationchange', setSize);
    }
  }, []);
  return [width, height];
}

function mergeObjects(arr1,arr2){
  return arr1.map((item,i)=>{
     if(item.id === arr2[i].id){
         //merging two objects
       return Object.assign({},item,arr2[i])
     }
  })
}
}
export default Utils;
