// import pool from 'pg'
// const pool = new pool();
// const connect = async () => {
//     return pool.connect();
// };
// const execute = async (sql, data = []) => {
//     const connection = await connect();
//     try{
//         const result = await connection.query(sql, data);
//         return result;
//     }
//     catch(error){
//     console.log(error.message);
//     }
//     finally{
//     connection.release();
//     }
// };a
// export default execute;