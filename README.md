# PaginacaoReactJS
Paginação de registros genéricos usando ReactJS e reactstrap.

Instalar reactstrap: https://www.npmjs.com/package/reactstrap.

Propriedades do component:

registrosPorPagina: Quantidade exibida por página </br>
espacoBotoesAcoes: Quantidade de pixels para setar um espaço de exibições de botões de ações </br>
fonteDeDados: Objeto JSON</br>
colunas: Propriedades das colunas que será criadas no grid</br>
acoes: Botões de ações com métodos de ação, classes e ícone</br>

Exemplo de como utilizar o componente: 

 <TabelaPaginacao</br>
    registrosPorPagina={5}</br>
    espacoBotoesAcoes={130}</br>
    fonteDeDados={listaClientes}</br>
    colunas={[
        {
            name: 'Nome Cliente',
            prop: "NomeCliente",
        },
        {
            name: 'CPF',
            prop: "CPF",
        },
    ]} </br>
    acoes={[
        { nome: 'Editar', click: this.EditarCliente, class: "btn btn-primary", icone: "fas fa-edit" },
    ]}
    </br>
/>

