import ARGS from "./Merkurial/SQL/OBJECT_CLASS/postgreArgs";
import { ForeignKeyMap, Schema } from "Merkurial/SQL/OBJECT_CLASS/SQL_TYPES";
import SQL_TABLE from "Merkurial/SQL/OBJECT_CLASS/SQL";
import { ForeignKey } from "Merkurial/SQL/OBJECT_CLASS/SQL_TYPES";

const { primaryKey, serial, jsonb, varchar50, notNull, varchar20, varchar1, bool, foreignKey, date,
    unique, intArray, text, int, numeric, varchar100 } = ARGS;
export const mealForeignKeys: ForeignKey = {table: "users", columnName: "userid"}
export const mealForeignKeyMap: ForeignKeyMap = {uid: mealForeignKeys}


export const fullMenuForeignKeys: ForeignKey = {table: "users", columnName: "userid"}
export const fullMenuFkMap: ForeignKeyMap = {uid: fullMenuForeignKeys}

export const api_route = "/api/postgres"

export const mealSchema: Schema = [
    {column: "mid", params: [primaryKey, serial, unique]},
    {column: "dish", params: [varchar50, notNull, unique]},
    {column: "is_entree", params: [bool, notNull]},
    {column: "ingredients_ids", params: [intArray, notNull]},
    {column: "ingredients_uids", params: [intArray, notNull ]},
    {column: "ingredients_numbers", params: [intArray, notNull]},
    {column: "meal", params: [text, notNull]},
    {column: "details", params: [text]},
    {column: "uid", params: [int, notNull, foreignKey]}
]

export const measurementsSchema = [
    {column: "meid", params: [primaryKey, serial, unique, notNull]},
    {column: "measurement", params: [varchar20]},
    {column: "uid", params: [foreignKey, serial, notNull]}
]

export const ingredientSchema: Schema = [
    {column: "iid", params: [primaryKey, serial, unique]},
    {column: "ingredient", params: [text, notNull, unique]},
    {column: "measurement", params: [varchar20, notNull]},
    {column: "price", params: [numeric, notNull]},
    {column: "uid", params: [int, notNull, foreignKey]}
]

export const userSchema: Schema = [
    {column: "userid", params: [primaryKey, serial, unique]},
    {column: "username", params: [varchar20, notNull, unique]},
    {column: "first_name", params: [varchar20, notNull]},
    {column: "last_name", params: [varchar50, notNull]},
    {column: "email", params: [varchar50, notNull, unique]},
    {column: "password", params: [varchar100, notNull]},
    {column: "currency", params: [varchar1, notNull]},
    {column: "sex", params: [varchar1, notNull]},
    {column: "days_for_schedule", params: [int, notNull]}
]

// FULL MENU SCHEMA IS ACTUALLY THE SCHEDULE CREATED BY USER
export const fullMenuSchema: Schema = [
    {column: "wid", params: [primaryKey, serial]},
    {column: "date_created", params: [date, notNull]},
    {column: "schedule_name", params: [varchar50, notNull, unique]},
    {column: "is_current", params: [bool]},
    {column: "main_meals", params: [jsonb, notNull, unique]},
    {column: "other_meals", params: [jsonb, notNull, unique]},
    {column: "uid", params: [int, notNull, foreignKey]}
]

export const CREATE_ONE_TABLE = async (tablename: string, schema: Schema, foreignKeyMap: ForeignKeyMap = null) => {
    const TABLE = new SQL_TABLE(tablename, api_route, schema, false)
    const res = await TABLE.CREATE_TABLE(foreignKeyMap)
    return {[tablename]: TABLE, response: res}
} 


export const DELETE_ONE_TABLE = async(tablename: string, schema: Schema) => {
    const TABLE = new SQL_TABLE(tablename, api_route, schema, false)
    const res = await TABLE.DELETE_TABLE()
    return {[tablename]: TABLE, response: res}
}


export const GET_ONE_TABLE = async (tablename: string, schema: Schema) => {
    const TABLE = new SQL_TABLE(tablename, api_route, schema, false)
    const res = await TABLE.GET_TABLE()
    return {[tablename]: TABLE, response: res}
} 














