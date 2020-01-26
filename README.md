# PaginacaoReactJS
Paginação de registros genéricos usando ReactJS e reactstrap.

Instalar reactstrap: https://www.npmjs.com/package/reactstrap.

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

