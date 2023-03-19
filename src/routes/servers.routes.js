const { Router } = require('express')
const { 
    getAllServers, 
    getServer, 
    createServer, 
    deleteServer, 
    updateServer 
} = require('../controllers/servers.controller')

const router = Router()

router.get('/servers', getAllServers)

router.get('/servers/:id', getServer)

router.post('/servers', createServer)

router.delete('/servers/:id', deleteServer)

router.put('/servers/:id', updateServer)

module.exports = router