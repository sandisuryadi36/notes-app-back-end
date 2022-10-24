const Hapi = require('@hapi/hapi')
const routes = require('./routes')

const init = async () => {
    const server = Hapi.server({
        port: 1200,
        host: 'localhost',
        routes: {
            cors: {
                origin: 'ignore'
            }
        }
    })

    server.route(routes)

    await server.start()
    console.log(`Server running on ${server.info.uri}`)
}

init()
