import "../styles/RightClickMenu.css";

function RightClickMenu({data}) {
    const menuStyles= {
        position: 'absolute',
        top: `${data.posY}px`,
        left: `${data.posX}px`
}
console.log(`${data.track}`);
    return (
        
        <div style={menuStyles} className="ventana-emergente">
            <p className="border-bottom hover">Agregar a una lista</p>
            <p className="hover">Añadir a la cola</p>
            <p className="hover">Ir al artista</p>
            <p className="hover">Ir al álbum</p>
            <p className="hover">Compartir</p>
        </div>
    )
}
export default RightClickMenu;