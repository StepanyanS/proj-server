// import models
import { Color } from "../models/color";

/**
 * @description GenerateVariables instance
 * @export
 * @class GenerateVariables
 */
export class GenerateVariables {

  /**
   * @description gets Colors data for writing
   * @param {Object} colors
   * @param {Object} colorsSources
   * @returns {string}
   * @memberof GenerateVariables
   */
  public getColorsData(colors: Color[], colorsSources: Object): string {
    let colorsVariablesData = '// colors\n';
    let colorsSourcesData = '// Color themes\n';

    for(let color of colors) {
      colorsVariablesData += `$color-${color.name}: ${color.value} !default;\n`;
    }
    colorsVariablesData += '\n';
    
    for(let [ key, value ] of Object.entries(colorsSources)) {
      colorsSourcesData += `$color-${key}: $color-${value} !default;\n`;
    }
    colorsSourcesData += '\n';
    
    return colorsVariablesData + colorsSourcesData;
  }

  
  /**
   * @description gets generated variables data
   * @param {Object} colors
   * @param {Object} colorsSources
   * @returns {string}
   * @memberof GenerateVariables
   */
  public getGeneratedData(colors: Color[], colorsSources: Object): string {
    return this.getColorsData(colors, colorsSources);
  } 
}