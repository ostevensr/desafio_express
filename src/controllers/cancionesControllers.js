import fs from 'fs';
import path from 'path';

const getHtml = (req, res) => {
    const filePath = path.resolve('index.html');
    res.sendFile(filePath)
};

//GET
const getCanciones = (req, res) => {
    try {
        const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'))
        res.status(200).json(canciones)
    } catch {
        res.status(500).json({ message: 'Error' })
    }
}

//POST

const postCancion = (req, res) => {
    try {
        const cancion = req.body;
        const canciones = JSON.parse(fs.readFileSync('repertorio.json'));
        canciones.push(cancion);
        fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
        res.status(201).send('Canción agregada exitosamente')
    }
    catch {
        res.status(500).json({ message: 'El recurso no está disponible' })
    }
}

//PUT

const putCancion = (req, res) => {
    try {
        const { id } = req.params;
        const cancionEditada = req.body;
        const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
        const index = canciones.findIndex(c => c.id == id);

        canciones[index] = { id: parseInt(id), ...cancionEditada }; // Asegurarse de que el id se mantiene

        fs.writeFileSync("repertorio.json", JSON.stringify(canciones, null, 2));
        res.status(200).send("Canción editada correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'El recurso no está disponible' });
    }
};

//DELETE

const borrarCancion = (req, res) => {
try {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync("repertorio.json")) 
    const index = canciones.findIndex(p => p.id == id) 
    canciones.splice(index, 1)
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones)) 
    res.send("Canción eliminada")

}
catch (error) {
    console.error(error);
    res.status(500).json({ message: 'El recurso no está disponible' });
}
};

export { getHtml, getCanciones, postCancion, putCancion, borrarCancion };