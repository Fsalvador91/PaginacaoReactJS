import React from 'react';
import { Form, Input, Table } from 'reactstrap';
import './Table.css';

const tiposOrdenacao = {
    up: {
        class: 'sort-up',
    },
    down: {
        class: 'sort-down',
    },
    default: {
        class: 'sort',
    }
}

function VerificarOrdenacao(chaveOrdenacao, currentOrder) {
    if (currentOrder === 'up') {
        return (a, b) => a[chaveOrdenacao].localeCompare(b[chaveOrdenacao])
    }
    else if (currentOrder === 'down') {
        return (a, b) => b[chaveOrdenacao].localeCompare(a[chaveOrdenacao])
    }
    else {
        return (a) => a
    }
}

class TabelaPaginacao extends React.Component {
    constructor() {
        super();
        this.state = {
            itensPaginacao: [],
            paginador: {},
            ordenacaoAtual: 'default',
            textoParaPesquisar: "",
            colunaParaPesquisar: "NomeVisitante"
        }

        this.onPesquisar = this.onPesquisar.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        // resetar paginação de os dados forem diferentes
        if (this.props.fonteDeDados !== prevProps.fonteDeDados) {
            this.setPage(this.props.initialPage, this.props.fonteDeDados);
        }
    }

    setPage(pagina, dadosParaPaginar = null) {
        var { registrosPorPagina, fonteDeDados } = this.props;
        var listaDeRegistros = [];

        if (dadosParaPaginar == null) {
            listaDeRegistros = fonteDeDados;
        }
        else {
            listaDeRegistros = dadosParaPaginar;
        }

        var paginador = this.state.paginador;

        if (pagina < 1 || pagina > paginador.totalDePaginas) {
            return;
        }

        paginador = this.paginador(listaDeRegistros.length, pagina, registrosPorPagina);
        var listaPaginada = listaDeRegistros.slice(paginador.indexInicial, paginador.indexFinal + 1);
        this.setState({ itensPaginacao: listaPaginada, paginador: paginador });
    }

    paginador(totalItens, paginaAtual, registrosPorPagina) {
        paginaAtual = paginaAtual || 1;
        var totalDePaginas = Math.ceil(totalItens / registrosPorPagina);
        var paginaInicial, paginalFinal;

        paginaInicial = 1;
        paginalFinal = totalDePaginas;

        var indexInicial = (paginaAtual - 1) * registrosPorPagina;
        var indexFinal = Math.min(indexInicial + registrosPorPagina - 1, totalItens - 1);
        var paginas = [...Array((paginalFinal + 1) - paginaInicial).keys()].map(i => paginaInicial + i);

        return {
            totalItens: totalItens,
            paginaAtual: paginaAtual,
            registrosPorPagina: registrosPorPagina,
            totalDePaginas: totalDePaginas,
            paginaInicial: paginaInicial,
            paginalFinal: paginalFinal,
            indexInicial: indexInicial,
            indexFinal: indexFinal,
            paginas: paginas
        };
    }

    onPesquisar(texto) {
        const textoPesquisaMinimizado = texto.toLowerCase();
        this.setState({ textoParaPesquisar: texto });
        var listagem = this.props.fonteDeDados.filter(x => x[this.state.colunaParaPesquisar].toLowerCase().includes(textoPesquisaMinimizado));
        this.setPage(this.props.paginaInicial, listagem);
    }

    onSort(chaveOrdenacao) {
        const { ordenacaoAtual } = this.state;
        let proximaOrdenacao;

        if (ordenacaoAtual === 'down') proximaOrdenacao = 'up';
        else if (ordenacaoAtual === 'up') proximaOrdenacao = 'default';
        else if (ordenacaoAtual === 'default') proximaOrdenacao = 'down';

        if (this.state.textoParaPesquisar) {
            var dadosOrdenados = this.state.itensPaginacao.sort((VerificarOrdenacao(chaveOrdenacao, proximaOrdenacao)))
        }
        else {
            var dadosOrdenados = this.props.fonteDeDados.sort((VerificarOrdenacao(chaveOrdenacao, proximaOrdenacao)))
        }

        this.setState({ ordenacaoAtual: proximaOrdenacao });
        this.setPage(this.props.paginaInicial, dadosOrdenados);
    }

    renderizarPaginacao = () => {
        var paginador = this.state.paginador;
        if (!paginador.paginas || paginador.paginas.length <= 1) {
            // Não exibir paginação caso não tenha registros suficientes para paginar
            return null;
        }

        return (
            <div className="float-right">
                <nav>
                    <ul className="pagination">
                        <li className={paginador.paginaAtual === 1 ? 'page-item disabled' : 'page-item'}>
                            <a onClick={() => this.setPage(1)} className="page-link">Primeiro</a>
                        </li>
                        <li className={paginador.paginaAtual === 1 ? 'page-item disabled' : 'page-item'}>
                            <a onClick={() => this.setPage(pager.paginaAtual - 1)} className="page-link">Anterior</a>
                        </li>
                        {paginador.paginas.map((pagina, index) =>
                            <li key={index} className={paginador.paginaAtual === pagina ? 'page-item active' : 'page-item'}>
                                <a onClick={() => this.setPage(pagina)} className="page-link">{pagina}</a>
                            </li>
                        )}
                        <li className={paginador.paginaAtual === paginador.totalDePaginas ? 'page-item  disabled' : 'page-item'}>
                            <a onClick={() => this.setPage(paginador.paginaAtual + 1)} className="page-link">Próximo</a>
                        </li>
                        <li className={paginador.paginaAtual === paginador.totalDePaginas ? 'page-item disabled' : 'page-item'}>
                            <a onClick={() => this.setPage(paginador.totalDePaginas)} className="page-link">Último</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    render() {

        const { itensPaginacao, ordenacaoAtual } = this.state;
        const { fonteDeDados, colunas, acoes, espacoBotoesAcoes } = this.props;
        var existeAcoes = acoes && acoes.length > 0;

        return (
            <div className='container mt-5'>
                <div className="form-group">
                    <Form inline>
                        <Input style={{ padding: '10' }} type="text" placeholder="Pesquisar"
                            onChange={e => this.onPesquisar(e.target.value)}
                        />
                        <div>
                            <select
                                style={{ marginLeft: 10 }}
                                className={`custom-select form-control`}
                                onChange={e => this.setState({ colunaParaPesquisar: e.target.value })}
                            >
                                {colunas.map(function (data, key) {
                                    return <option key={key} value={data.prop}>{data.name}</option>;
                                })}
                            </select>
                        </div>
                    </Form>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {existeAcoes &&
                                <th style={{ width: espacoBotoesAcoes }}>Ações</th>}
                            {colunas.map(coluna =>
                                <th key={coluna.prop}>
                                    <i style={{ marginRight: 10 }} onClick={e => this.onSort(coluna.prop)} className={`fas fa-${tiposOrdenacao[ordenacaoAtual].class}`}></i>
                                    {coluna.name}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {itensPaginacao.length > 0 ? (
                            itensPaginacao.map(linha => (
                                <tr key={linha.ID}>
                                    {existeAcoes && (
                                        <td>
                                            {acoes.map(acao => (
                                                <button key={acao.nome} onClick={() => acao.click(linha)} style={{ marginRight: 10 }} className={acao.class}>
                                                    <i className={acao.icone}></i>
                                                </button>
                                            ))}
                                        </td>
                                    )}
                                    {Object.keys(linha).map(coluna => {
                                        if (colunas.find(col => col.prop === coluna)) {
                                            return <td key={coluna}>{linha[coluna]}</td>;
                                        }
                                        else {
                                            return null;
                                        }
                                    })}
                                </tr>
                            ))
                        ) : (
                                <tr>
                                    <td>
                                        <p>Carregando...</p>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </Table>

                {fonteDeDados.length > 0 &&
                    <this.renderizarPaginacao />
                }
            </div>
        )
    }
}

export default TabelaPaginacao;
