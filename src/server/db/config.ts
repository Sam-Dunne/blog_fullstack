import * as mysql from 'mysql';
import type { MySQLResponse } from '../../typings/interfaces';
import config from '../config/secrets/sqlConfig'

const pool = mysql.createPool(config.sqlConfig);

// MySQLResponse set as type for all non-GET queries
export const Query = <T = MySQLResponse>(query: string, values?: any) => {
    return new Promise<T>((resolve, reject) => {
        const sqlString = mysql.format(query, values);
        console.log({ sqlString })
        pool.query(sqlString, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};