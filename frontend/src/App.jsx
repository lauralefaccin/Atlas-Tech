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
      foto: "/foto_carlos.jpeg",
      instagram: "https://www.instagram.com/carloseduardomior/",
      github: "https://github.com/Certoeerado"
    },
    {
      id: 5,
      nome: "Gustavo Gonçalves",
      foto: "/foto_gustavo.jpeg",
      instagram: "https://www.instagram.com/guto.kg2008/",
      github: "https://github.com/Qlqr1"
    }
  ]

  const proximoIntegrante = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTransitionAtiva(true)
    setIndexIntegrante((prev) => prev + 1)
  }

  const integranteAnterior = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTransitionAtiva(true)
    setIndexIntegrante((prev) => prev - 1)
  }

  const [transitionAtiva, setTransitionAtiva] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  const totalIntegrantes = integrantes.length
  const integrantesNoTrilho = [...integrantes, ...integrantes, ...integrantes]

  const aoFinalizarTransicao = () => {
    let novoIndex = null

    if (indexIntegrante >= totalIntegrantes * 2) {
      novoIndex = indexIntegrante - totalIntegrantes
    }

    if (indexIntegrante < totalIntegrantes) {
      novoIndex = indexIntegrante + totalIntegrantes
    }

    if (novoIndex !== null) {
      setTransitionAtiva(false)
      setIndexIntegrante(novoIndex)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionAtiva(true)
          setIsAnimating(false)
        })
      })

      return
    }

    setIsAnimating(false)
  }

  return (
    <>

      <header>
        <img src="/logobranca.png" alt="Logo" id='logoprincipal' />
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

          <div className="carrossel-viewport">
            <div
              className="container-fotos"
              style={{
                transform: `translateX(calc(-${indexIntegrante} * (var(--largura-card-integrante) + var(--gap-card-integrante))))`,
                transition: transitionAtiva ? 'transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none'
              }}
              onTransitionEnd={aoFinalizarTransicao}
            >
              {integrantesNoTrilho.map((integrante, idx) => {
              return (
                <div key={`${integrante.id}-${idx}`} className="card-integrante">
                  <div className="quadro-foto">
                    <img src={integrante.foto} alt={integrante.nome} className="foto-integrante" />
                  </div>
                  <h3>{integrante.nome}</h3>
                  <div className="redes-sociais">
                    <a href={integrante.instagram} target="_blank" rel="noopener noreferrer" className="btn-rede instagram" title="Instagram">
                      <img src="/instagram.png" alt="Instagram" />
                    </a>
                    <a href={integrante.github} target="_blank" rel="noopener noreferrer" className="btn-rede github" title="GitHub">
                      <img src="/github.png" alt="GitHub" />
                    </a>
                  </div>
                </div>
              )
              })}
            </div>
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
