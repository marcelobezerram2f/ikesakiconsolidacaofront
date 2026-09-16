<template>
    <div class="page-wrapper">

        <!-- ====================================================== -->
        <!-- TOPO                                                   -->
        <!-- ====================================================== -->
        <div class="top-bar container-fluid py-2">
            <div class="row align-items-center">

                <!-- Logo -->
                <div class="col-6 col-md-4">
                    <img src="../images/ikesaki_logo.png" class="img-fluid" style="max-height: 50px;" />
                </div>

                <!-- Ações -->
                <div class="col-6 col-md-8">
                    <div class="d-flex justify-content-end align-items-center gap-3 text-white">

                        <!-- Nome (sempre visível) -->
                        <span class="fw-semibold small d-none d-sm-inline text-white">
                            {{ name }}
                        </span>

                        <div class="col-2 col-md-2"></div>

                        <!-- DESKTOP -->
                        <div class="d-none d-md-flex align-items-center gap-3">

                            <div v-if="type === 'ADM'" @click="openUserModal" style="cursor: pointer;">
                                <font-awesome-icon icon="users" />
                            </div>

                            <div class="col-2 col-md-2"></div>

                            <div @click="logout" style="cursor: pointer;">
                                <font-awesome-icon icon="sign-out-alt" class="me-1" />
                                Sair
                            </div>

                        </div>

                        <!-- MOBILE -->
                        <div class="dropdown d-md-none">

                            <button class="btn btn-outline-light btn-sm" type="button" data-bs-toggle="dropdown">
                                ☰
                            </button>

                            <ul class="dropdown-menu dropdown-menu-end">

                                <li v-if="name === 'Administrator'">
                                    <a class="dropdown-item" href="#" @click.prevent="openUserModal">
                                        <font-awesome-icon icon="users" class="me-2" />
                                        Incluir usuário
                                    </a>
                                </li>

                                <li>
                                    <a class="dropdown-item text-danger" href="#" @click.prevent="logout">
                                        <font-awesome-icon icon="sign-out-alt" class="me-2" />
                                        Sair
                                    </a>
                                </li>

                            </ul>

                        </div>

                    </div>
                </div>

            </div>
        </div>

        <!-- ====================================================== -->
        <!-- CONTEÚDO                                               -->
        <!-- ====================================================== -->
        <div class="container mt-4">

            <div class="mb-4">
                <h3 class="page-title mb-1">Conciliação de Arquivos</h3>
                <p class="text-muted mb-0">
                    Selecione o tipo de conciliação e envie os arquivos necessários.
                </p>
            </div>


            <!-- ================================================== -->
            <!-- CONCILIAÇÃO PRINCIPAL                              -->
            <!-- ================================================== -->
            <div class="card upload-card shadow-sm mb-3 bg-white">

                <div class="card-body">

                    <div class="d-flex align-items-center mb-3">



                        <div>
                            <h5 class="mb-0">Conciliação</h5>
                            <small class="text-muted">
                                Envie o arquivo principal e o arquivo histórico
                            </small>
                        </div>

                    </div>

                    <form @submit.prevent="submitUpload('reconciliation')">

                        <div class="row g-3 align-items-end">

                            <div class="col-12 col-lg-4">

                                <label class="form-label">
                                    Arquivo principal
                                </label>

                                <input type="file" name="MainFile" class="form-control" @change="handleFile(
                                    $event,
                                    'reconciliation',
                                    'main'
                                )" required />

                            </div>


                            <div class="col-12 col-lg-4">

                                <label class="form-label">
                                    Arquivo histórico
                                </label>

                                <input type="file" name="HistoryFile" class="form-control" @change="handleFile(
                                    $event,
                                    'reconciliation',
                                    'history'
                                )" required />

                            </div>
                            <div class="col-12 col-lg-4">
                                <button type="submit" class="btn btn-danger px-4 upload-button"
                                    :disabled="loading.reconciliation">
                                    <span v-if="loading.reconciliation"
                                        class="spinner-border spinner-border-sm me-2"></span>
                                    <font-awesome-icon v-else icon="upload" class="me-2" />
                                    Processar conciliação
                                </button>
                            </div>
                        </div>

                    </form>

                </div>

            </div>


            <!-- ================================================== -->
            <!-- CONCILIAÇÕES AUXILIARES                            -->
            <!-- ================================================== -->




            <!-- FORNECEDORES -->

            <div class="card upload-card shadow-sm mb-3 bg-white">

                <div class="card-body">

                    <div class="d-flex align-items-center mb-3">



                        <div>
                            <h5 class="mb-0">Fornecedores</h5>
                            <small class="text-muted">
                                Conciliação de fornecedores
                            </small>
                        </div>

                    </div>

                    <form @submit.prevent="submitUpload('supplier')" class="d-flex flex-column flex-grow-1">

                        <div class="row g-3 align-items-end">

                            <div class="col-12 col-lg-6">

                                <label class="form-label">
                                    Arquivo principal
                                </label>

                                <input type="file" name="MainFile" class="form-control" @change="handleFile(
                                    $event,
                                    'supplier',
                                    'main'
                                )" required />

                            </div>
                            <div class="col-12 col-lg-2">
                            </div>

                            <div class="col-12 col-lg-4">
                                <button type="submit" class="btn btn-danger px-4 upload-button"
                                    :disabled="loading.supplier">
                                    <span v-if="loading.supplier" class="spinner-border spinner-border-sm me-2"></span>
                                    <font-awesome-icon v-else icon="upload" class="me-2" />
                                    Processar Fornecedores
                                </button>
                            </div>
                        </div>

                    </form>

                </div>

            </div>

            <!-- BANCÁRIA -->


            <div class="card upload-card shadow-sm mb-3 bg-white">

                <div class="card-body">

                    <div class="d-flex align-items-center mb-3">



                        <div>
                            <h5 class="mb-0">Bancário</h5>
                            <small class="text-muted">
                                Conciliação de bancária
                            </small>
                        </div>

                    </div>

                    <form @submit.prevent="submitUpload('bank')" class="d-flex flex-column flex-grow-1">

                        <div class="row g-3 align-items-end">

                            <div class="col-12 col-lg-6">

                                <label class="form-label">
                                    Arquivo principal
                                </label>

                                <input type="file" name="MainFile" class="form-control" @change="handleFile(
                                    $event,
                                    'bank',
                                    'main'
                                )" required />

                            </div>
                            <div class="col-12 col-lg-2">
                            </div>

                            <div class="col-12 col-lg-4">
                                <button type="submit" class="btn btn-danger px-4 upload-button"
                                    :disabled="loading.bank">
                                    <span v-if="loading.bank" class="spinner-border spinner-border-sm me-2"></span>
                                    <font-awesome-icon v-else icon="upload" class="me-2" />
                                    Processar Conc. Bancária
                                </button>
                            </div>
                        </div>

                    </form>

                </div>

            </div>

            <!-- IMPOSTO -->




            <div class="card upload-card shadow-sm mb-3 bg-white">

                <div class="card-body">

                    <div class="d-flex align-items-center mb-3">



                        <div>
                            <h5 class="mb-0">Imposto</h5>
                            <small class="text-muted">
                                Conciliação de Imposto
                            </small>
                        </div>

                    </div>

                    <form @submit.prevent="submitUpload('tax')" class="d-flex flex-column flex-grow-1">

                        <div class="row g-3 align-items-end">

                            <div class="col-12 col-lg-6">

                                <label class="form-label">
                                    Arquivo principal
                                </label>

                                <input type="file" name="TaxFile" class="form-control" @change="handleFile(
                                    $event,
                                    'tax',
                                    'main'
                                )" required />

                            </div>
                            <div class="col-12 col-lg-2">
                            </div>

                            <div class="col-12 col-lg-4">
                                <button type="submit" class="btn btn-danger px-4 upload-button" 
                                :disabled="loading.tax">
                                    <span v-if="loading.tax" class="spinner-border spinner-border-sm me-2"></span>

                                    <font-awesome-icon v-else icon="upload" class="me-2" />
                                    Processar Cons. Imposto
                                </button>
                            </div>
                        </div>

                    </form>

                </div>

            </div>


            <!-- ================================================== -->
            <!-- RESULTADO                                          -->
            <!-- ================================================== -->

            <div v-if="uploadedFiles.length" class="mt-4">

                <h5 class="mb-3">
                    Arquivos processados
                </h5>

                <div class="row g-3">

                    <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(file, index) in uploadedFiles" :key="index">

                        <a class="card result-card h-100 text-center shadow-sm" :href="file.url" target="_blank">

                            <div class="card-body">

                                <font-awesome-icon :icon="getIcon(file.name)" size="2x" class="mb-3" />

                                <div class="small text-truncate">
                                    {{ file.name }}
                                </div>

                            </div>

                        </a>

                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<style scoped>
.top-bar {
    background-color: #DF0209;
    height: 70px;
}

.block {
    background: #fff;
    border-radius: 6px;
    margin-bottom: 20px;
    transition: 0.2s;
}

.block-link-shadow:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, .15);
    transform: translateY(-2px);
}

.block-content {
    padding: 20px;
}

.item-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bg-success-light {
    background-color: rgba(40, 167, 69, 0.15);
}

.font-size-lg {
    font-size: 1.1rem;
    font-weight: 500;
}

.page-title {
    font-weight: 600;
    color: #212529;
}

.upload-card {
    border: 1px solid #e9ecef;
    border-radius: 10px;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.upload-card:hover {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08) !important;
}

.upload-card .card-body {
    padding: 20px;
}

.upload-card h5 {
    font-weight: 600;
    color: #212529;
}

.upload-card .form-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #495057;
}

.upload-icon {
    width: 42px;
    height: 42px;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #f8d7da;
    color: #dc3545;

    font-size: 18px;
}

.upload-icon-small {
    width: 34px;
    height: 34px;
    min-width: 34px;

    border-radius: 7px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #f8d7da;
    color: #dc3545;
}

.upload-button {
    min-width: 220px;
}

.result-card {
    text-decoration: none;
    color: inherit;
    border: 1px solid #e9ecef;
    border-radius: 10px;
}

.result-card:hover {
    color: #dc3545;
}

@media (max-width: 991px) {

    .upload-button {
        width: 100%;
    }

}
</style>

<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'

// ============================================================
// CONFIGURAÇÃO DA API
// ============================================================
//
// LOCAL:
// VITE_API_URL=http://127.0.0.1:8080
//
// HOMOLOGAÇÃO:
// VITE_API_URL=
//
// PRODUÇÃO:
// VITE_API_URL=
//
// Quando VITE_API_URL estiver vazio, Axios utilizará o
// mesmo domínio em que o frontend foi carregado.
// ============================================================

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || ''
})


// ============================================================
// TOKEN
// ============================================================

const token = localStorage.getItem('token')


// ============================================================
// ROUTER
// ============================================================

const router = useRouter()


// ============================================================
// USUÁRIO AUTENTICADO
// ============================================================

const auth = JSON.parse(
    localStorage.getItem('auth') || '{}'
)

const name = auth.name || ''
const type = auth.type || ''


// ============================================================
// MODAL DE USUÁRIOS
// ============================================================

const showUserModal = ref(false)
const activeTab = ref('list')


// ============================================================
// USUÁRIOS
// ============================================================

const users = ref([])

const newUser = ref({
    name: '',
    email: '',
    type: 'USR'
})


// ============================================================
// ABRIR MODAL
// ============================================================

const openUserModal = async () => {

    showUserModal.value = true
    activeTab.value = 'list'

    await loadUsers()
}


// ============================================================
// FECHAR MODAL
// ============================================================

const closeUserModal = () => {

    newUser.value = {
        name: '',
        email: '',
        type: 'USR'
    }

    showUserModal.value = false
}


// ============================================================
// LISTAR USUÁRIOS
// ============================================================

const loadUsers = async () => {

    try {

        const response = await api.get(
            '/api/users',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        users.value = response.data

    } catch (error) {

        console.error(
            'Erro ao carregar usuários:',
            error
        )

        Swal.fire(
            'Erro',
            'Erro ao carregar usuários',
            'error'
        )
    }
}


// ============================================================
// EXCLUIR USUÁRIO
// ============================================================

const deleteUser = async (id) => {

    const confirm = await Swal.fire({
        title: 'Confirmar exclusão?',
        text: 'O usuário será removido do sistema.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Cancelar'
    })

    if (!confirm.isConfirmed) {
        return
    }

    try {

        await api.delete(
            `/api/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        await Swal.fire(
            'Sucesso',
            'Usuário removido',
            'success'
        )

        await loadUsers()

    } catch (error) {

        console.error(
            'Erro ao excluir usuário:',
            error
        )

        Swal.fire(
            'Erro',
            'Erro ao excluir usuário',
            'error'
        )
    }
}


// ============================================================
// CRIAR USUÁRIO
// ============================================================

const createUser = async () => {

    if (
        !newUser.value.name ||
        !newUser.value.email
    ) {

        Swal.fire(
            'Atenção',
            'Informe o nome e o e-mail.',
            'warning'
        )

        return
    }

    Swal.fire({
        title: 'Processando...',
        text: 'Criando usuário',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => Swal.showLoading()
    })

    try {

        await api.post(
            '/api/users',
            newUser.value,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        await Swal.fire(
            'Sucesso',
            'Usuário criado com sucesso',
            'success'
        )

        newUser.value = {
            name: '',
            email: '',
            type: 'USR'
        }

        activeTab.value = 'list'

        await loadUsers()

    } catch (error) {

        console.error(
            'Erro ao criar usuário:',
            error
        )

        Swal.fire(
            'Erro',
            'Erro ao criar usuário',
            'error'
        )
    }
}


// ============================================================
// ARQUIVOS
// ============================================================
//
// reconciliation:
//      MainFile
//      HistoryFile
//
// supplier:
//      MainFile
//
// bank:
//      MainFile
//
// tax:
//      MainFile
//
// ============================================================

const files = ref({

    reconciliation: {
        main: null,
        history: null
    },

    supplier: {
        main: null
    },

    bank: {
        main: null
    },

    tax: {
        main: null
    }

})


// ============================================================
// LOADING INDIVIDUAL
// ============================================================

const loading = ref({

    reconciliation: false,

    supplier: false,

    bank: false,

    tax: false

})


// ============================================================
// ARQUIVOS PROCESSADOS
// ============================================================

const uploadedFiles = ref([])


// ============================================================
// ENDPOINTS
// ============================================================

const endpoints = {

    reconciliation: '/api/reasons/process/',

    supplier: '/api/reasons/supplier/',

    bank: '/api/reasons/bank/',

    tax: '/api/reasons/tax/'

}


// ============================================================
// NOMES UTILIZADOS NOS ARQUIVOS GERADOS
// ============================================================

const fileLabels = {

    reconciliation: 'conciliacao',

    supplier: 'conciliacao-fornecedores',

    bank: 'conciliacao-bancaria',

    tax: 'conciliacao-imposto'

}


// ============================================================
// NOMES PARA MENSAGENS
// ============================================================

const processLabels = {

    reconciliation: 'Conciliação',

    supplier: 'Conciliação de Fornecedores',

    bank: 'Conciliação Bancária',

    tax: 'Conciliação de Imposto'

}


// ============================================================
// CAPTURA DO ARQUIVO
// ============================================================

const handleFile = (
    event,
    processType,
    fileType
) => {

    const file =
        event.target.files?.[0]

    if (!file) {
        return
    }

    if (!files.value[processType]) {

        console.error(
            `Tipo de processo inválido: ${processType}`
        )

        return
    }

    files.value[processType][fileType] = file
}


// ============================================================
// VALIDAÇÃO DOS ARQUIVOS
// ============================================================

const validateFiles = (processType) => {

    const selectedFiles =
        files.value[processType]

    if (!selectedFiles) {

        Swal.fire(
            'Erro',
            'Tipo de conciliação inválido.',
            'error'
        )

        return false
    }


    // --------------------------------------------------------
    // Todos os processos precisam do MainFile
    // --------------------------------------------------------

    if (!selectedFiles.main) {

        Swal.fire(
            'Atenção',
            'Selecione o arquivo principal.',
            'warning'
        )

        return false
    }


    // --------------------------------------------------------
    // Somente Conciliação exige HistoryFile
    // --------------------------------------------------------

    if (
        processType === 'reconciliation' &&
        !selectedFiles.history
    ) {

        Swal.fire(
            'Atenção',
            'Selecione o arquivo histórico.',
            'warning'
        )

        return false
    }


    return true
}


// ============================================================
// NORMALIZA NOME DO USUÁRIO
// ============================================================

const getNormalizedUserName = () => {

    const currentAuth = JSON.parse(
        localStorage.getItem('auth') || '{}'
    )

    const userName =
        currentAuth.name || 'usuario'

    return userName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9-_]/g, '')
        .toLowerCase()
}


// ============================================================
// GERA TIMESTAMP
// ============================================================

const getTimestamp = () => {

    const now = new Date()

    return (
        now.getFullYear().toString() +

        String(
            now.getMonth() + 1
        ).padStart(2, '0') +

        String(
            now.getDate()
        ).padStart(2, '0') +

        String(
            now.getHours()
        ).padStart(2, '0') +

        String(
            now.getMinutes()
        ).padStart(2, '0') +

        String(
            now.getSeconds()
        ).padStart(2, '0')
    )
}


// ============================================================
// OBTÉM EXTENSÃO DO ARQUIVO RETORNADO PELO BACKEND
// ============================================================

const getFileExtension = (response) => {

    let extension = 'xlsx'

    const contentDisposition =
        response.headers['content-disposition']

    if (!contentDisposition) {
        return extension
    }

    const match =
        contentDisposition.match(
            /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/
        )

    const backendFileName =
        decodeURIComponent(
            match?.[1] ||
            match?.[2] ||
            ''
        )

    if (backendFileName.includes('.')) {

        extension =
            backendFileName
                .split('.')
                .pop()
                .trim()
    }

    return extension
}


// ============================================================
// DOWNLOAD DO ARQUIVO
// ============================================================

const downloadResponse = (
    response,
    processType
) => {

    const userName =
        getNormalizedUserName()

    const timestamp =
        getTimestamp()

    const extension =
        getFileExtension(response)

    const label =
        fileLabels[processType] ||
        'conciliacao'


    // --------------------------------------------------------
    // Nome final
    // --------------------------------------------------------

    const fileName =
        `${timestamp}-${userName}-${label}.${extension}`


    // --------------------------------------------------------
    // Blob retornado pela API
    // --------------------------------------------------------

    const blob = new Blob(
        [response.data],
        {
            type:
                response.headers['content-type'] ||
                'application/octet-stream'
        }
    )


    // --------------------------------------------------------
    // URL temporária
    // --------------------------------------------------------

    const url =
        window.URL.createObjectURL(blob)


    // --------------------------------------------------------
    // Link temporário
    // --------------------------------------------------------

    const link =
        document.createElement('a')

    link.href = url

    link.setAttribute(
        'download',
        fileName
    )

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    window.URL.revokeObjectURL(url)
}


// ============================================================
// TRATAMENTO DE ERRO DO BACKEND
// ============================================================

const handleUploadError = async (
    error,
    processType
) => {

    console.error(error)

    let message =
        `Erro ao processar ${processLabels[processType] || 'arquivo'}.`


    // --------------------------------------------------------
    // Quando responseType = blob, até os erros vêm como Blob
    // --------------------------------------------------------

    if (
        error.response?.data instanceof Blob
    ) {

        try {

            const text =
                await error.response.data.text()

            // ------------------------------------------------
            // Tenta interpretar JSON retornado pelo backend
            // ------------------------------------------------

            try {

                const json =
                    JSON.parse(text)

                message =
                    json.message ||
                    json.error ||
                    text

            } catch {

                if (text) {
                    message = text
                }
            }

        } catch (blobError) {

            console.error(
                'Erro ao ler resposta do backend:',
                blobError
            )
        }

    } else if (
        error.response?.data?.message
    ) {

        message =
            error.response.data.message

    } else if (
        error.response?.data?.error
    ) {

        message =
            error.response.data.error
    }


    Swal.fire(
        'Erro',
        message,
        'error'
    )
}


// ============================================================
// UPLOAD
// ============================================================

const submitUpload = async (processType) => {

    // --------------------------------------------------------
    // Validação
    // --------------------------------------------------------

    if (!validateFiles(processType)) {
        return
    }


    // --------------------------------------------------------
    // Endpoint
    // --------------------------------------------------------

    const endpoint =
        endpoints[processType]

    if (!endpoint) {

        Swal.fire(
            'Erro',
            'Endpoint não configurado.',
            'error'
        )

        return
    }


    // --------------------------------------------------------
    // Arquivos selecionados
    // --------------------------------------------------------

    const selectedFiles =
        files.value[processType]


    // --------------------------------------------------------
    // FormData
    // --------------------------------------------------------

    const formData =
        new FormData()


    // Todos possuem MainFile

    formData.append(
        'MainFile',
        selectedFiles.main
    )


    // Somente Conciliação possui HistoryFile

    if (
        processType === 'reconciliation'
    ) {

        formData.append(
            'HistoryFile',
            selectedFiles.history
        )
    }


    // --------------------------------------------------------
    // Loading somente do processo selecionado
    // --------------------------------------------------------

    loading.value[processType] = true


    try {

        const response =
            await api.post(
                endpoint,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                    responseType: 'blob'
                }
            )


        // ----------------------------------------------------
        // Download
        // ----------------------------------------------------

        downloadResponse(
            response,
            processType
        )


        // ----------------------------------------------------
        // Sucesso
        // ----------------------------------------------------

        await Swal.fire({
            icon: 'success',
            title: 'Processamento concluído',
            text:
                `${processLabels[processType]} processada com sucesso.`,
            timer: 2000,
            showConfirmButton: false
        })


    } catch (error) {

        await handleUploadError(
            error,
            processType
        )

    } finally {

        loading.value[processType] = false
    }
}


// ============================================================
// LOGOUT
// ============================================================

const logout = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('auth')

    router.push('/')
}


// ============================================================
// ÍCONES DOS ARQUIVOS
// ============================================================

const getIcon = (fileName) => {

    if (!fileName) {
        return 'file'
    }

    const ext =
        fileName
            .split('.')
            .pop()
            .toLowerCase()

    if (
        ['xls', 'xlsx'].includes(ext)
    ) {
        return 'file-excel'
    }

    if (
        ['pdf'].includes(ext)
    ) {
        return 'file-pdf'
    }

    if (
        ['doc', 'docx'].includes(ext)
    ) {
        return 'file-word'
    }

    if (
        ['jpg', 'jpeg', 'png'].includes(ext)
    ) {
        return 'file-image'
    }

    return 'file'
}

</script>