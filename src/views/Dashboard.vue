<template>
    <div class="page-wrapper">

        <!-- Topo -->
        <div class="top-bar container-fluid py-2">
            <div class="row align-items-center">

                <!-- Logo -->
                <div class="col-6 col-md-4">
                    <img src="../images/ikesaki_logo.png" class="img-fluid" style="max-height:50px;" />
                </div>

                <!-- Ações -->
                <div class="col-6 col-md-8">
                    <div class="d-flex justify-content-end align-items-center gap-3 text-white">

                        <!-- Nome (sempre visível) -->
                        <span class="fw-semibold small d-none d-sm-inline">
                            {{ name }}
                        </span>

                        <div class="col-2 col-md-2"> </div>
                        <!-- DESKTOP -->
                        <div class="d-none d-md-flex align-items-center gap-3">

                            <div v-if="name === 'Administrator'" @click="openUserModal" style="cursor:pointer;">
                                <font-awesome-icon icon="users" />
                            </div>
                            <div class="col-2 col-md-2"> </div>
                            <div @click="logout" style="cursor:pointer;">
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

        <!-- Conteúdo -->
        <div class="container mt-4">

            <div class="card shadow-sm">
                <div class="card-body">

                    <form @submit.prevent="submitUpload">

                        <div class="row g-3">

                            <div class="col-12 col-md-6 col-lg-4">
                                <label class="form-label">Arquivo principal</label>
                                <input type="file" name="MainFile" class="form-control" @change="handleFiles"
                                    required />
                            </div>

                            <div class="col-12 col-md-6 col-lg-4">
                                <label class="form-label">Arquivo histórico</label>
                                <input type="file" name="HistoryFile" class="form-control" @change="handleFiles"
                                    required />
                            </div>

                            <div class="col-12 col-lg-4 d-flex align-items-end">
                                <button type="submit" class="btn btn-danger w-100" :disabled="loading">
                                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                                    Upload dos arquivos
                                </button>
                            </div>

                        </div>

                    </form>

                </div>
            </div>

            <!-- Resultado -->
            <div v-if="uploadedFiles.length" class="row mt-4 g-3">

                <div class="col-12 col-sm-6 col-md-4 col-lg-3" v-for="(file, index) in uploadedFiles" :key="index">
                    <a class="card h-100 text-center shadow-sm" :href="file.url" target="_blank">

                        <div class="card-body d-flex flex-column justify-content-center">

                            <div class="mb-3">
                                <font-awesome-icon :icon="getIcon(file.name)" size="2x" />
                            </div>

                            <div class="small text-truncate">
                                {{ file.name }}
                            </div>

                        </div>

                    </a>
                </div>

            </div>

            <!-- MODAL -->
            <div v-if="showUserModal">

                <div class="modal-backdrop fade show"></div>

                <div class="modal fade show d-block" tabindex="-1">
                    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content shadow">

                            <div class="modal-header bg-danger text-white">
                                <h5 class="modal-title">Gerenciar Usuários</h5>
                                <button type="button" class="btn-close btn-close-white"
                                    @click="closeUserModal"></button>
                            </div>

                            <div class="modal-body">

                                <!-- Abas -->
                                <ul class="nav nav-tabs mb-3">
                                    <li class="nav-item">
                                        <button class="nav-link" :class="{ active: activeTab === 'list' }"
                                            @click="activeTab = 'list'">
                                            Lista
                                        </button>
                                    </li>

                                    <li class="nav-item">
                                        <button class="nav-link" :class="{ active: activeTab === 'create' }"
                                            @click="activeTab = 'create'">
                                            Novo
                                        </button>
                                    </li>
                                </ul>

                                <!-- Lista -->
                                <div v-if="activeTab === 'list'" class="table-responsive">
                                    <table class="table table-bordered align-middle">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Email</th>
                                                <th width="60"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="user in users" :key="user.id">
                                                <td class="text-truncate">{{ user.name }}</td>
                                                <td class="text-truncate">{{ user.email }}</td>
                                                <td>
                                                    <button class="btn btn-sm btn-danger" @click="deleteUser(user.id)">
                                                        <font-awesome-icon icon="trash" />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <!-- Cadastro -->
                                <div v-if="activeTab === 'create'">

                                    <div class="row g-3">
                                        <div class="col-12 col-md-6">
                                            <label class="form-label">Nome</label>
                                            <input v-model="newUser.name" class="form-control" />
                                        </div>

                                        <div class="col-12 col-md-6">
                                            <label class="form-label">Email</label>
                                            <input v-model="newUser.email" class="form-control" />
                                        </div>
                                    </div>

                                    <div class="mt-3">
                                        <button class="btn btn-success w-100 w-md-auto" @click="createUser">
                                            <i class="fa fa-check"></i> Gravar
                                        </button>
                                    </div>

                                </div>

                            </div>

                            <div class="modal-footer">
                                <button class="btn btn-secondary w-100 w-md-auto" @click="closeUserModal">
                                    Fechar
                                </button>
                            </div>

                        </div>
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
</style>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'

/// MODAL
const showUserModal = ref(false)
const activeTab = ref('list')

// USERS
const users = ref([])
const newUser = ref({
    name: '',
    email: ''
})

const token = localStorage.getItem('token')

// ABRIR MODAL
const openUserModal = async () => {
    showUserModal.value = true
    activeTab.value = 'list'
    await loadUsers()
}

const closeUserModal = () => {
    newUser.value.name = ''
    newUser.value.email = ''
    showUserModal.value = false
}

// LISTAR
const loadUsers = async () => {
    try {
        const res = await axios.get('https://ikesakiconciliacao.imp-tec.com/api/users', {
            headers: { Authorization: `Bearer ${token}` }
        })

        users.value = res.data

    } catch {
        Swal.fire('Erro', 'Erro ao carregar usuários', 'error')
    }
}

// EXCLUIR
const deleteUser = async (id) => {

    const confirm = await Swal.fire({
        title: 'Confirmar exclusão?',
        icon: 'warning',
        showCancelButton: true
    })

    if (!confirm.isConfirmed) return

    try {
        await axios.delete(`https://ikesakiconciliacao.imp-tec.com/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })

        Swal.fire('Sucesso', 'Usuário removido', 'success')
        loadUsers()

    } catch {
        Swal.fire('Erro', 'Erro ao excluir usuário', 'error')
    }
}

// CRIAR
const createUser = async () => {

    Swal.fire({
        title: 'Processando...',
        text: 'Criando usuário',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => Swal.showLoading()
    })

    try {
        await axios.post(
            'https://ikesakiconciliacao.imp-tec.com/api/users',
            newUser.value,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        // Sucesso
        Swal.fire('Sucesso', 'Usuário criado com sucesso', 'success')

        // LIMPA CAMPOS (CORRETO)
        newUser.value.name = ''
        newUser.value.email = ''

        activeTab.value = 'list'
        loadUsers()

    } catch (error) {
        Swal.fire('Erro', 'Erro ao criar usuário', 'error')
    }
}

const router = useRouter()

//  Usuário
const auth = JSON.parse(localStorage.getItem('auth') || '{}')
const name = auth.name || ''

//  Estado
const mainFile = ref(null)
const historyFile = ref(null)
const uploadedFiles = ref([])
const loading = ref(false)

//  Captura arquivos
const handleFiles = (event) => {
    const file = event.target.files[0]

    if (event.target.name === 'MainFile') {
        mainFile.value = file
    }

    if (event.target.name === 'HistoryFile') {
        historyFile.value = file
    }
}

//  Upload real
const submitUpload = async () => {

    if (!mainFile.value || !historyFile.value) {
        alert('Selecione os dois arquivos.')
        return
    }

    loading.value = true

    try {
        const formData = new FormData()
        formData.append('MainFile', mainFile.value)
        formData.append('HistoryFile', historyFile.value)

        const token = localStorage.getItem('token')

        const response = await axios.post(
            'https://ikesakiconciliacao.imp-tec.com/api/reason/process/',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        const fileUrl = response.data.url
        const fileName = fileUrl.split('/').pop()

        uploadedFiles.value = [{
            name: fileName,
            url: fileUrl
        }]

    } catch (error) {
        console.error(error)
        alert('Erro ao processar arquivos')
    } finally {
        loading.value = false
    }
}

//  Logout
const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('auth')
    router.push('/')
}

//  Ícones
const getIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase()

    if (['xls', 'xlsx'].includes(ext)) return 'file-excel'
    if (['pdf'].includes(ext)) return 'file-pdf'
    if (['doc', 'docx'].includes(ext)) return 'file-word'
    if (['jpg', 'jpeg', 'png'].includes(ext)) return 'file-image'

    return 'file'
}
</script>