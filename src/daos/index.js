const fs = require('fs/promises')

const getModule = async (name) => {
    const dataCore = process.env.DATACORE

    const dir = await fs.readdir(__dirname + '/' + name)
    let ModuleSource = await import(`./${name}/memory.${name}.mjs`)
    for(let i of dir){
        const split = i.split('.')
        if(split[0] === dataCore) ModuleSource = await import(`./${name}/${i}`)
    }
    console.log(ModuleSource)
    return ModuleSource.default
}


//si quiero el dao de productos entonces await Daos('products') o para el de carritos await Daos('carts')
const Daos = async (table) => {
    const DaosClass = await getModule(table);
    const DaosInstance = new DaosClass()    
    return DaosInstance;
}

module.exports = Daos
