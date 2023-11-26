import { ColumnData, Params, DefaultValue } from "./SQL_TYPES"

export default class SQL_COLUMN {
    tableName: string
    columnName: string
    columnParams: Params
    columnData: ColumnData
    constructor(
        tableName: string,
        columnName: string,
        columnParams: Params
    ) {
        this.tableName = tableName
        this.columnName = columnName
        this.columnParams = columnParams
        this.columnData = {column: columnName, params: columnParams}
    }

    addColumn (defaultValue: DefaultValue ){

    }

    removeColumn (){
        const name = this.columnName
        const removeQuery = ""

    }
    
    updateColumn (
        oldValue: any,
        newValue: any,
        conditional_column = this.columnName,
        tableName: string = this.tableName,
        returning = false
        ) {
        let query = `UPDATE ${tableName} `;
        query += `SET "${this.columnName}" = '${newValue}' `;
        query += `WHERE "${conditional_column}" = '${oldValue}'`;
        if (returning) {
            query += ` RETURNING *`;
        }
        return query;
    }

    updateColumn2 (
        oldValue: any,
        newValue: any,
        conditional_column = this.columnName,
        tableName: string = this.tableName,
    ){
        let text = `UPDATE ${tableName} `;
        text += `SET "${this.columnName}" = '${newValue}' `;
        text += `WHERE "${conditional_column}" = '${oldValue}'`;
        return text;
    }
}