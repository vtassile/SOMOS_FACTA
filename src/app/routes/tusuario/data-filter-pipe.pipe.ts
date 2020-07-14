import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";
 
@Pipe({
  name: "dataFilter"
})
export class DataFilterPipe implements PipeTransform {
  transform(array: any[], query: string,campo1: string, campo2: string): any {
    if (query) {  
     if(campo2==""){
        return _.filter(array, row => (row[campo1]).toLowerCase().indexOf(query) > -1);     
     }else{
	     return _.filter(array, row => (row[campo1][campo2]).toLowerCase().indexOf(query) > -1);     
     }
    }
    return array;
  }
}