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

  const [menuAberto, setMenuAberto] = useState(false)

  const irParaHeader = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
        <img src="/logo_branca.png" alt="Logo" id="logoprincipal" />
        <button className="menu-toggle" onClick={() => setMenuAberto(!menuAberto)} aria-label="Menu">
          {menuAberto ? '✕' : '☰'}
        </button>
        <nav>
          <ul className={menuAberto ? 'aberto' : ''}>
            <li><a href="#produtos" onClick={() => setMenuAberto(false)}>Produtos</a></li>
            <li><a href="#recursos" onClick={() => setMenuAberto(false)}>Recursos</a></li>
            <li><a href="#precos" onClick={() => setMenuAberto(false)}>Preços</a></li>
            <li><a href="#contato" onClick={() => setMenuAberto(false)}>Contatos</a></li>
          </ul>
        </nav>
      </header>

      <div id="hero">
        <div id="texto-hero">
          <span id="badge-hero">🚀 Soluções em Software</span>
          <h2>Transforme seu negócio<br />com <span id='texto-destaque-hero'>software de ponta</span></h2>
          <p>Descubra ferramentas poderosas que impulsionam a produtividade, automatizam processos e elevam seus resultados para o próximo nível.</p>
          
          <div id="descricao-hero">
            <Stat numero={50} sufixo="k+" label="Clientes Ativos" />
            <Stat numero={98} sufixo="%" label="Satisfação" />
            <Stat numero={4.9} sufixo="/5" label="Avaliação" />
          </div>
        </div>
        <div id="imagem-hero">
          <img src="/caraprogramando.jpg" alt="Imagem de destaque" />
        </div>
      </div>

      {/* ================= PRODUTOS ================= */}
      <section id="produtos">
        <span className="tag-topo">Nossos produtos</span>
        <h2>Soluções que Impulsionam Resultados</h2>
        <p className="subtitulo-produtos">
          Escolha entre nossas ferramentas premium e leve seu negócio ao próximo nível.
        </p>

        <div className="grid-produtos">

          {/* CARD 1 */}
          <div className="card-produto">
            <div className="badge">Mais vendido</div>
            <img src="/analytics.jpg" alt="Analytics Pro" />

            <div className="conteudo-produto">
              <span className="categoria">ANÁLISES</span>
              <h3>Analytics Pro</h3>
              <p>
                Plataforma completa de análise de dados com dashboards interativos
                e relatórios em tempo real.
              </p>

              <div className="avaliacao">
                ⭐ 4.8 <span>(2.341 avaliações)</span>
              </div>

              <div className="rodape-produto">
                <strong>R$ 299</strong>
                <span>/mês</span>
                <button>Comprar</button>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="card-produto">
            <div className="badge azul">Empresa</div>
            <img src="/gerenciador de nuvens.jpeg" alt="Gerenciador de Nuvem" />

            <div className="conteudo-produto">
              <span className="categoria">NUVEM</span>
              <h3>Gerenciador de Nuvem</h3>
              <p>
                Gerencie toda sua infraestrutura em nuvem em um único lugar com segurança máxima.
              </p>

              <div className="avaliacao">
                ⭐ 4.9 <span>(1.876 avaliações)</span>
              </div>

              <div className="rodape-produto">
                <strong>R$ 499</strong>
                <span>/mês</span>
                <button>Comprar</button>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="card-produto">
            <div className="badge azul">Novo</div>
            <img src="/suites_DevOps.jpeg" alt="Suíte DevOps" />

            <div className="conteudo-produto">

              <span className="categoria">DEVOPS</span>
              <h3>Suíte DevOps</h3>
              <p>
                Conjunto completo de ferramentas para automatizar implantação,
                testes e monitoramento.
              </p>

              <div className="avaliacao">
                ⭐ 4.7 <span>(1.532 avaliações)</span>
              </div>

              <div className="rodape-produto">
                <strong>R$ 399</strong>
                <span>/mês</span>
                <button>Comprar</button>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ================= solução, bloco azul ================= */}

      <section id="cta">
        <div className="cta-container">
          <div className="cta-icon">  
            <img src='seta_cima.svg' alt="Ícone de crescimento" />
          </div>

          <h2>Procurando uma solução customizada?</h2>

          <p>
            Nossa equipe pode desenvolver software sob medida para atender suas
            necessidades específicas.
          </p>

          <button className="cta-button">
            Falar com Especialista
          </button>
        </div>
      </section>




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


      {/* ================= TIME ================= */}
      <div id="sobre-wrapper">
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
      </div>


      <div id="contato"></div>
      <footer className="footer-atlas">
        <div className="footer-top">
          <div className="footer-col footer-col-brand">
            <img src="/atlas_tech-Logo.png" alt="Atlas Tech" className="footer-logo" />
            <p>Transformando negócios através de software inovador desde 2026.</p>

            <div className="footer-social" aria-label="Redes sociais">
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v5h3v-5h3l1-3h-4V9c0-.6.4-1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
              </a>

              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6.5 9.5v8M6.5 6.5h0M11 9.5v8m0-4.8c0-2 1.2-3.2 2.8-3.2 1.8 0 2.7 1.1 2.7 3.4v4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="4" y="4" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </a>

              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="3.3" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Produtos</h3>
            <ul>
              <li><a href="#">Analytics Pro</a></li>
              <li><a href="#">Gerenciador de nuvem</a></li>
              <li><a href="#">Suíte DevOps</a></li>
              <li><a href="#">Ver todos</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Empresa</h3>
            <ul>
              <li><a href="#sobre">Sobre Nós</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </div>

          <div className="footer-col footer-col-newsletter">
            <h3>Newsletter</h3>
            <p>Receba novidades e ofertas exclusivas.</p>
            <form className="footer-newsletter" onSubmit={(event) => event.preventDefault()}>
              <input type="email" placeholder="atlastech@gmail.com" aria-label="Seu email" />
              <button type="button" aria-label="Voltar ao topo" onClick={irParaHeader}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 18V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 11l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Atlas Tech. Todos os direitos reservados.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacidade</a>
            <a href="#">Termos de Uso</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App