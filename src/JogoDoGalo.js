import React, { useState } from "react";

import "./styles.css";

export function JogoDoGalo() {
  const [tela, setTela] = useState("menu");
  const [jogadorAtual, setJogadorAtual] = useState("O");
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState("");

  function BotaoReiniciar() {
    return (
      <button
        className="ReiniciarJogo"
        onClick={() => setTela("menu")}
        data-testid="restart"
      >
        Reiniciar Jogo
      </button>
    );
  }

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);

    setJogadasRestantes(9);

    setTabuleiro([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);

    setTela("jogo");
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);
    setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
    verificarGanhador(tabuleiro, linha, coluna);
  }

  function verificarGanhador(tabuleiro, linha, coluna) {
    //LINHAS
    if (
      tabuleiro[linha][0] !== "" &&
      tabuleiro[linha][0] === tabuleiro[linha][1] &&
      tabuleiro[linha][1] === tabuleiro[linha][2]
    ) {
      return finalizarJogo(tabuleiro[linha][0]);
    }

    //COLUNAS
    if (
      tabuleiro[0][coluna] !== "" &&
      tabuleiro[0][coluna] === tabuleiro[1][coluna] &&
      tabuleiro[1][coluna] === tabuleiro[2][coluna]
    ) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }

    //DIAGONAL1
    if (
      tabuleiro[0][0] !== "" &&
      tabuleiro[0][0] === tabuleiro[1][1] &&
      tabuleiro[1][1] === tabuleiro[2][2]
    ) {
      return finalizarJogo(tabuleiro[0][0]);
    }

    //DIAGONAL2
    if (
      tabuleiro[0][2] !== "" &&
      tabuleiro[0][2] === tabuleiro[1][1] &&
      tabuleiro[1][1] === tabuleiro[2][0]
    ) {
      return finalizarJogo(tabuleiro[0][2]);
    }

    //Nenhum ganhador na ultima rodada
    if (jogadasRestantes - 1 === 0) {
      return finalizarJogo("");
    }

    //Jogo não finalizado
    setJogadasRestantes(jogadasRestantes - 1);
  }

  function finalizarJogo(ganhador) {
    if (ganhador !== "") {
      setGanhador(ganhador);
    } else {
      setGanhador("nenhum");
    }

    return setTela("ganhador");
  }

  // eslint-disable-next-line default-case
  switch (tela) {
    case "menu":
      return getTelaMenu();
    case "jogo":
      return getTelaJogo();
    case "ganhador":
      return getTelaGanhador();
  }

  function getTelaMenu() {
    return (
      <div className="ContainerSelecioneJogador">
        <h1 className="Title">Jogo do galo</h1>
        <h3 className="Subtitulo">Selecione o primeiro jogador</h3>

        <div className="Container">
          <button className="BoxJogador" onClick={() => iniciarJogo("X")}>
            <p className="JogadorX">X</p>
          </button>

          <p>ou</p>

          <button className="BoxJogador" onClick={() => iniciarJogo("O")}>
            <p className="JogadorO">O</p>
          </button>
        </div>
      </div>
    );
  }

  function getTelaJogo() {
    return (
      <div className="ContainerSelecioneJogador">
        <h1 className="Title">Jogo do galo</h1>
        {tabuleiro.map((linha, numeroLinha) => {
          return (
            <div key={numeroLinha} className="InlineItems">
              {linha.map((coluna, numeroColuna) => {
                return coluna === "X" ? (
                  <button
                    data-testid={`l${linha}c${coluna}`}
                    key={numeroColuna}
                    className="BoxJogador"
                    onClick={() => jogar(numeroLinha, numeroColuna)}
                    disabled={coluna !== ""}
                  >
                    <p className="JogadorX" data-testid="turn">
                      {coluna}
                    </p>
                  </button>
                ) : (
                  <button
                    data-testid={`l${linha}c${coluna}`}
                    key={numeroColuna}
                    className="BoxJogador"
                    onClick={() => jogar(numeroLinha, numeroColuna)}
                    disabled={coluna !== ""}
                  >
                    <p className="JogadorO" data-testid="turn">
                      {coluna}
                    </p>
                  </button>
                );
              })}
            </div>
          );
        })}

        <BotaoReiniciar />
      </div>
    );
  }

  function getTelaGanhador() {
    return (
      <div className="ContainerSelecioneJogador">
        <h1 className="Title" data-testid="gameover">
          Jogo terminado!
        </h1>

        {ganhador === "X" ? (
          <div className="Container">
            <button className="BoxJogador">
              <p className="JogadorX" data-testid="winner">
                X
              </p>
            </button>
          </div>
        ) : ganhador === "O" ? (
          <div className="Container">
            <button className="BoxJogador">
              <p className="JogadorO" data-testid="winner">
                O
              </p>
            </button>
          </div>
        ) : (
          <div>nenhum ganhador</div>
        )}

        <BotaoReiniciar />
      </div>
    );
  }

  return getTelaMenu();
}
