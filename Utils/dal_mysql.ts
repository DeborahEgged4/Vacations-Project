import mysql from "mysql";
import config from "./config";

//creating a conneciton object
const connection = mysql.createPool({
    host: config.mySQLhost,
    user: config.mySQLuser,
    password: config.mySQLpass,
    database: config.mySQLdatabase,
});

// host: process.env.MYSQL_HOST || config.mySQLhost,
// user: process.env.MYSQL_USER || config.mySQLuser,
// password: process.env.MYSQL_PASSWORD || config.mySQLpass,
// database: process.env.MYSQL_DATABASE || config.mySQLdatabase,

const execute = (sql: string): Promise<any> => {
    sql = sql.replace('\n', '');
    console.log(sql);
    return new Promise<any>((resolve, reject) => {
        //connection and execute the sql command
        connection.query(sql, (err, res) => {
            if (err) {
                reject(err);
                return;
            }
            //no error, maya can go to satla
            resolve(res);
        });
    });
}

export default {
    execute
}