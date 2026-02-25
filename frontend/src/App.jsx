import './App.css'
import { useState, useEffect } from 'react'
import Counter from "./components/Counter";


/* ================= CONTADOR ================= */
function Stat({ numero, sufixo, label }) {
  const [valor, setValor] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const increment = numero / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= numero) {
        setValor(numero)
        clearInterval(timer)
      } else {
        setValor(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [numero])

  return (
    <div className="stat-item">
      <h3>
        {numero % 1 !== 0 ? valor.toFixed(1) : Math.floor(valor)}
        {sufixo}
      </h3>
      <p>{label}</p>
    </div>
  )
}

function App() {
  const [indexIntegrante, setIndexIntegrante] = useState(0)
  const [transitionAtiva, setTransitionAtiva] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

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

  const totalIntegrantes = integrantes.length
  const integrantesNoTrilho = [...integrantes, ...integrantes, ...integrantes]

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
        <img src="/logobranca.png" alt="Logo" id="logoprincipal" />
        <nav>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#cards">Sobre nós</a></li>
            <li><a href="#contato">Contatos</a></li>
          </ul>
        </nav>
      </header>

      <div id="hero"></div>

      {/* ================= CARDS ================= */}
      <div id="cards">
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

      {/* ================= TIME ================= */}
      <div id="sobre">
        <h2>Conheça Nosso Time</h2>
        <div className="carrossel-integrantes">
          <button className="seta-esquerda" onClick={integranteAnterior}>❮</button>

          <div className="carrossel-viewport">
            <div
              className="container-fotos"
              style={{
                transform: `translateX(calc(-${indexIntegrante} * (var(--largura-card-integrante) + var(--gap-card-integrante))))`,
                transition: transitionAtiva
                  ? 'transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1)'
                  : 'none'
              }}
              onTransitionEnd={aoFinalizarTransicao}
            >
              {integrantesNoTrilho.map((integrante, idx) => (
                <div key={`${integrante.id}-${idx}`} className="card-integrante">
                  <div className="quadro-foto">
                    <img src={integrante.foto} alt={integrante.nome} className="foto-integrante" />
                  </div>
                  <h3>{integrante.nome}</h3>

                  <div className="redes-sociais">
                    <a href={integrante.instagram} target="_blank" rel="noopener noreferrer" className="btn-rede instagram">
                      <img src="/instagram.png" alt="Instagram" />
                    </a>
                    <a href={integrante.github} target="_blank" rel="noopener noreferrer" className="btn-rede github">
                      <img src="/github.png" alt="GitHub" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="seta-direita" onClick={proximoIntegrante}>❯</button>
        </div>
      </div>



      {/* ================= RECURSOS ================= */}
      <section id="recursos">
        <h2>Recursos que Fazem a Diferença</h2>
        <p className="subtitulo-recursos">
          Tudo que você precisa para transformar seu fluxo de trabalho e alcançar resultados excepcionais.
        </p>

        <div className="grid-recursos">
          <div className="card-recurso">
            <div className="icone-recurso">
              <img src="/zap.svg" alt="Performance" />
            </div>
            <h3>Performance Otimizada</h3>
            <p>Velocidade incomparável com tecnologias de ponta e arquitetura escalável.</p>
          </div>

          <div className="card-recurso">
            <div className="icone-recurso">
              <img src="/escudo.svg" alt="Segurança" />
            </div>
            <h3>Segurança Máxima</h3>
            <p>Criptografia de nível empresarial e conformidade com LGPD e GDPR.</p>
          </div>

          <div className="card-recurso">
            <div className="icone-recurso">
              <img src="/usuarios.svg" alt="Colaboração" />
            </div>
            <h3>Colaboração em Tempo Real</h3>
            <p>Trabalhe em equipe com sincronização instantânea.</p>
          </div>

          <div className="card-recurso">
            <div className="icone-recurso">
              <img src="/sinal.svg" alt="Analytics" />
            </div>
            <h3>Analytics Avançado</h3>
            <p>Insights profundos com dashboards intuitivos.</p>
          </div>

          <div className="card-recurso">
            <div className="icone-recurso">
              <img src="/nuvem.svg" alt="Cloud" />
            </div>
            <h3>Cloud Native</h3>
            <p>Infraestrutura moderna na nuvem com 99.9% de disponibilidade.</p>
          </div>

          <div className="card-recurso">
            <div className="icone-recurso">
              <img src="/fone_ouvido.svg" alt="Suporte" />
            </div>
            <h3>Suporte 24/7</h3>
            <p>Equipe dedicada pronta para ajudar você a qualquer momento.</p>
          </div>
        </div>


        {/* ===== CONTADORES ===== */}
        {/* ===== STATS ===== */}
        <div className="stats">

          <div className="stat-item">
            <Counter end={99.9} decimals={1} suffix="%" />
            <p>Uptime</p>
          </div>

          <div className="stat-item">
            <Counter end={50} suffix="k+" />
            <p>Clientes</p>
          </div>

          <div className="stat-item">
            <Counter end={150} suffix="+" />
            <p>Países</p>
          </div>

          <div className="stat-item">
            <span className="stat-static">24/7</span>
            <p>Suporte</p>
          </div>

        </div>



      </section>


      <div id="contato"></div>
      <footer></footer>
    </>
  )
}

export default App