export default function Reservasi({children}){
    return(
        <div className="card">
            <h1 className="text-3xl font-bold text-center">List Reservasi</h1>
                {children}
            <DataDiri
                nama="Ruben Teranso Axcel"
                umur="19 Tahun"
                tanggal={new Date().toLocaleDateString()}
            />
            <Barber 
                barber="Irwandi Susilo"
                jam="15.00 WIB"
            />
            <Paket 
                paket="Paket 1"
                isi="Cukur dan Krimbath saja"
                harga="Rp 45.000"
            />
            <DataDiri
                nama="Dion"
                umur="20 Tahun"
                tanggal={new Date().toLocaleDateString()}
            />
            <Barber 
                barber="Imam"
                jam="17.00 WIB"
            />
            <Paket 
                paket="Paket 1"
                isi="Cukur dan Krimbath saja"
                harga="Rp 45.000"
            />
        </div>
    )
}

function DataDiri(props){
    return(
        <div>
            <hr/>
            <p>
                Nama: {props.nama}<br></br>
                Umur: {props.umur}<br></br>
                Tanggal: {props.tanggal}
            </p>
        </div>
    )
}

function Barber(props){
    return(
        <div>
            <p>
                <b>Barber: </b>{props.barber}<br></br>
                <b>Pukul: </b>{props.jam}
            </p>
        </div>
    )
}

function Paket(props){
    return(
        <div>
            <p>
                <b>Paket: </b>{props.paket}<br></br>
                <b>Pelayanan: </b>{props.isi}<br></br>
                <b>Harga: </b>{props.harga}
                <hr/>
            </p>
        </div>
    )
}