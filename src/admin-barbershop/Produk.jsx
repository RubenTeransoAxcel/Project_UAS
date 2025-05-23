export default function Produk(){
    return(
        <div className="card">
            <h1 className="text-3xl font-bold text-center">List Produk Barbershop </h1>
            <Nama n="Pomade" />
            <Gambar g="https://c.alfagift.id/product/1/1_A6859660001022_20241010094627786_base.jpg" />
            <Isi 
                isi="Bellagio Homme Pomade Penata Rambut Timeless Elegance Extreme Hold Light 80 g
                Gel penata rambut yang terbuat dari bahan yang aman digunakan untuk semua jenis rambut. Dengan formula water 
                based, yang dapat menjaga bentuk rambut tahan lama dan memberi efek kilau sempurna. Sekali menggunakannya, 
                dapat mengubah beragam jenis tata rambut sesuai yang anda inginkan tanpa mengurangi kandungan minyaknya. 
                Tersedia dalam kemasan jar 80 g."
            />
            <Harga produk="Rp 35.000" />
        </div>
    )
}

function Nama(props){
    return(
        <div>
            <h2><b>{props.n}</b></h2>
        </div>
    )
}

function Gambar(props){
    return (
        <div>
            <img src={props.g} width="200" />
        </div>
    )
}

function Isi(props){
    return (
        <div>
            <p>{props.isi}</p>
        </div>
    )
}

function Harga(props){
    return(
        <div>
            <p><b>Harga: </b>{props.produk} </p>
            <hr/>
        </div>
    )
}