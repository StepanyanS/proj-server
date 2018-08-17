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
  public getColorsData(colors: Object, colorsSources: Object): string {
    let colorsVariablesData = '// colors\n';
    let colorsSourcesData = '// Color themes\n';

    for(let [ key, value ] of Object.entries(colors)) {
      colorsVariablesData += `$color-${key}: ${value} !default;\n`;
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
  public getGeneratedData(colors: Object, colorsSources: Object): string {
    return this.getColorsData(colors, colorsSources);
  } 
}