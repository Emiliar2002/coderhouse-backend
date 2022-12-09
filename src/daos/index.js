const fs = require('fs/promises')

const getProductModule = async () => {
    const dataCore = process.env.DATACORE

    const productDir = await fs.readdir(__dirname + '/products')
    console.log(productDir)
    let ModuleSource = await import(__dirname + '/products/memory.products.mjs')
    productDir.forEach(async (i) => {
        const split = i.split('.')
        if(split[0] === dataCore) ModuleSource = await import (__dirname + `/products/${i}`)
    })
    return ModuleSource.default
}

const ProductDaos = async () => {
    const ProductDaosClass = await getProductModule();
    const ProductDaosInstance = new ProductDaosClass()    
    return ProductDaosInstance;
}

module.exports = ProductDaos
