
module.exports = function (RED) {
    const geolib = require('geolib')

    function bearingNode(n) {
        RED.nodes.createNode(this,n)
        this.lat = n.lat
        this.latType = n.latType
        this.lon = n.lon
        this.lonType = n.lonType

        const node = this

        node.on('input', async function (msg, send, done) {
            let loc = undefined
            send = send || function () { node.send.apply(node, arguments)}

            if (msg.hasOwnProperty('location')) {
                loc = {}
                loc.latitude = msg.location.lat
                loc.longitude = msg.location.lon
            } else if (msg.hasOwnProperty('lat') && msg.hasOwnProperty('lon')) {
                loc = {}
                loc.latitude = msg.lat
                loc.longitude = msg.lon
            } else if (typeof(msg.payload) === 'object' && msg.payload.hasOwnProperty('lat') && msg.payload.hasOwnProperty('lon')) {
                loc = {}
                loc.latitude = msg.payload.lat
                loc.longitude = msg.payload.lon
            }

            if (loc) {
                const startLat = await RED.util.evaluateNodeProperty(node.lat, node.latType, node, msg)
                const startLon = await RED.util.evaluateNodeProperty(node.lon, node.lonType, node, msg)

                const bearing = geolib.getRhumbLineBearing({
                    latitude: startLat,
                    longitude: startLon
                }, loc)

                msg.payload = bearing
                send(msg)
                if (done) {
                    done()
                }
            } else {
                if (done) {
                    done("No location fount in message")
                } else {
                    node.error("No location found in message", msg)
                }
            }
        })
    }
    RED.nodes.registerType('geolib-bearing', bearingNode)
}