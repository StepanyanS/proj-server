import { IColor } from '../models/project.d';

export class GenerateVariables {

  public getColorsData(colors: IColor[], colorsSources: Object): string {
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

  public getGeneratedData(colors: IColor[], colorsSources: Object): string {
    return this.getColorsData(colors, colorsSources);
  } 
}