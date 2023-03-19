const pool = require("../database/db")

const getAllServers = async (req, res, next) => {
    
    try {
        const allServers = await pool.query("SELECT * FROM servers")

        res.send(allServers.rows)
    } catch (error) {
        next(error)
    }

}

const getServer = async (req, res, next) => {

    try {
        const { id } = req.params
        const result = await pool.query(`SELECT * FROM servers WHERE id=${id}`)

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Server no encontrado'
        })
        res.send(result.rows[0])
    } catch (error) {
        next(error)
    }

}

const createServer = async (req, res, next) => {

    const {
        hostname,
        ip,
        user_so,
        pass_so,
        ram,
        hdd,
        cpu,
        bill_client,
        environment,
        state,
        owner,
        name_so,
        admin,
        client,
        monitoring,
        db,
        engine_db,
        user_db,
        pass_db,
        description
    } = req.body

    try {
        const result = await pool.query("INSERT INTO servers VALUES ( DEFAULT , $1, $2, $3, $4, $5, $6, $7, current_timestamp, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *", [
            hostname,
            ip,
            user_so,
            pass_so,
            ram,
            hdd,
            cpu,
            bill_client,
            environment,
            state,
            owner,
            name_so,
            admin,
            client,
            monitoring,
            db,
            engine_db,
            user_db,
            pass_db,
            description
        ])

        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }

}

const deleteServer = async (req, res, next) => {

    try {
        const { id } = req.params
        const result = await pool.query(`DELETE FROM servers WHERE id=${id}`)

        if (result.rowCount === 0) return res.status(404).json({
            message: 'Server no encontrado'
        })

        res.sendStatus(204)
    } catch (error) {
        next(error)
    }

}

const updateServer = async (req, res, next) => {

    const {
        hostname,
        ip,
        user_so,
        pass_so,
        ram,
        hdd,
        cpu,
        bill_client,
        environment,
        state,
        owner,
        name_so,
        admin,
        client,
        monitoring,
        db,
        engine_db,
        user_db,
        pass_db,
        description
    } = req.body

    try {
        const { id } = req.params
        const result = await pool.query(`UPDATE servers SET hostname = $1, ip = $2, user_so = $3, pass_so = $4, ram = $5, hdd = $6, cpu = $7, bill_client = $8, environment = $9, state = $10, owner = $11, name_so = $12, admin = $13, client = $14, monitoring = $15, db = $16, engine_db = $17, user_db = $18, pass_db = $19, description = $20 WHERE id=${id} RETURNING *`, [
            hostname,
            ip,
            user_so,
            pass_so,
            ram,
            hdd,
            cpu,
            bill_client,
            environment,
            state,
            owner,
            name_so,
            admin,
            client,
            monitoring,
            db,
            engine_db,
            user_db,
            pass_db,
            description
        ])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Server no encontrado'
        })

        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }

}

module.exports = {
    getAllServers,
    getServer,
    createServer,
    deleteServer,
    updateServer
}