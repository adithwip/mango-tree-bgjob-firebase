import React, { Component } from 'react';
import Benih from './01-Benih.png';
import Tunas from './02-Tunas.png';
import Muda from './03-Muda.png';
import Tua from './04-Tua.png';
import Mati from './05-Mati.png';
import './App.css';
import * as firebase from 'firebase';
import renderIf from 'render-if'

class App extends Component {
	
	constructor() {
		super();
		this.state = {
			buah: 0,
			tinggi: 0,
			umur: 0
		}
	}

	componentDidMount() {

		const mangoRef = firebase.database().ref().child('mangotree');
		const buahRef = mangoRef.child('buah');
		const tinggiRef = mangoRef.child('tinggi');
		const umurRef = mangoRef.child('umur');

		buahRef.on('value', snap => {
			this.setState({
				buah: snap.val()
			})
		})

		tinggiRef.on('value', snap => {
			this.setState({
				tinggi: snap.val()
			})
		})

		umurRef.on('value', snap => {
			this.setState({
				umur: snap.val()
			})
		})

	}

	render() {
		return(
			<div className="App">
				<h2>Mango Tree Background Job Firebase</h2>

				<div className="vector">

					{renderIf(this.state.umur <= 2)(
					<div>
						<img src={Benih} alt="Gambar tunas mango tree"></img>
					</div>
					)}

					{renderIf(this.state.umur >= 3 && this.state.umur <= 5)(
					<div>
						<img src={Tunas} alt="Gambar tunas mango tree"></img>
					</div>
					)}

					{renderIf(this.state.umur >= 6 && this.state.umur <= 12)(
					<div>
						<img src={Muda} alt="Gambar tunas mango tree"></img>
					</div>
					)}

					{renderIf(this.state.umur >= 13 && this.state.umur <= 18)(
					<div>
						<img src={Tua} alt="Gambar tunas mango tree"></img>
					</div>
					)}

					{renderIf(this.state.umur >= 19)(
					<div>
						<img src={Mati} alt="Gambar tunas mango tree"></img>
					</div>
					)}

				</div>
				

				<h5>Detail Pohon</h5>
				<p>
					Umur pohon: { this.state.umur }
				</p>
				<p>
					Tinggi pohon: { this.state.tinggi }
				</p>
				<p>
					Jumlah buah: { this.state.buah }
				</p>
			</div>

		)
	}

}

export default App;
