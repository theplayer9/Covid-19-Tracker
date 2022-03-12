import React from "react"
import numeral from "numeral"
import {Circle,Popup} from "react-leaflet" 
 
 


 export const sortData= (data)=> {
     const sortedData =[...data]
     sortedData.sort((a,b)=> {
         if (a.cases > b.cases){
             return -1;
         } else{
             return 1;
         }
     })
     return sortedData;

 }
 // Draw circles on the map with interactive tooltip
 export const showDataOnMap = (data,casesType="cases")=>(
     data.map(country =>())
 )



 //This is not a component function. It's like a healper function.