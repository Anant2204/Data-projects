import { injectIntl } from "react-intl";
import { DefaultButton } from '@fluentui/react/lib/Button';
import { classNamesFunction } from "office-ui-fabric-react";
import { getStyles } from "./managerStatistics.styles";
import { getCurrentTheme } from "../../../../utils";
import { IMctStatisticsProps } from "./managerStatistics.types";
import React from "react";
import { messages } from "./managerStatistics.messages";

let classes: any;
const getClassNames = classNamesFunction<any, any>();
const ManagerStatistics: React.FC<IMctStatisticsProps> = (props) => {
  const { parentContext, setTileFilter, statistics, intl } = props;
  const [selectedTileIndex, setSelectedTileIndex] = React.useState<number | undefined>();
  const tileClickHandler = (statisticsText, statisticsValue, index) => {
    setTileFilter({ statisticsText, statisticsValue })
    setSelectedTileIndex(index)
  }
  const theme = getCurrentTheme(parentContext);
  classes = getClassNames(getStyles(theme));
  
  React.useEffect(()=> {
    tileClickHandler(statistics[0]?.statisticsText, statistics[0].statisticsValue, 0)
  }, [statistics[0]?.statisticsValue, statistics[1]?.statisticsValue, statistics[2]?.statisticsValue, statistics[3]?.statisticsValue])

  const TilesButton = ({ statisticsText, statisticsValue, index }) => {
    return (
      <div className={classes.rootcontainer}>
        <DefaultButton
          onClick={() => tileClickHandler(statisticsText, statisticsValue, index)}
          className={selectedTileIndex === index ? `${classes.tileStyle} ${classes.selectedTile}` : classes.tileStyle}          
          aria-label={selectedTileIndex === index ? `${statisticsText}, With Count ${statisticsValue} Selected` : `${statisticsText}, Count ${statisticsValue}`}
        >
          <div>
            <span>{statisticsValue}</span>
            <span>{statisticsText}</span>
          </div>
        </DefaultButton>
      </div>
    );
  }
  return (
    <div className={classes.rootContainer}>
      {
        statistics.map((item, index) => {
          return (
            <div key={item.statisticsText} className={classes.gridItem}>
              <TilesButton
                statisticsValue={item.statisticsValue}
                statisticsText={item.statisticsText}
                index={index}
              />
            </div>
          );
        })
      }
    </div>
  );
};

export default injectIntl(ManagerStatistics);