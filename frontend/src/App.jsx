import './App.css'

function App() {

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

      </div>

      <div id='contato'>

      </div>

      <footer>

      </footer>

    </>
  )
}

export default App
