import './App.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import Counter from "./components/Counter";

/* ================= CONTADOR HERO ================= */
function Stat({ numero, sufixo, label }) {
  const [valor, setValor] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const increment = numero / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= numero) { setValor(numero); clearInterval(timer) }
      else { setValor(start) }
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

/* ================= MODAL ATLASBOOK ================= */
const atlasBookSlides = [
  {
    id: 1,
    img: "/inicio.jpeg",
    cor: "linear-gradient(135deg, #1a3c70, #1f5fbf)"
  },
  {
    id: 2,
    img: "/livros.jpeg",
    cor: "linear-gradient(135deg, #0f4c75, #1b6ca8)"
  },
  {
    id: 3,
    img: "/estante.jpeg",
    cor: "linear-gradient(135deg, #1f5fbf, #2596be)"
  },
  {
    id: 4,
    img: "/generos.jpeg",
    cor: "linear-gradient(135deg, #164f8a, #1a7abf)"
  },
  {
    id: 5,
    img: "/autores.jpeg",
    cor: "linear-gradient(135deg, #164f8a, #1a7abf)"
  },
]

function ModalAtlasBook({ onClose }) {
  const [slideAtual, setSlideAtual] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const intervalRef = useRef(null)
  const slideAtualRef = useRef(0)

  const total = atlasBookSlides.length

  // Função para navegar para um slide específico
  const irPara = useCallback((index) => {
    if (transitioning) return
    
    // Limpa o intervalo atual
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    setTransitioning(true)
    
    setTimeout(() => {
      const novoIndice = ((index % total) + total) % total
      setSlideAtual(novoIndice)
      slideAtualRef.current = novoIndice
      setTransitioning(false)
    }, 250)
  }, [transitioning, total])

  // Navegação para próximo e anterior
  const proximoSlide = useCallback(() => {
    const proximo = (slideAtualRef.current + 1) % total
    irPara(proximo)
  }, [irPara, total])

  const slideAnterior = useCallback(() => {
    const anterior = (slideAtualRef.current - 1 + total) % total
    irPara(anterior)
  }, [irPara, total])

  // Configura o intervalo automático
  useEffect(() => {
    const iniciarIntervalo = () => {
      intervalRef.current = setInterval(() => {
        if (!transitioning) {
          proximoSlide()
        }
      }, 3500)
    }

    iniciarIntervalo()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [proximoSlide, transitioning])

  // Fechar com ESC
  useEffect(() => {
    const handleKey = (e) => { 
      if (e.key === 'Escape') {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  // Bloquear scroll do body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { 
      document.body.style.overflow = ''
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const slide = atlasBookSlides[slideAtual]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-atlasbook" onClick={e => e.stopPropagation()}>
        {/* Botão fechar */}
        <button className="modal-fechar" onClick={onClose} aria-label="Fechar">✕</button>

        {/* ---- CARROSSEL DE IMAGENS ---- */}
        <div className="modal-carrossel">
          <button className="modal-seta esq" onClick={slideAnterior}>❮</button>

          <div
            className="modal-slide"
            style={{
              opacity: transitioning ? 0 : 1,
              transition: 'opacity 0.25s ease',
              backgroundImage: `url(${slide.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Slide vazio - apenas a imagem de fundo */}
          </div>

          <button className="modal-seta dir" onClick={proximoSlide}>❯</button>

          {/* Dots */}
          <div className="modal-dots">
            {atlasBookSlides.map((_, i) => (
              <button
                key={i}
                className={`modal-dot${i === slideAtual ? ' ativo' : ''}`}
                onClick={() => irPara(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ---- INFORMAÇÕES ---- */}
        <div className="modal-info">
          <div className="modal-header-info">
            <div>
              <span className="modal-categoria">GESTÃO DE LIVROS ONLINE</span>
              <h2 className="modal-titulo">AtlasBook</h2>
              <p className="modal-subtitulo">
                Biblioteca virtual para a disseminação da literatura em ambientes escolares diversos.
                Gerencie acervos, acompanhe leituras e conecte alunos e professores em uma única plataforma.
              </p>
            </div>
            <div className="modal-avaliacao-box">
              <span className="modal-estrelas">⭐ 4.9</span>
              <span className="modal-num-aval">1.204 avaliações</span>
            </div>
          </div>

          <div className="modal-planos">
            <div className="modal-plano">
              <div className="modal-plano-info">
                <span className="modal-plano-nome">Mensal</span>
                <span className="modal-plano-preco">R$ 199<small>/mês</small></span>
              </div>
              <div className="modal-plano-divisor"></div>
              <button className="modal-btn-contratar" onClick={() => alert('Redirecionando para contratação...')}>
                Contratar agora
              </button>
            </div>
            <div className="modal-plano destaque-plano">
              <div className="modal-plano-info">
                <span className="modal-plano-nome">Anual</span>
                <span className="modal-plano-preco">R$ 149<small>/mês</small></span>
                <span className="modal-plano-economia">Economize 25%</span>
              </div>
              <div className="modal-plano-divisor"></div>
              <button className="modal-btn-contratar primary" onClick={() => alert('Redirecionando para contratação...')}>
                Contratar agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================= APP ================= */
function App() {
  const [indexIntegrante, setIndexIntegrante] = useState(0)
  const [transitionAtiva, setTransitionAtiva] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)

  const irParaHeader = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const integrantes = [
    { id: 1, nome: "Bianca Golfe", foto: "/foto_bianca.jpeg", instagram: "https://www.instagram.com/bianca_golfe/", github: "https://github.com/BiancaGGolfe" },
    { id: 2, nome: "Laura Faccin", foto: "/foto_laura.jpeg", instagram: "https://www.instagram.com/laura_le_faccin/", github: "https://github.com/lauralefaccin" },
    { id: 3, nome: "Filipe Casadei", foto: "/foto_filipe.jpeg", instagram: "http://instagram.com/filipecasadei/", github: "https://github.com/FilipeCasa16" },
    { id: 4, nome: "Carlos Mior", foto: "/foto_carlos.jpeg", instagram: "https://www.instagram.com/carloseduardomior/", github: "https://github.com/Certoeerado" },
    { id: 5, nome: "Gustavo Gonçalves", foto: "/foto_gustavo.jpeg", instagram: "https://www.instagram.com/guto.kg2008/", github: "https://github.com/Qlqr1" }
  ]

  const totalIntegrantes = integrantes.length
  const integrantesNoTrilho = [...integrantes, ...integrantes, ...integrantes]

  const proximoIntegrante = () => {
    if (isAnimating) return
    setIsAnimating(true); setTransitionAtiva(true)
    setIndexIntegrante((prev) => prev + 1)
  }

  const integranteAnterior = () => {
    if (isAnimating) return
    setIsAnimating(true); setTransitionAtiva(true)
    setIndexIntegrante((prev) => prev - 1)
  }

  const aoFinalizarTransicao = () => {
    let novoIndex = null
    if (indexIntegrante >= totalIntegrantes * 2) novoIndex = indexIntegrante - totalIntegrantes
    if (indexIntegrante < totalIntegrantes) novoIndex = indexIntegrante + totalIntegrantes
    if (novoIndex !== null) {
      setTransitionAtiva(false); setIndexIntegrante(novoIndex)
      requestAnimationFrame(() => requestAnimationFrame(() => { setTransitionAtiva(true); setIsAnimating(false) }))
      return
    }
    setIsAnimating(false)
  }

  return (
    <>
      {/* ---- MODAL ---- */}
      {modalAberto && <ModalAtlasBook onClose={() => setModalAberto(false)} />}

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
          {/* CARD 1 — AtlasBook */}
          <div className="card-produto">
            <div className="badge">⭐ Destaque</div>
            <div className="card-produto-img-placeholder atlasbook-cover">
              <div className="atlasbook-logo-area">
                <span className="atlasbook-icon">📖</span>
                <span className="atlasbook-title-img">AtlasBook</span>
              </div>
            </div>
            <div className="conteudo-produto">
              <span className="categoria">GESTÃO DE LIVROS ONLINE</span>
              <h3>AtlasBook</h3>
              <p>Biblioteca virtual para a disseminação da literatura em ambientes escolares diversos.</p>
              <div className="avaliacao">
                ⭐ 4.9 <span>(1.204 avaliações)</span>
              </div>
              <div className="rodape-produto">
                <strong>R$ 199</strong>
                <span>/mês</span>
                <button className="btn-ver-mais" onClick={() => setModalAberto(true)}>Ver mais</button>
              </div>
            </div>
          </div>

          {/* CARD 2 — Em breve */}
          <div className="card-produto card-em-breve">
            <div className="badge cinza">Em breve</div>
            <div className="card-produto-img-placeholder em-breve-cover">
              <div className="em-breve-overlay">
                <span className="em-breve-icone">🔒</span>
                <span className="em-breve-label">Em desenvolvimento</span>
              </div>
            </div>
            <div className="conteudo-produto">
              <span className="categoria">NUVEM</span>
              <h3>Gerenciador de Nuvem</h3>
              <p>Gerencie toda sua infraestrutura em nuvem em um único lugar com segurança máxima.</p>
              <div className="avaliacao em-breve-avaliacao">
                🕐 Lançamento previsto: <span>2º semestre 2026</span>
              </div>
              <div className="rodape-produto">
                <button className="btn-notificar" disabled>Notifique-me</button>
              </div>
            </div>
          </div>

          {/* CARD 3 — Em breve */}
          <div className="card-produto card-em-breve">
            <div className="badge cinza">Em breve</div>
            <div className="card-produto-img-placeholder em-breve-cover">
              <div className="em-breve-overlay">
                <span className="em-breve-icone">⚙️</span>
                <span className="em-breve-label">Em desenvolvimento</span>
              </div>
            </div>
            <div className="conteudo-produto">
              <span className="categoria">DEVOPS</span>
              <h3>Suíte DevOps</h3>
              <p>Conjunto completo de ferramentas para automatizar implantação, testes e monitoramento.</p>
              <div className="avaliacao em-breve-avaliacao">
                🕐 Lançamento previsto: <span>1º semestre 2027</span>
              </div>
              <div className="rodape-produto">
                <button className="btn-notificar" disabled>Notifique-me</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section id="cta">
        <div className="cta-container">
          <div className="cta-icon">
            <img src='seta_cima.svg' alt="Ícone de crescimento" />
          </div>
          <h2>Procurando uma solução customizada?</h2>
          <p>Nossa equipe pode desenvolver software sob medida para atender suas necessidades específicas.</p>
          <button className="cta-button">Falar com Especialista</button>
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
            <div className="icone-recurso"><img src="/zap.svg" alt="Performance" /></div>
            <h3>Performance Otimizada</h3>
            <p>Velocidade incomparável com tecnologias de ponta e arquitetura escalável.</p>
          </div>
          <div className="card-recurso">
            <div className="icone-recurso"><img src="/escudo.svg" alt="Segurança" /></div>
            <h3>Segurança Máxima</h3>
            <p>Criptografia de nível empresarial e conformidade com LGPD e GDPR.</p>
          </div>
          <div className="card-recurso">
            <div className="icone-recurso"><img src="/usuarios.svg" alt="Colaboração" /></div>
            <h3>Colaboração em Tempo Real</h3>
            <p>Trabalhe em equipe com sincronização instantânea.</p>
          </div>
          <div className="card-recurso">
            <div className="icone-recurso"><img src="/sinal.svg" alt="Analytics" /></div>
            <h3>Analytics Avançado</h3>
            <p>Insights profundos com dashboards intuitivos.</p>
          </div>
          <div className="card-recurso">
            <div className="icone-recurso"><img src="/nuvem.svg" alt="Cloud" /></div>
            <h3>Cloud Native</h3>
            <p>Infraestrutura moderna na nuvem com 99.9% de disponibilidade.</p>
          </div>
          <div className="card-recurso">
            <div className="icone-recurso"><img src="/fone_ouvido.svg" alt="Suporte" /></div>
            <h3>Suporte 24/7</h3>
            <p>Equipe dedicada pronta para ajudar você a qualquer momento.</p>
          </div>
        </div>

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
                  transition: transitionAtiva ? 'transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none'
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
              <li><a href="#">AtlasBook</a></li>
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