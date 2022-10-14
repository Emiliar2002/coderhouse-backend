const fs = require('fs')

const getAndParseFileData = (filename) => {
    const filedata = fs.readFileSync(filename)
    const parsedData = JSON.parse(filedata)
    return parsedData
}

module.exports = class Contenedor {
    constructor(name) {
        const filename = `./${name}.txt`
        this.filename = filename;
        try{
            const parsedData = getAndParseFileData(this.filename)
            const lastProductId = parsedData.products[parsedData.products.length - 1].id;
            this.id = lastProductId+1
        }catch(e){
            fs.writeFileSync(filename, '{"products":[]}')
            this.id = 1
        }
    }

    async save(data) {
        try {
            const parsedData = getAndParseFileData(this.filename)
            data.id = this.id
            this.id++
            parsedData.products.push(data)
            await fs.promises.writeFile(this.filename, JSON.stringify(parsedData))
            return data.id
        } catch (e) {
            throw new Error(e.message)
        }
    }

     getById(id){
        try {
            const parsedData = getAndParseFileData(this.filename)
            const found = parsedData.products.filter(p => {
                return p.id === id
            })
            if(found[0]) return found[0]
            return null
        } catch (e) {
            throw new Error(e.message)
        }
    }

    async getAll(){
        try {
            const parsedData = getAndParseFileData(this.filename)
            return parsedData.products
        } catch (e) {
            throw new Error(e.message)
        }
    }

     async deleteById(id){
        try {
            const parsedData = getAndParseFileData(this.filename)
            const filtered = parsedData.products.filter(p => {
                return p.id !== id
            })
            await fs.promises.writeFile(this.filename, `{"products":${JSON.stringify(filtered)}}`)
        } catch (e) {
            throw new Error(e.message)
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.filename, '{"products":[]}')
            this.id = 1
        }catch(e){
            throw new Error(e.message)
        }
    }

}