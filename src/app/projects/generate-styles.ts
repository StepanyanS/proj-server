export class GenerateStyles {

  private getColorsData(colors: Object, colorsSources: Object): string {
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

  public getWriteData(colors: Object, colorsSources: Object): string {
    return this.getColorsData(colors, colorsSources);
  } 
}