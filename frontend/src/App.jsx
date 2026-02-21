import './App.css'
import { useState } from 'react'

function App() {
  const [indexIntegrante, setIndexIntegrante] = useState(0)

  const integrantes = [
    {
      id: 1,
      nome: "Bianca Golfe",
      foto: "/foto_bianca.jpeg",
      instagram: "https://www.instagram.com/bianca_golfe/",
      github: "https://github.com/BiancaGGolfe"
    },
    {
      id: 2,
      nome: "Laura Faccin",
      foto: "/foto_laura.jpeg",
      instagram: "https://www.instagram.com/laura_le_faccin/",
      github: "https://github.com/lauralefaccin"
    },
    {
      id: 3,
      nome: "Filipe Casadei",
      foto: "/foto_filipe.jpeg",
      instagram: "http://instagram.com/filipecasadei/",
      github: "https://github.com/FilipeCasa16"
    },
    {
      id: 4,
      nome: "Carlos Mior",
      foto: "/fotosemfoto.jpg",
      instagram: "https://www.instagram.com/carloseduardomior/",
      github: "https://github.com/Certoeerado"
    },
    {
      id: 5,
      nome: "Gustavo Gonçalves",
      foto: "/fotosemfoto.jpg",
      instagram: "https://www.instagram.com/guto.kg2008/",
      github: "https://github.com/Qlqr1"
    }
  ]

  const integranteAtual = integrantes[indexIntegrante]

  const proximoIntegrante = () => {
    setIndexIntegrante((prev) => (prev + 1) % integrantes.length)
  }

  const integranteAnterior = () => {
    setIndexIntegrante((prev) => (prev - 1 + integrantes.length) % integrantes.length)
  }

  return (
    <>

      <header>
        <img src="" alt="Logo" />
        <nav>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#cards">Sobre nós</a></li>
            <li><a href="#contato">Contatos</a></li>
          </ul>
        </nav>
      </header>

      <div id='hero'>

      </div>

      <div id='cards'>
        <div className="card">
          <h2>Missão</h2>
          <p>Descrição do primeiro card.</p>
        </div>

        <div className="card">
          <h2>Visão</h2>
          <p>Descrição do segundo card.</p>
        </div>

        <div className="card">
          <h2>Valores</h2>
          <p>Descrição do terceiro card.</p>
        </div>
      </div>

      <div id='sobre'>
        <h2>Conheça Nosso Time</h2>
        <div className="carrossel-integrantes">
          <button className="seta-esquerda" onClick={integranteAnterior}>❮</button>
          
          <div className="container-fotos">
            {[0, 1, 2].map((offset) => {
              const idx = (indexIntegrante + offset) % integrantes.length
              const integrante = integrantes[idx]
              return (
                <div key={idx} className="card-integrante">
                  <img src={integrante.foto} alt={integrante.nome} className="foto-integrante" />
                  <h3>{integrante.nome}</h3>
                  <div className="redes-sociais">
                    <a href={integrante.instagram} target="_blank" rel="noopener noreferrer" className="btn-rede instagram" title="Instagram">
                      <img src="/logo_instagram.webp" alt="Instagram" />
                    </a>
                    <a href={integrante.github} target="_blank" rel="noopener noreferrer" className="btn-rede github" title="GitHub">
                      <img src="/logo_github.png" alt="GitHub" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          <button className="seta-direita" onClick={proximoIntegrante}>❯</button>
        </div>
      </div>

      <div id='contato'>

      </div>

      <footer>

      </footer>

    </>
  )
}

export default App
