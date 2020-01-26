# PaginacaoReactJS
Paginação de registros genéricos usando ReactJS e reactstrap.

Instalar reactstrap: https://www.npmjs.com/package/reactstrap.

Propriedades do component:

registrosPorPagina: Quantidade exibida por página </br>
espacoBotoesAcoes: Quantidade de pixels para setar um espaço de exibições de botões de ações
fonteDeDados: Objeto JSON
colunas: Propriedades das colunas que será criadas no grid
acoes: Botões de ações com métodos de ação, classes e ícone

Exemplo de como utilizar o componente: 

 <TabelaPaginacao
    registrosPorPagina={5}
    espacoBotoesAcoes={130}   
    fonteDeDados={listaClientes}  
    colunas={[
        {
            name: 'Nome Cliente',
            prop: "NomeCliente",
        },
        {
            name: 'CPF',
            prop: "CPF",
        },
    ]}  
    acoes={[
        { nome: 'Editar', click: this.EditarCliente, class: "btn btn-primary", icone: "fas fa-edit" },
    ]}
/>

