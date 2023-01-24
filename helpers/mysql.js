const mysql = require('mysql2/promise');
const express = require('express')

const createConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'zdg'
    });
}

const getStatus = async (msgfom) => {
    const connection = await createConnection();
    const [rows] = await connection.execute( 'SELECT status FROM status WHERE usuario = ?', [msgfom]);
    if (rows.length > 0) return rows[0].status;
    return false;
}

const setStatusOn = async (msgfom) => {
    const connection = await createConnection();
    const [rows] = await connection.execute( 'SELECT status SET status = "on" WHERE usuario = ?', [msgfom]);
    if (rows.length > 0) return rows[0].status;
    return false;
}

const setStatusOff = async (msgfom) => {
    const connection = await createConnection();
    const [rows] = await connection.execute( 'SELECT status SET status = "off" WHERE usuario = ?', [msgfom]);
    if (rows.length > 0) return rows[0].status;
    return false;
}

const getUser = async (msgfom) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT usuario FROM status WHERE usuario = ?', [msgfom]);
    if (rows.length > 0) return true;
    return false;
}
// 17:01
const setUser = async (msgfom) => {

}

const getReply = async (keyword) => {

}