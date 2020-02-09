import { AlertsSyncClass } from '../../script/class/AlertsSyncClass.js'

export class IndexedDbExeption extends AlertsSyncClass {
    constructor(notification) {
        super()
        this.name = 'Indexed DB'
        this.time = 5000
        this.notification = true
        if (typeof notification == 'boolean') {
            this.notification = notification
        }
    }

    error() {
        this._show(
            '!Indexed DB não é suportado pelo navegador! <br> Use outro navegador para trabalhar.',
            3,
            3
        )
    }

    opened() {
        this._show(
            'Banco de dados aberto!',
            1,
            2,
            200
        )
    }

    openError() {
        this._show(
            'Erro inesperado!',
            3,
            3
        )
    }

    noOpen() {
        this._show(
            'Banco de dados não foi aberto!',
            3,
            3
        )
    }

    deletedDatabase() {
        this._show(
            'Banco de dados deletado!',
            1,
            2
        )
    }

    errorDeletedDatabase() {
        this._show(
            'Não foi possível deletar o banco de dados antigo!',
            3,
            3
        )
    }

    isNotTransaction() {
        this._show(
            'Transação não efetuada!',
            3,
            3
        )
    }

    transactionError() {
        this._show(
            'Erro durante a transação!',
            3,
            3
        )
    }

    transactionSuccess() {
        this._show(
            'Transação finalizada!',
            1,
            2
        )
    }

    insertError() {
        this._show(
            'Erro na inserção de dados!',
            3,
            3
        )
    }

    insertNull() {
        this._show(
            'Dados bloqueados!',
            3,
            3
        )
    }

    insertSuccess() {
        this._show(
            'Adicionado com sucesso!',
            1,
            3
        )
    }

    tableError() {
        this._show(
            'Tabela inválida ou inexistente!',
            3,
            3
        )
    }

    selectError() {
        this._show(
            'Erro ao buscar dados!',
            3,
            3
        )
    }

    selectNone() {
        this._show(
            'Nenhum resultado retornado!',
            3,
            3
        )
    }

    selectSuccess() {
        this._show(
            'Processando resultados!',
            1,
            2,
            200
        )
    }

    updateError() {
        this._show(
            'Erro na atualização de dados!',
            3,
            3
        )
    }

    updateNull() {
        this._show(
            'Dados bloqueados!',
            3,
            3
        )
    }

    updateSuccess() {
        this._show(
            'Atualizado com sucesso!',
            1,
            3
        )
    }

    transactionConcomplete() {
        this._show(
            'Transação concluída',
            1,
            2,
            200
        )
    }

    close() {
        this._show(
            'Banco de dados finalizado!',
            1,
            2,
            200
        )
    }

    construct() {
        this._show(
            'Novo projeto construído!',
            2,
            3
        )
    }

    idNone() {
        this._show(
            'ID inválido!',
            3,
            3
        )
    }

    deleteSuccess() {
        this._show(
            'Dados deletado com sucesso!',
            2,
            3
        )
    }

    deleteError() {
        this._show(
            'Erro ao deletar dados!',
            3,
            3
        )
    }

    _show(mensage, type, display, time = this.time) {
        if (this.notification) {
            this.add(this.name, mensage, type, display, time, true)
        }
        else {
            this.add(this.name, mensage, type, 2, 200, true)
        }
    }
}