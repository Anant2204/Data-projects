import React from 'react';
import {classNamesFunction  } from '@fluentui/react';
import { getStyles } from "./FilterPanel.style";
let classes: any;
const getClassNames = classNamesFunction<any, any>();
classes = getClassNames(getStyles());
 const TagsContainer = (props : any) =>{
    return(
        <>
            <h1>{props.GenrateTags}</h1>
        </>
    )
  }
  export default TagsContainer;