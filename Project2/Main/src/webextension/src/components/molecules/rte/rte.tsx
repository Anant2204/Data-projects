import React, { useEffect, useRef } from 'react';
import RichTextEditor,{EditorValue} from 'react-rte';
import { getCurrentTheme } from '../../../utils';
import { classNamesFunction } from '@fluentui/react';
import { getEditorStyles } from './rte.styles';
const getClassNames = classNamesFunction<any, any>();

interface MctRteProps {
    parentContext: any;
    onChangeHanlder: (value: EditorValue) => void;
    value: EditorValue;
    name?:string;
    onBlurHandler?: (value: Event) => void;
    errorMessage?:string;
  }

const MctRte: React.FC<MctRteProps> = (props) => {
  const { parentContext, onChangeHanlder, value,name,onBlurHandler,errorMessage } = props;
  const theme = getCurrentTheme(parentContext);
  let classes: any;
  classes = getClassNames(getEditorStyles(theme));

  return (
    <div className={classes.root}>
      <RichTextEditor
        value={value}
        name={name}
        onChange={onChangeHanlder}
        onBlur={onBlurHandler}
        errorMessage={errorMessage}
        style={classes.root}
        toolbarConfig={{
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
              {label: 'Bold', style: 'BOLD'},
              {label: 'Italic', style: 'ITALIC'},
              {label: 'Underline', style: 'UNDERLINE'}
            ],
            BLOCK_TYPE_BUTTONS: [
              {label: 'UL', style: 'unordered-list-item'},
              {label: 'OL', style: 'ordered-list-item'}
            ]
          }}
      />
      <div className={classes.emptyError}>{errorMessage}</div>
    </div>
  );
};

export default MctRte;
